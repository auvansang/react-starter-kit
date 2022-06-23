export interface Option {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  [key: string]: unknown;
}
