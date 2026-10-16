import { useField } from "formik";

export function CheckboxField({ name, children }) {
  const [field, meta] = useField({ name, type: "checkbox" });
  const id = `field-${name}`;
  const error = meta.touched ? meta.error : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
        <input id={id} type="checkbox" {...field} aria-invalid={Boolean(error)} className="mt-1 h-5 w-5 accent-navy" />
        <span>{children}</span>
      </label>
      {error && (
        <p role="alert" className="text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}