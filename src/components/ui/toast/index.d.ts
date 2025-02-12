export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
  message?: string;
  type?: ToastType;
  delay?: number;
}
