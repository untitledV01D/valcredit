export interface PaymentPlanItem {
    paymentNumber: number;
    paymentAmount: number;
    pendingAmount: number;
}

export function calculatePaymentPlan(requestedValue: number, monthlyPayments: number): PaymentPlanItem[] {
    const monthlyAmount = requestedValue / monthlyPayments;
    const plan: PaymentPlanItem[] = [];
    let balance = requestedValue;

    for (let i = 1; i <= monthlyPayments; i++) {
        const row = {
            paymentNumber: i,
            paymentAmount: Math.round(monthlyAmount),
            pendingAmount: Math.max(0, Math.round(balance)),
        };
        balance -= monthlyAmount;
        plan.push(row);
    }

    return plan;
}
