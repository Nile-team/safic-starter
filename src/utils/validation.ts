import {
  emailValidator,
  stringValidator,
  phoneNumberValidator,
} from "./validationType";

export const validators = [
  emailValidator, // Email
  stringValidator, // First Name
  stringValidator, // Last Name
  phoneNumberValidator, // Phone number
  phoneNumberValidator, // Mobile number
  stringValidator, // Country
  stringValidator, // Market
  emailValidator, // ITC Leader email
  stringValidator, // ITC leader nom complet
  stringValidator, // Safic Entity
  stringValidator, // Safic Entity Code
  stringValidator, // Language
  stringValidator, // Origin
  stringValidator, // Request Type
  stringValidator, // Company name
  stringValidator, // Lead status
  stringValidator, // Address
  stringValidator, // Post code
  stringValidator, // City
  stringValidator, // ID HubSpot interne
  stringValidator, // ID selligent contact
  stringValidator, // ID Selligent tier CODE
];
