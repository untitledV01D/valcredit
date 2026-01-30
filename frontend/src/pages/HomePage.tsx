import { useState, useCallback } from "react";
import {
  CreditForm,
  PaymentPlanTable,
  SignUp,
  SuccessModal,
  ErrorModal,
} from "../components";
import api from "../api";
import type { NewCustomer } from "../api/types";

interface PaymentPlan {
  paymentNumber: number;
  paymentAmount: number;
  pendingAmount: number;
}

function HomePage() {
  const [paymentPlan, setPaymentPlan] = useState<PaymentPlan[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [requestedValue, setRequestedValue] = useState(0);
  const [monthlyPayments, setMonthlyPayments] = useState(0);

  const handleSimulationChange = useCallback(
    async (val: number, months: number) => {
      setRequestedValue(val || 0);
      setMonthlyPayments(months || 0);

      if (
        !val ||
        !months ||
        val < 100000 ||
        val > 100000000 ||
        months < 2 ||
        months > 24
      ) {
        setPaymentPlan([]);
        return;
      }

      try {
        const res = await api.simulateCredit({
          requestedValue: val,
          monthlyPayments: months,
        });
        if (res.paymentPlan) {
          setPaymentPlan(res.paymentPlan);
        }
      } catch (error) {
        console.error("Simulation error", error);
        // setPaymentPlan([]); // keep previous or clear? clear is safer
      }
    },
    [],
  );

  const handleSignUpSubmit = async (customer: Record<string, unknown>) => {
    if (!requestedValue || !monthlyPayments) {
      alert("Por favor completa la simulación antes de registrarte.");
      return;
    }

    try {
      await api.createCreditRequest({
        customer: customer as NewCustomer,
        requestedValue,
        monthlyPayments,
      });
      setIsSignUpOpen(false);
      setIsSuccessOpen(true);
    } catch (err) {
      console.error(err);
      setIsErrorOpen(true);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 sm:py-16">
      <div className="mx-auto w-full max-w-6xl">
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl p-6 sm:p-10 space-y-10">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-xl sm:text-2xl font-semibold text-zinc-100">
              Simula tu crédito en minutos
            </h1>
            <p className="text-sm text-zinc-400">
              Conoce tu plan de pagos antes de registrarte
            </p>
          </div>

          {/* Content */}
          <div className="grid gap-10 lg:grid-cols-[1.1fr_2fr]">
            <CreditForm
              onSimulationChange={handleSimulationChange}
              onValidationChange={setIsFormValid}
            />

            {isFormValid && <PaymentPlanTable paymentPlan={paymentPlan} />}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 max-w-6xl mx-auto">
          <button
            disabled={!isFormValid}
            onClick={() => setIsSignUpOpen(true)}
            className={`
              w-full rounded-xl py-3.5 font-medium transition-all
              ${
                isFormValid
                  ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                  : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              }
            `}
          >
            ¡Lo quiero!
          </button>
        </div>
      </div>

      <SignUp
        open={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onSubmit={handleSignUpSubmit}
      />

      <SuccessModal
        open={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />

      <ErrorModal open={isErrorOpen} onClose={() => setIsErrorOpen(false)} />
    </main>
  );
}

export default HomePage;
