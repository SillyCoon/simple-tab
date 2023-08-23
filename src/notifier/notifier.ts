export interface ParsingError {
  message: string;
  value: string;
  type: "error" | "warning";
}
