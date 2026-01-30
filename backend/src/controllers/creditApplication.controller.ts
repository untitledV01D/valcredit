import * as v from "valibot";
import { Request, Response } from "express";
import { creditSchema } from "../schemas/creditSchema";
import * as CreditService from "../services/creditApplication.service";
import * as CustomerService from "../services/customer.service";
import { calculatePaymentPlan } from "../utils/calculatePlan";

import { signUpSchema } from "../schemas/signUpSchema";

interface PutRequestParams {
  id: string;
}

interface PutRequestBody {
  status: "PENDING" | "APPROVED" | "REJECTED";
}

type CreditBody = v.InferOutput<typeof creditSchema>;

interface PostRequestBody extends CreditBody {
  customerId?: string;
  customer?: v.InferOutput<typeof signUpSchema>;
}

export async function create(
  req: Request<{}, {}, PostRequestBody>,
  res: Response,
) {
  const { customerId, customer, requestedValue, monthlyPayments } = req.body;

  // validate credit payload
  try {
    v.parse(creditSchema, { requestedValue, monthlyPayments });
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message });
  }

  let custId = customerId;
  if (!custId && customer) {
    const created = await CustomerService.create(customer);
    custId = created.id;
  }

  if (!custId) {
    return res.status(400).json({
      success: false,
      message: "customerId or customer data is required",
    });
  }

  // Calculate plan
  const plan = calculatePaymentPlan(requestedValue, monthlyPayments);

  const result = await CreditService.create({
    customerId: custId,
    requestedValue,
    monthlyPayments,
    plan,
  });

  res.status(201).json({ success: true, result });
}

export async function list(req: Request, res: Response) {
  const result = await CreditService.list();
  res.status(200).json({ success: true, result });
}

export async function update(
  req: Request<PutRequestParams, {}, PutRequestBody>,
  res: Response,
) {
  const result = await CreditService.update(req.params.id, req.body.status);
  res.status(200).json({ success: true, result });
}

export async function simulate(
  req: Request<{}, {}, CreditBody>,
  res: Response,
) {
  const { requestedValue, monthlyPayments } = req.body;

  try {
    v.parse(creditSchema, { requestedValue, monthlyPayments });
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message });
  }

  const plan = calculatePaymentPlan(requestedValue, monthlyPayments);

  res.status(200).json({ success: true, paymentPlan: plan });
}
