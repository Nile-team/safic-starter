import dotenv from "dotenv";

dotenv.config();

export const sftpConfig = {
  host: process.env.SFTP_HOSTNAME,
  port: Number(process.env.SFTP_PORT),
  username: process.env.SFTP_USERNAME,
  password: process.env.SFTP_PASSWORD,
};
