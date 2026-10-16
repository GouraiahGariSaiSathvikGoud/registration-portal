# Launchpad: Event Registration Portal

A full-stack registration portal. Visitors fill in a validated form, the data is saved to a PostgreSQL database, and a public "Who's coming" list reads it back.

**Live demo:** https://registration-portal-xi.vercel.app
**Code:** https://github.com/GouraiahGariSaiSathvikGoud/registration-portal

## Tech stack

| Layer | Tools |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS 4 |
| Forms and validation | Formik, Yup |
| Backend | Vercel serverless function (`api/registrations.js`) |
| Database | PostgreSQL on Neon |
| Hosting | Vercel (one repo: frontend and API) |

## Features

- Reusable form components (`TextField`, `PasswordField`, `SelectField`, `CheckboxField`) built on Formik's `useField`
- Live ticket preview that updates as the user types (`useFormikContext`)
- Yup validation in the browser and again on the server
- Duplicate emails are rejected by the database (`UNIQUE`) and shown under the Email field
- Loading, empty and error states for the attendee list, with a "Try again" button
- Answers are kept if saving fails
- Show/Hide password button
- Responsive layout, keyboard-friendly focus styles, ARIA error messages

## Project structure

```
api/registrations.js        Backend: GET list, POST create
scripts/setup-db.js         Creates the database table
src/components/ui/          Reusable form components
src/components/             RegistrationForm, AttendeeList, TicketPreview
src/services/api.js         Every network call lives here
src/validation/             Yup schema
```

## Design decisions

- **Validation happens twice.** The browser gives fast feedback, and the server re-checks because browser checks can be bypassed.
- **The database enforces unique emails.** Two people submitting at once can't create duplicates. The API turns Postgres error `23505` into a clear 409 message.
- **SQL injection is blocked** by parameterized queries (`$1, $2...`).
- **The public list shows names and countries only.** Emails and phone numbers stay private.
- **The password is validated but never sent or stored.** Storing passwords properly needs hashing and a login system, which is a separate feature.

## Run locally

1. `npm install`
2. Create a `.env` file with `DATABASE_URL=your Neon connection string` (never commit it).
3. `npm run db:setup` creates the table.
4. In `vite.config.js`, point the `/api` proxy at your deployed URL.
5. `npm run dev`

## What I would add next

Pagination for the list, rate limiting on the signup endpoint, email confirmation, and a login system with hashed passwords.