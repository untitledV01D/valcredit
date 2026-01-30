import * as v from "valibot";
import { isAdult } from "../utils/isAdult";

enum DocumentType {
  CC = "CC",
  CE = "CE",
  TI = "TI",
  NIT = "NIT",
}

enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export const signUpSchema = v.object({
  documentType: v.enum(DocumentType, "Tipo de documento es requerido"),

  documentNumber: v.pipe(
    v.string(),
    v.nonEmpty("Número de documento es requerido"),
    v.regex(/^\d+$/, "Solo están permitidos números"),
    v.minLength(5, "Mínimo 5 digitos"),
  ),

  firstName: v.pipe(
    v.string(),
    v.nonEmpty("El primer nombre es requerido"),
    v.minLength(2, "Mínimo 2 caracteres"),
  ),

  lastName: v.pipe(
    v.string(),
    v.nonEmpty("El ultimo nombre es requerido"),
    v.minLength(2, "Minimo dos carácteres"),
  ),

  gender: v.enum(Gender, "Género es requerido"),

  birthDate: v.pipe(v.date(), v.check(isAdult, "Debes ser mayor de 18 años")),

  phone: v.pipe(
    v.string(),
    v.nonEmpty("El celular es requerido"),
    v.regex(/^\d{10,13}$/, "El celular debe tener entre 10 y 13 dígitos"),
  ),

  email: v.pipe(
    v.string(),
    v.nonEmpty("El correo es requerido"),
    v.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Formato de correo inválido"),
  ),
});
