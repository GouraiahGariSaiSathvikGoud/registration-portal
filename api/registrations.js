import pg from "pg";
import * as Yup from "yup";

const { Pool } = pg;

// One connection pool, created the first time the function runs and reused after that.
let pool;
function getPool() {
  if (!pool) pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 3 });
  return pool;
}

// The server checks the data again. A browser check can be bypassed, so never trust it alone.
const schema = Yup.object({
  fullName: Yup.string().trim().required("Enter your full name.").min(3, "Use at least 3 characters.").max(60, "Keep it under 60 characters."),
  email: Yup.string().trim().required("Enter your email address.").email("Enter a valid email, like name@example.com.").max(254),
  phone: Yup.string()
    .transform((value) => (value ? value.replace(/[\s-]/g, "") : value))
    .required("Enter a phone number.")
    .matches(/^\+?\d{10,15}$/, "Use 10 to 15 digits. A leading + is fine."),
  country: Yup.string().trim().required("Choose your country.").max(80),
});

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      // Public list: names and countries only. Emails and phone numbers stay private.
      const { rows } = await getPool().query(
        `SELECT id, full_name AS "fullName", country, created_at AS "createdAt"
           FROM registrations
          ORDER BY created_at DESC, id DESC`,
      );
      return res.status(200).json(rows);
    }

    if (req.method === "POST") {
      let data;
      try {
        data = await schema.validate(req.body ?? {}, { abortEarly: false, stripUnknown: true });
      } catch (error) {
        if (error.name !== "ValidationError") throw error;
        const errors = {};
        for (const item of error.inner) errors[item.path] ??= item.message;
        return res.status(400).json({ error: "VALIDATION_FAILED", errors });
      }

      try {
        // $1, $2... are placeholders. The database inserts the values safely, which blocks SQL injection.
        const { rows } = await getPool().query(
          `INSERT INTO registrations (full_name, email, phone, country)
           VALUES ($1, $2, $3, $4)
           RETURNING id, full_name AS "fullName", country, created_at AS "createdAt"`,
          [data.fullName, data.email.toLowerCase(), data.phone, data.country],
        );
        return res.status(201).json(rows[0]);
      } catch (error) {
        if (error.code === "23505") {
          // 23505 is Postgres saying the UNIQUE email rule was broken.
          return res.status(409).json({ error: "EMAIL_TAKEN", message: "This email is already registered." });
        }
        throw error;
      }
    }

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "METHOD_NOT_ALLOWED", message: "Use GET or POST." });
  } catch (error) {
    console.error(error); // full detail goes to the Vercel logs, not to the visitor
    return res.status(500).json({ error: "SERVER_ERROR", message: "Something went wrong on the server. Please try again." });
  }
}