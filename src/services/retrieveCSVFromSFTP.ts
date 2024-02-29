import csv from "csv-parse";
import {
  validateCSVData,
  invalidCSVData,
  validCSVData,
} from "./csvValidationService";
import { sftpConfig } from "../utils/sftpConfig";
import Client from "ssh2-sftp-client";
import { PassThrough } from "stream";
import dotenv from "dotenv";

dotenv.config();

const retryDelay = 5000;

const retrieveCSVFromSFTP = async (validators: any, retryCount: number = 0) => {
  const maxRetries = 3;
  const sftp = new Client();

  try {
    await sftp.connect(sftpConfig);
    console.log("Connection established");

    const pt = new PassThrough();
    await sftp.get(process.env.File_Path || " ", pt);

    const parser = csv.parse({
      delimiter: ",",
      from_line: 2,
      skipRecordsWithError: true,
      relax_column_count: true,
      columns: false,
    });

    let rowNumber = 1; // Initialize row number

    pt.pipe(parser);
    parser.on("data", (row) => {
      validateCSVData(row, validators, rowNumber);
      rowNumber++;
    });

    parser.on("end", () => {
      console.log("File received");
    });
  } catch (err: any) {
    console.error("Error retrieving CSV file from SFTP server:", err);
    if (retryCount < maxRetries) {
      console.log(`Retrying in ${retryDelay / 1000} seconds...`);
      setTimeout(() => {
        dotenv.config(); // Refresh environment variables
        retrieveCSVFromSFTP(validators, retryCount + 1);
      }, retryDelay);
    }
  } finally {
    await sftp.end();
    console.log("Connection closed");
  }
};

export { retrieveCSVFromSFTP };
