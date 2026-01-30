import { useEffect, useState } from "react";
import api from "../api";
import { ApplicationStatus } from "../api/types";
import type { CreditApplication } from "../api/types";

function AdminPage() {
  const [requests, setRequests] = useState<CreditApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await api.listRequests();
      setRequests(res);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error cargando solicitudes",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusChange = async (
    id: string,
    newStatus: ApplicationStatus,
  ) => {
    try {
      await api.updateRequestStatus(id, newStatus);
      // Refresh list to be sure or update local state
      setRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, status: newStatus } : req,
        ),
      );
    } catch (err) {
      alert(
        "Error actualizando estado: " +
          (err instanceof Error ? err.message : "Unknown error"),
      );
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Administración de Créditos</h1>
          <button
            onClick={fetchRequests}
            className="rounded-lg bg-zinc-800 px-4 py-2 text-sm hover:bg-zinc-700"
          >
            Refrescar
          </button>
        </header>

        {loading ? (
          <div className="py-10 text-center text-zinc-500">Cargando...</div>
        ) : error ? (
          <div className="py-10 text-center text-red-500">{error}</div>
        ) : requests.length === 0 ? (
          <div className="py-10 text-center text-zinc-500">
            No hay solicitudes registradas
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-950 text-zinc-400">
                  <tr>
                    <th className="px-6 py-4 font-medium">Fecha</th>
                    <th className="px-6 py-4 font-medium">Cliente</th>
                    <th className="px-6 py-4 font-medium">Documento</th>
                    <th className="px-6 py-4 font-medium text-right">Monto</th>
                    <th className="px-6 py-4 font-medium text-center">
                      Cuotas
                    </th>
                    <th className="px-6 py-4 font-medium">Estado</th>
                    <th className="px-6 py-4 font-medium text-right">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {requests.map((req) => (
                    <tr key={req.id} className="hover:bg-zinc-800/50">
                      <td className="px-6 py-4 text-zinc-400">
                        {req.createdAt
                          ? new Date(req.createdAt).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-zinc-200">
                          {req.customer?.firstName} {req.customer?.lastName}
                        </div>
                        <div className="text-xs text-zinc-500">
                          {req.customer?.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-zinc-300">
                        {req.customer?.documentType}{" "}
                        {req.customer?.documentNumber}
                      </td>
                      <td className="px-6 py-4 text-right text-zinc-200">
                        ${req.requestedValue?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-center text-zinc-300">
                        {req.monthlyPayments}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`
                            inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                            ${
                              req.status === "APPROVED"
                                ? "bg-emerald-500/10 text-emerald-400"
                                : req.status === "REJECTED"
                                  ? "bg-red-500/10 text-red-400"
                                  : "bg-yellow-500/10 text-yellow-400"
                            }
                          `}
                        >
                          {req.status === "APPROVED"
                            ? "Aprobado"
                            : req.status === "REJECTED"
                              ? "Rechazado"
                              : "Pendiente"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          {req.status === "PENDING" && (
                            <>
                              <button
                                onClick={() =>
                                  handleStatusChange(
                                    req.id,
                                    ApplicationStatus.APPROVED,
                                  )
                                }
                                title="Aprobar"
                                className="rounded p-1.5 hover:bg-emerald-500/20"
                              >
                                <div className="w-4 h-4 bg-emerald-500" />
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusChange(
                                    req.id,
                                    ApplicationStatus.REJECTED,
                                  )
                                }
                                title="Rechazar"
                                className="rounded p-1.5 hover:bg-red-500/20"
                              >
                                <div className="w-4 h-4 bg-red-500" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
