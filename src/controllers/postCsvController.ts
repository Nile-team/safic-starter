import { Request, Response } from "express";
import {
  validateCSVData,
  validCSVData,
  invalidCSVData,
} from "../services/csvValidationService";
import { sftpConfig } from "../utils/sftpConfig";
import Client from "ssh2-sftp-client";
import { Readable } from "stream";
import { validators } from "../utils/validation";

const sftp = new Client();

const retryDelay = 5000;
const maxRetries = 3;

const addCsvData = async (req: Request, res: Response) => {
  const { rowData } = req.body;

  if (!Array.isArray(rowData)) {
    return res
      .status(400)
      .json({ error: "Invalid data format. Expecting an array." });
  }

  // Clear previous validation data
  validCSVData.length = 0;
  invalidCSVData.length = 0;

  // Validate each row of CSV data
  for (let index = 0; index < rowData.length; index++) {
    const row = rowData[index];
    await validateAndProcessRow(row, index + 1);
  }

  if (validCSVData.length === 0) {
    return res.status(400).json({ error: "No valid data to append." });
  }

  // Join rows using "\r\n" as the line terminator
  const csvData = validCSVData.map((row) => row.rowData.join(",")).join("\r\n");

  // Create a readable stream for the CSV data
  const csvStream = new Readable();
  csvStream.push(csvData);
  csvStream.push(null);

  let retryCount = 0;

  const performSFTPAppend = async () => {
    try {
      await sftp.connect(sftpConfig);
      console.log("Connection established");

      // Get the existing content of the file on the server
      let existingData = await sftp.get(process.env.File_Path || " ");
      if (Buffer.isBuffer(existingData)) {
        existingData = existingData.toString(); // Convert buffer to string
      }

      // Assert that existingData is a string
      existingData = existingData as string;

      // Append the new data to the existing data
      const newData = existingData ? existingData + "\r\n" + csvData : csvData;

      await sftp.put(Buffer.from(newData), process.env.File_Path || " ");

      console.log("Data added to the file");
      res.status(200).json({ message: "Data added to the file" });
    } catch (err: any) {
      console.error(`Error: ${err.message}`);
      if (retryCount < maxRetries) {
        console.log(`Retrying in ${retryDelay / 1000} seconds...`);
        setTimeout(performSFTPAppend, retryDelay);
        retryCount++;
      } else {
        res
          .status(500)
          .json({ error: "Failed to append data after maximum retries." });
      }
    } finally {
      await sftp.end();
      console.log("Connection closed");
    }
  };

  await performSFTPAppend();
};

async function validateAndProcessRow(row: string[], rowNumber: number) {
  try {
    await validateCSVData(row, validators, rowNumber);
  } catch (error) {
    console.error("Error validating row:", error);
  }
}

export { addCsvData };
