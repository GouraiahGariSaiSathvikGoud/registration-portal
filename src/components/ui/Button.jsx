const VARIANTS = {
  primary:
    "border-2 border-navy bg-signal text-navy shadow-[0_3px_0_0_var(--color-navy)] hover:brightness-105 active:translate-y-[2px] active:shadow-none",
  secondary: "border-2 border-navy bg-transparent text-navy hover:bg-navy/5",
};

export function Button({ variant = "primary", isLoading = false, disabled, className = "", children, ...props }) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex min-h-12 items-center justify-center rounded-[10px] px-6 font-semibold transition disabled:opacity-60 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {isLoading ? "Please wait..." : children}
    </button>
  );
}