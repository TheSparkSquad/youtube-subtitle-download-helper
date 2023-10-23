import { Alines } from "../type/aline";

export interface Convertable {
  convert(xmlResponse: string, fileName: string): void; //CMudd this looks promising for where the file directory is set
  format(xmlResponse: string): Alines;
}
