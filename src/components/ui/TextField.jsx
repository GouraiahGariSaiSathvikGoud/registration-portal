import { useField } from "formik";

// A reusable input. Formik's useField gives us the value, onChange and error,
// so every input in the app can share this one component.
export function TextField({ label, hint, ...props }) {
  const [field, meta] = useField(props.name);
  const id = `field-${props.name}`;
  const error = meta.touched ? meta.error : undefined; // only show errors after the field was touched

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <input
        id={id}
        {...field}
        {...props}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`min-h-12 rounded-[10px] border-[1.5px] bg-paper px-3.5 text-base ${
          error ? "border-danger" : "border-field hover:border-navy"
        }`}
      />
      {hint && !error && <p className="text-sm text-navy-soft">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}