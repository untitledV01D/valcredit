import * as v from "valibot";
import React from "react";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { signUpSchema } from "../../schemas/signUpSchema";

type FormFields = v.InferOutput<typeof signUpSchema>;

interface SignUpProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormFields) => Promise<void>;
}

function SignUp({ open, onClose, onSubmit }: SignUpProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormFields>({
    mode: "onChange",
    resolver: valibotResolver(signUpSchema),
  });

  const [loading, setLoading] = React.useState(false);

  const selectedGender = watch("gender");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-100">Registro</h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-200"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              setLoading(true);
              await onSubmit(data as FormFields);
            } finally {
              setLoading(false);
            }
          })}
          className="space-y-6"
        >
          {/* Document type + number */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">
                Tipo de documento
              </label>
              <select
                {...register("documentType")}
                className="
                  w-full rounded-xl border border-zinc-800
                  bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100
                  placeholder:text-zinc-600
                  focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20
                  outline-none transition
                "
              >
                <option value="">Selecciona</option>
                <option value="CC">CC</option>
                <option value="CE">CE</option>
                <option value="TI">TI</option>
                <option value="NIT">NIT</option>
              </select>
              {errors.documentType && (
                <p className="text-xs text-red-400">
                  {errors.documentType.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">
                Número de documento
              </label>
              <input
                {...register("documentNumber")}
                type="text"
                className="
                  w-full rounded-xl border border-zinc-800
                  bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100
                  placeholder:text-zinc-600
                  focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20
                  outline-none transition
                "
              />
              {errors.documentNumber && (
                <p className="text-xs text-red-400">
                  {errors.documentNumber.message}
                </p>
              )}
            </div>
          </div>

          {/* Names */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">
                Nombres
              </label>
              <input
                {...register("firstName")}
                className="
                  w-full rounded-xl border border-zinc-800
                  bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100
                  placeholder:text-zinc-600
                  focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20
                  outline-none transition
                "
              />
              {errors.firstName && (
                <p className="text-xs text-red-400">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">
                Apellidos
              </label>
              <input
                {...register("lastName")}
                className="
                  w-full rounded-xl border border-zinc-800
                  bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100
                  placeholder:text-zinc-600
                  focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20
                  outline-none transition
                "
              />
              {errors.lastName && (
                <p className="text-xs text-red-400">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Gender */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">Género</label>
            <div className="flex gap-2 flex-wrap">
              {["MALE", "FEMALE", "OTHER"].map((value) => {
                const isSelected = selectedGender === value;
                return (
                  <label
                    key={value}
                    className={`
                      cursor-pointer select-none
                      rounded-xl border px-4 py-2 text-sm transition
                      ${
                        isSelected
                          ? "bg-emerald-600 border-emerald-500 text-black"
                          : "bg-zinc-900 border-zinc-800 text-zinc-100 hover:bg-zinc-800"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      value={value}
                      {...register("gender")}
                      className="hidden"
                    />
                    {value === "MALE"
                      ? "Masculino"
                      : value === "FEMALE"
                        ? "Femenino"
                        : "Otro"}
                  </label>
                );
              })}
            </div>
            {errors.gender && (
              <p className="text-xs text-red-400">{errors.gender.message}</p>
            )}
          </div>

          {/* Birth date + Phone */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">
                Fecha de nacimiento
              </label>
              <input
                type="date"
                {...register("birthDate", { valueAsDate: true })}
                className="
                  w-full rounded-xl border border-zinc-800
                  bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100
                  placeholder:text-zinc-600
                  focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20
                  outline-none transition
                "
              />
              {errors.birthDate && (
                <p className="text-xs text-red-400">
                  {errors.birthDate.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">
                Celular
              </label>
              <input
                {...register("phone")}
                className="
                  w-full rounded-xl border border-zinc-800
                  bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100
                  placeholder:text-zinc-600
                  focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20
                  outline-none transition
                "
              />
              {errors.phone && (
                <p className="text-xs text-red-400">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">
              Correo electrónico
            </label>
            <input
              {...register("email")}
              className="
                w-full rounded-xl border border-zinc-800
                bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100
                placeholder:text-zinc-600
                focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20
                outline-none transition
              "
            />
            {errors.email && (
              <p className="text-xs text-red-400">{errors.email.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-sm text-zinc-400 hover:text-zinc-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!isValid || loading}
              className="rounded-xl bg-emerald-600 px-5 py-2 text-sm font-medium text-black disabled:opacity-40"
            >
              {loading ? "Enviando..." : "Continuar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export { SignUp };
