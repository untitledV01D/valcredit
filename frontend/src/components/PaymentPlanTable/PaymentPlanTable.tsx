interface PaymentPlan {
  paymentNumber: number;
  paymentAmount: number;
  pendingAmount: number;
}

interface PaymentPlanTableProps {
  paymentPlan: PaymentPlan[];
}

function PaymentPlanTable({ paymentPlan }: PaymentPlanTableProps) {
  if (paymentPlan.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-lg">
      {/* Header */}
      <div className="border-b border-zinc-800 px-5 py-4">
        <h3 className="text-sm font-medium text-zinc-200">
          Este es tu plan de pagos mensual
        </h3>
        <p className="text-xs text-zinc-400">Cuotas fijas sin intereses</p>
      </div>

      {/* Table wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-zinc-950 text-zinc-400">
            <tr>
              <th className="px-5 py-3 text-left font-medium">Cuota</th>
              <th className="px-5 py-3 text-right font-medium">Valor cuota</th>
              <th className="px-5 py-3 text-right font-medium">
                Saldo pendiente
              </th>
            </tr>
          </thead>

          <tbody>
            {paymentPlan.map((payment) => (
              <tr
                key={payment.paymentNumber}
                className="border-t border-zinc-800 hover:bg-zinc-800/40 transition-colors"
              >
                <td className="px-5 py-3 text-zinc-200">
                  {payment.paymentNumber}
                </td>
                <td className="px-5 py-3 text-right text-zinc-200">
                  ${payment.paymentAmount.toLocaleString()}
                </td>
                <td className="px-5 py-3 text-right text-zinc-300">
                  $
                  {Math.max(
                    payment.pendingAmount - payment.paymentAmount,
                    0,
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { PaymentPlanTable };
