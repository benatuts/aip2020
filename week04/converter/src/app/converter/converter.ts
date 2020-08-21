export interface Converter {
  name: string;
  from: string;
  to: string;
  convert: (from: number) => number;
}
