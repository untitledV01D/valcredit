import { Request, Response } from "express";
import { prisma } from "../../client";
import { ApplicationStatus } from "../generated/prisma";

export async function list(req: Request, res: Response) {
  const list = await prisma.creditApplication.findMany({
    orderBy: { createdAt: "desc" },
    include: { customer: true },
  });
  res.json(list);
}

interface UpdateStatusParams {
  id: string;
}

interface UpdateStatusBody {
  status: ApplicationStatus;
}

export async function update(
  req: Request<UpdateStatusParams, {}, UpdateStatusBody>,
  res: Response,
) {
  const { id } = req.params;
  const { status } = req.body;
  const updated = await prisma.creditApplication.update({
    where: { id },
    data: { status },
  });
  res.json(updated);
}
