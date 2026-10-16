import { useField } from "formik";

export function SelectField({ label, options, placeholder, ...props }) {
  const [field, meta] = useField(props.name);
  const id = `field-${props.name}`;
  const error = meta.touched ? meta.error : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <select
        id={id}
        {...field}
        {...props}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`min-h-12 rounded-[10px] border-[1.5px] bg-paper px-3 text-base ${
          error ? "border-danger" : "border-field hover:border-navy"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}