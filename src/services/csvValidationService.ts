const validCSVData: any[] = [];
const invalidCSVData: any[] = [];

const validateCSVData = async (
  row: string[],
  validators: ((value: any) => boolean)[],
  rowNumber: number
) => {
  const errors: string[] = [];
  if (row.length > validators.length) {
    errors.push(`Number of columns exceeded limit ${validators.length}`);
  } else {
    row.forEach((column, index) => {
      if (!validators[index](column)) {
        errors.push(`Invalid value: ${column}`);
      }
    });
  }
  if (errors.length === 0) {
    validCSVData.push({ rowData: row, rowNumber });
    // await createContactAndCompany(row);
  } else {
    invalidCSVData.push({ rowData: row, errors, rowNumber });
  }
  return { rowData: row, errors, rowNumber };
};

export { validateCSVData, validCSVData, invalidCSVData };
