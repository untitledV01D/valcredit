import * as v from "valibot";

const creditSchema = v.object({
  requestedValue: v.pipe(
    v.number("Por favor ingresa un número válido"),
    v.minValue(100000, "El valor solicitado debe ser mayor a 100000"),
    v.maxValue(100000000, "El valor solicitado debe ser menor a 100000000"),
  ),

  monthlyPayments: v.pipe(
    v.number("Por favor ingresa un número válido"),
    v.minValue(2, "Debe ser al menos 2 meses"),
    v.maxValue(24, "No puede ser mayor a 24 meses"),
  ),
});

export { creditSchema };
