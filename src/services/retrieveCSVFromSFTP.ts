import csv from "csv-parse";
import { validateCSVData } from "./csvValidationService";
import { sftpConfig } from "../utils/sftpConfig";
import Client from "ssh2-sftp-client";
import { PassThrough } from "stream";
import dotenv from "dotenv";

dotenv.config();

const retrieveCSVFromSFTP = async (validators: any) => {
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
    pt.pipe(parser);
    parser.on("data", (row) => {
      validateCSVData(row, validators);
    });
    parser.on("end", () => {
      console.log("File received");
    });
  } catch (err: any) {
    console.error(`Error: ${err.message}`);
  } finally {
    await sftp.end();
    console.log("Connection closed");
  }
};

export { retrieveCSVFromSFTP };
