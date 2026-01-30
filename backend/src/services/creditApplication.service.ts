import { prisma } from "../../client";

export async function create(params: {
  customerId: string;
  requestedValue: number;
  monthlyPayments: number;
  plan?: any;
}) {
  return prisma.creditApplication.create({
    data: {
      customerId: params.customerId,
      requestedValue: params.requestedValue,
      monthlyPayments: params.monthlyPayments,
      status: "PENDING",
      plan: params.plan,
    },
  });
}

export async function list() {
  return prisma.creditApplication.findMany({
    include: { customer: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function update(
  id: string,
  status: "PENDING" | "APPROVED" | "REJECTED",
) {
  return prisma.creditApplication.update({
    where: { id },
    data: { status },
  });
}
