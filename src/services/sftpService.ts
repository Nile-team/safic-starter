import Client from "ssh2-sftp-client";
import { sftpConfig } from "../utils/sftpConfig";

export const sftp = new Client();

export const connectSFTP = async () => {
  try {
    await sftp.connect(sftpConfig);
    console.log("Connected to SFTP server");
  } catch (err) {
    console.error("Error connecting to SFTP server", err);
  }
};

export const disconnectSFTP = async () => {
  try {
    await sftp.end();
    console.log("Disconnected from SFTP server");
  } catch (err) {
    console.error("Error disconnecting from SFTP server", err);
  }
};
