import { InputHTMLAttributes, MouseEvent, ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string | ReactNode;
  errorMessage?: string;
  showErrorMessage?: boolean;
  action?: {
    iconClass?: string;
    handleClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  };
}
