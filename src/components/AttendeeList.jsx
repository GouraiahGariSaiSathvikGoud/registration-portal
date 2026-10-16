import { useEffect, useState } from "react";
import { listRegistrations } from "../services/api";
import { Button } from "./ui/Button";

function initialsOf(name) {
  const parts = name.trim().split(/\s+/);
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

export function AttendeeList({ refreshKey }) {
  const [state, setState] = useState({ status: "loading", items: [], error: null });
  const [attempt, setAttempt] = useState(0);

  // Load the list on first render, again after a new registration (refreshKey), and on "Try again".
  useEffect(() => {
    let ignore = false; // stops an old request from overwriting newer data
    listRegistrations()
      .then((items) => !ignore && setState({ status: "ready", items, error: null }))
      .catch((error) => !ignore && setState({ status: "error", items: [], error }));
    return () => {
      ignore = true;
    };
  }, [refreshKey, attempt]);

  function retry() {
    setState({ status: "loading", items: [], error: null });
    setAttempt((count) => count + 1);
  }

  return (
    <section className="rounded-[20px] border border-line bg-paper p-5 shadow-sm">
      <h2 className="font-display text-xl font-bold">Who's coming</h2>

      {state.status === "loading" && <p className="mt-4 text-navy-soft">Loading the list...</p>}

      {state.status === "error" && (
        <div role="alert" className="mt-4 rounded-[12px] border border-danger/40 bg-danger-soft p-3.5 text-sm text-danger">
          <p className="font-medium">We could not load the list. {state.error.message}</p>
          <Button variant="secondary" onClick={retry} className="mt-3 min-h-11">
            Try again
          </Button>
        </div>
      )}

      {state.status === "ready" && state.items.length === 0 && (
        <p className="mt-4 text-navy-soft">No one yet. Be the first to reserve a seat.</p>
      )}

      {state.status === "ready" && state.items.length > 0 && (
        <>
          <p className="mt-1 text-sm text-navy-soft">{state.items.length} registered</p>
          <ul className="m-0 mt-3 list-none divide-y divide-line p-0">
            {state.items.map((person) => (
              <li key={person.id} className="flex items-center gap-3 py-3">
                <span
                  aria-hidden="true"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy font-display font-bold text-paper"
                >
                  {initialsOf(person.fullName)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-semibold">{person.fullName}</span>
                  <span className="block truncate text-sm text-navy-soft">{person.country}</span>
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}