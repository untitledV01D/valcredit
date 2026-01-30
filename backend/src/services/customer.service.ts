import * as v from "valibot";
import { prisma } from "../../client";
import { signUpSchema } from "../schemas/signUpSchema";

type CustomerInput = v.InferOutput<typeof signUpSchema>;

export async function create(data: CustomerInput) {
  const validated = v.parse(signUpSchema, data);

  return prisma.customer.upsert({
    where: { email: validated.email.toLowerCase() },
    update: {},
    create: {
      firstName: validated.firstName,
      lastName: validated.lastName,
      email: validated.email.toLowerCase(),
      phone: validated.phone,
      gender: validated.gender,
      birthDate: validated.birthDate,
      documentType: validated.documentType,
      documentNumber: validated.documentNumber,
    },
  });
}

export async function get(id: string) {
  return prisma.customer.findUnique({
    where: { id },
    include: { creditApplications: true },
  });
}
