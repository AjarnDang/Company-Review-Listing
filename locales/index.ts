import { th } from "./th";
import { en } from "./en";

export const translations = {
  th,
  en,
};

export type Locale = keyof typeof translations;

export { th, en };

