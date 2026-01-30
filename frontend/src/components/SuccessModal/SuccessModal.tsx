interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

function SuccessModal({ open, onClose }: SuccessModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-center shadow-xl">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>

        <h3 className="text-lg font-semibold text-zinc-100">
          ¡Solicitud recibida!
        </h3>

        <p className="mt-2 text-sm text-zinc-400">
          Gracias por registrar tu solicitud. Te contactaremos pronto.
        </p>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-black hover:bg-emerald-500 transition-colors"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}

export { SuccessModal };
