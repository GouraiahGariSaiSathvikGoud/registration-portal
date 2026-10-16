import { useFormikContext } from "formik";

// A boarding-pass style card that fills in as the person types.
// It reads the live form values from Formik, so it needs no props.
function initialsOf(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "--";
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

export function TicketPreview() {
  const { values } = useFormikContext();
  const name = values.fullName.trim();
  const country = values.country;

  return (
    // aria-hidden: it only repeats what the person typed, so screen readers can skip it.
    <div aria-hidden="true" className="mb-6 flex overflow-hidden rounded-[16px] bg-navy text-paper shadow-md">
      <div className="min-w-0 flex-1 p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-signal">Launchpad 2026 · Admit one</p>
        <p className={`mt-2 truncate font-display text-2xl font-extrabold ${name ? "" : "opacity-40"}`}>
          {name || "Your name"}
        </p>
        <p className={`truncate text-sm ${country ? "" : "opacity-40"}`}>{country || "Your country"}</p>
        <p className="mt-3 text-xs opacity-70">21 Nov 2026 · Hyderabad</p>
      </div>
      <div className="grid w-24 shrink-0 place-items-center border-l-2 border-dashed border-paper/30 bg-signal px-2 text-navy">
        <span className="font-display text-3xl font-extrabold">{initialsOf(name)}</span>
      </div>
    </div>
  );
}