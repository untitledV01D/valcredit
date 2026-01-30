export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum DocumentType {
  CC = "CC",
  CE = "CE",
  TI = "TI",
  NIT = "NIT",
}

export enum ApplicationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: Gender;
  birthDate: Date;
  documentType: DocumentType;
  documentNumber: string;
}

export interface CreditApplication {
  id: string;
  customerId: string;
  customer?: Customer;
  requestedValue: number;
  monthlyPayments: number;
  status: ApplicationStatus;
  createdAt: Date;
}

export type NewCustomer = Omit<Customer, "id">;

// Allow either customerId OR customer object, plus the credit details
export type NewCreditApplication = {
  requestedValue: number;
  monthlyPayments: number;
} & (
  | { customerId: string; customer?: never }
  | { customer: NewCustomer; customerId?: never }
);
