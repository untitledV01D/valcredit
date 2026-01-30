import * as v from "valibot";
import { Request, Response } from "express";
import * as CustomerService from "../services/customer.service";
import { signUpSchema } from "../schemas/signUpSchema";

type SignUpBody = v.InferOutput<typeof signUpSchema>;

export async function create(
  req: Request<{}, {}, SignUpBody>,
  res: Response,
) {
  const customer = await CustomerService.create(req.body);
  res.status(201).json({ success: true, customer });
}

export async function getOne(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const customer = await CustomerService.get(id);
  if (!customer)
    return res
      .status(404)
      .json({ success: false, message: "Customer not found" });
  res.json({ success: true, customer });
}

