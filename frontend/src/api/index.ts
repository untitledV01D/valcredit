import api from "./apiClient";
import type {
  Customer,
  CreditApplication,
  NewCustomer,
  NewCreditApplication,
} from "./types";

// Create a new customer
export async function createCustomer(customer: NewCustomer): Promise<Customer> {
  const response: { success: boolean; customer: Customer } = await api.post(
    "/api/customers",
    customer,
  );
  return response.customer;
}

// Create a credit application
export async function createCreditRequest(
  payload: NewCreditApplication,
): Promise<CreditApplication> {
  const response: { success: boolean; result: CreditApplication } =
    await api.post("/api/request", payload);
  return response.result;
}

// Simulate a credit plan
export async function simulateCredit(payload: {
  requestedValue: number;
  monthlyPayments: number;
}): Promise<{
  success: boolean;
  paymentPlan: {
    paymentNumber: number;
    paymentAmount: number;
    pendingAmount: number;
  }[];
}> {
  const response: {
    success: boolean;
    paymentPlan: {
      paymentNumber: number;
      paymentAmount: number;
      pendingAmount: number;
    }[];
  } = await api.post("/api/request/simulate", payload);
  return response;
}

// List all credit applications
export async function listRequests(): Promise<CreditApplication[]> {
  const response: { success: boolean; result: CreditApplication[] } =
    await api.get("/api/request");
  return response.result || [];
}

// Update status of a credit application
export async function updateRequestStatus(
  id: string,
  status: "PENDING" | "APPROVED" | "REJECTED",
): Promise<CreditApplication> {
  const response: { success: boolean; result: CreditApplication } =
    await api.patch(`/api/request/${id}`, { status });
  return response.result;
}

export default {
  createCustomer,
  createCreditRequest,
  simulateCredit,
  listRequests,
  updateRequestStatus,
};
