import * as v from "valibot";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { creditSchema } from "../../schemas/creditSchema";

type FormFields = v.InferOutput<typeof creditSchema>;

interface CreditFormProps {
  onSimulationChange: (requestedValue: number, monthlyPayments: number) => void;
  onValidationChange: (isValid: boolean) => void;
}

function CreditForm({
  onSimulationChange,
  onValidationChange,
}: CreditFormProps) {
  "use no memo";
  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<FormFields>({
    mode: "onChange",
    resolver: valibotResolver(creditSchema),
  });

  const requestedValue = watch("requestedValue");
  const monthlyPayments = watch("monthlyPayments");

  useEffect(() => {
    if (requestedValue && monthlyPayments) {
      onSimulationChange(requestedValue, monthlyPayments);
    } else {
      onSimulationChange(0, 0);
    }
  }, [requestedValue, monthlyPayments, onSimulationChange]);

  useEffect(() => {
    onValidationChange(isValid);
  }, [isValid, onValidationChange]);

  return (
    <form className="space-y-6">
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-400">
          Valor solicitado
        </label>
        <input
          {...register("requestedValue", { valueAsNumber: true })}
          type="number"
          min={100000}
          max={100000000}
          placeholder="Ej: 5.000.000"
          className="
            w-full rounded-xl border border-zinc-800
            bg-zinc-950
            px-4 py-2.5 text-sm
            text-zinc-100
            placeholder:text-zinc-600
            focus:border-emerald-500
            focus:ring-2 focus:ring-emerald-500/20
            outline-none transition
          "
        />
        {errors.requestedValue && (
          <p className="text-xs text-red-400">
            {errors.requestedValue.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-400">
          Número de cuotas
        </label>
        <select
          {...register("monthlyPayments", { valueAsNumber: true })}
          className="
            w-full rounded-xl border border-zinc-800
            bg-zinc-950
            px-4 py-2.5 text-sm
            text-zinc-100
            focus:border-emerald-500
            focus:ring-2 focus:ring-emerald-500/20
            outline-none transition
          "
        >
          <option value="">Selecciona las cuotas</option>
          {Array.from({ length: 23 }, (_, i) => i + 2).map((value) => (
            <option key={value} value={value}>
              {value} cuotas
            </option>
          ))}
        </select>
        {errors.monthlyPayments && (
          <p className="text-xs text-red-400">
            {errors.monthlyPayments.message}
          </p>
        )}
      </div>
    </form>
  );
}

export { CreditForm };
