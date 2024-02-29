const stringValidator = (value: any): boolean =>
  typeof value === "string" && (value === "" || value.trim().length > 0);
const emailValidator = (value: any): boolean =>
  typeof value === "string" &&
  (value === "" || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value));
const phoneNumberValidator = (value: any): boolean => stringValidator(value);

export { stringValidator, emailValidator, phoneNumberValidator };
