const stringValidator = (value: any): boolean =>
  typeof value === "string" && (value === "" || value.trim().length > 0);
const emailValidator = (value: any): boolean =>
  typeof value === "string" && (value === "" || value.includes("@"));
const phoneNumberValidator = (value: any): boolean => stringValidator(value);

export { stringValidator, emailValidator, phoneNumberValidator };
