import { useState } from "react";
import { Form, Formik } from "formik";
import { Button } from "./ui/Button";
import { CheckboxField } from "./ui/CheckboxField";
import { SelectField } from "./ui/SelectField";
import { TextField } from "./ui/TextField";
import { COUNTRIES } from "../data/countries";
import { initialValues, registrationSchema } from "../validation/registrationSchema";

export function RegistrationForm({ onRegistered }) {
  const [success, setSuccess] = useState(null);
  const [serverError, setServerError] = useState(null);

  // TEMPORARY: pretend to save for 1 second. We replace this in Phase 9.
  async function handleSubmit(values, { resetForm }) {
    setServerError(null);
    setSuccess(null);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSuccess(values.fullName);
    resetForm();
    onRegistered();
  }

  return (
    <section className="rounded-[20px] border border-line bg-paper p-5 shadow-sm sm:p-8">
      <h2 className="font-display text-2xl font-bold">Your details</h2>
      <p className="mb-6 mt-1 text-navy-soft">Takes about a minute. Every field is required.</p>

      <Formik initialValues={initialValues} validationSchema={registrationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form noValidate className="grid gap-5">
            <TextField name="fullName" label="Full name" autoComplete="name" placeholder="Asha Rao" />
            <TextField name="email" label="Email" type="email" autoComplete="email" placeholder="asha@example.com" />
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField name="phone" label="Phone number" type="tel" autoComplete="tel" placeholder="9876543210" />
              <SelectField name="country" label="Country" placeholder="Choose a country" options={COUNTRIES} />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                hint="8+ characters, one capital letter, one number."
              />
              <TextField name="confirmPassword" label="Confirm password" type="password" autoComplete="new-password" />
            </div>
            <CheckboxField name="terms">I agree to the event code of conduct.</CheckboxField>

            {serverError && (
              <p role="alert" className="rounded-[12px] border border-danger/40 bg-danger-soft p-3.5 text-sm font-medium text-danger">
                {serverError}
              </p>
            )}
            {success && (
              <p role="status" className="rounded-[12px] border border-ok/40 bg-ok-soft p-3.5 text-sm font-semibold text-ok">
                You're registered, {success.split(" ")[0]}. You now appear in the list.
              </p>
            )}

            <Button type="submit" isLoading={isSubmitting} className="mt-1">
              Reserve my seat
            </Button>
          </Form>
        )}
      </Formik>
    </section>
  );
}