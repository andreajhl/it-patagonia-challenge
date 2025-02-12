"use client";

import { TextareaProps } from "./index.d";
import { FC } from "react";

const Textarea: FC<TextareaProps> = ({
  label,
  name,
  errorMessage,
  action,
  showErrorMessage = true,
  ...props
}) => (
  <div className="relative z-0 w-full text-sm md:text-base xl:text-xl">
    <div className="input-outline flex items-center justify-between">
      <textarea
        {...props}
        id={name}
        name={name}
        aria-describedby={`${name}-error`}
        className="no-autofill block h-full w-full appearance-none border-none focus:border-none focus:outline-none"
      />
      {action && (
        <button className="block" onClick={action.handleClick}>
          <i className={`text-base text-blue-600 ${action.iconClass}`} />
        </button>
      )}

      {label && (
        <label htmlFor={name} className="input-label">
          {label}
        </label>
      )}
    </div>
    {showErrorMessage && (
      <p
        id={`${name}-error`}
        className="ml-1 mt-1 flex min-h-8 items-start text-xs font-medium tracking-wide text-red-600"
      >
        {errorMessage}
      </p>
    )}
  </div>
);

export default Textarea;
