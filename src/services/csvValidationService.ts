const validCSVData: string[][] = [];
const invalidCSVData: { rowData: string[]; errors: string[] }[] = [];

const validateCSVData = async (
  row: string[],
  validators: ((value: any) => boolean)[]
) => {
  const errors: string[] = [];
  if (row.length > validators.length) {
    errors.push(`Number of columns exceeded limit ${validators.length}`);
  } else {
    const isValid = row.every((value, index) => {
      const validator = validators[index];
      if (!validator(value)) {
        errors.push(`Invalid type for column ${index + 1}`);
      }
      return validator(value);
    });
    if (isValid) {
      validCSVData.push(row);
      // await createContactAndCompany(row);
    }
  }
  if (errors.length > 0) {
    invalidCSVData.push({ rowData: row, errors });
  }
};

export { validateCSVData, validCSVData, invalidCSVData };
