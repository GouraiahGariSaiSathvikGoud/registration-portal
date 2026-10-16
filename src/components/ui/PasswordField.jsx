import { useState } from "react";
import { useField } from "formik";

// Same idea as TextField, plus a Show/Hide button so people can check what they typed.
export function PasswordField({ label, hint, ...props }) {
  const [field, meta] = useField(props.name);
  const [visible, setVisible] = useState(false);
  const id = `field-${props.name}`;
  const error = meta.touched ? meta.error : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          {...field}
          {...props}
          type={visible ? "text" : "password"}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`min-h-12 w-full rounded-[10px] border-[1.5px] bg-paper py-0 pl-3.5 pr-16 text-base ${
            error ? "border-danger" : "border-field hover:border-navy"
          }`}
        />
        <button
          type="button"
          onClick={() => setVisible((value) => !value)}
          aria-pressed={visible}
          aria-label={`${visible ? "Hide" : "Show"} ${label.toLowerCase()}`}
          className="absolute inset-y-0 right-0 rounded-r-[10px] px-4 text-sm font-semibold text-navy-soft hover:text-navy"
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
      {hint && !error && <p className="text-sm text-navy-soft">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}