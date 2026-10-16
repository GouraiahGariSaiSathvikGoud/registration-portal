import { useState } from "react";
import { RegistrationForm } from "./components/RegistrationForm";

export default function App() {
  // Bumping this number tells the list to reload after someone registers.
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
          <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-navy font-display text-lg font-extrabold text-signal">
            L
          </span>
          <span className="font-display text-xl font-extrabold">Launchpad</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 lg:py-12">
        <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl">Reserve your seat</h1>
        <p className="mt-3 max-w-xl text-lg text-navy-soft">
          A one-day developer summit in Hyderabad on 21 Nov 2026. Register below and see who else is coming.
        </p>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <RegistrationForm onRegistered={() => setRefreshKey((key) => key + 1)} />
          {/* AttendeeList goes here in Phase 10. refreshKey is unused until then. */}
        </div>
      </main>
    </>
  );
}