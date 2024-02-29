import { validCSVData, invalidCSVData } from "../services/csvValidationService";
import { Request, Response } from "express";
import { validators } from "../utils/validation";
import { retrieveCSVFromSFTP } from "../services/retrieveCSVFromSFTP";

const getCSV = async (req: Request, res: Response) => {
  const responseData: {
    validCsvData: Record<number, any>;
    invalidCsvData: Record<number, any>;
  } = {
    validCsvData: {},
    invalidCsvData: {},
  };

  // Clearing arrays before each request
  validCSVData.length = 0;
  invalidCSVData.length = 0;

  await retrieveCSVFromSFTP(validators);

  let validIndex = 0;
  let invalidIndex = 0;

  validCSVData.forEach(({ rowData, rowNumber }) => {
    validIndex++;
    const formattedRowData = rowData.reduce(
      (acc: any, curr: string, i: number) => {
        acc[i + 1] = curr;
        return acc;
      },
      {} as Record<number, any>
    );
    responseData.validCsvData[validIndex] = {
      rowData: formattedRowData,
      rowNumber,
    };
  });

  invalidCSVData.forEach(({ rowData, errors, rowNumber }) => {
    invalidIndex++;
    const formattedRowData = rowData.reduce(
      (acc: any, curr: string, i: number) => {
        acc[i + 1] = curr;
        return acc;
      },
      {} as Record<number, any>
    );
    responseData.invalidCsvData[invalidIndex] = {
      errors,
      rowData: formattedRowData,
      rowNumber,
    };
  });

  res.json(responseData);
};

export { getCSV };
