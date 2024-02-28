import { validCSVData, invalidCSVData } from "../services/csvValidationService";
import { Request, Response } from "express";

const getcsv = (req: Request, res: Response) => {
  const responseData: {
    invalidCsvData: Record<number, any>;
    validCsvData: Record<number, any>;
  } = {
    invalidCsvData: {},
    validCsvData: {},
  };

  invalidCSVData.forEach((rowDataObj, index) => {
    const { rowData, errors } = rowDataObj;
    const formattedRowData = rowData.reduce((acc, curr, i) => {
      acc[i + 1] = curr;
      return acc;
    }, {} as Record<number, any>); // Specify the type for 'acc' as Record<number, any>
    responseData.invalidCsvData[index + 1] = {
      errors,
      rowData: formattedRowData,
    };
  });

  validCSVData.forEach((rowData, index) => {
    const formattedRowData = rowData.reduce((acc, curr, i) => {
      acc[i + 1] = curr;
      return acc;
    }, {} as Record<number, any>); // Specify the type for 'acc' as Record<number, any>
    responseData.validCsvData[index + 1] = { rowData: formattedRowData };
  });

  res.json(responseData);
};
export { getcsv };
