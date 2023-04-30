import { v4 as uuidv4 } from "uuid";

export const maxLength = (string: string, limit: number): string => {
  return string.substring(0, limit) + "...";
};

export const generateId = (): string => {
  var id = uuidv4();
  return id.replace("-", "").slice(0, 24);
};
