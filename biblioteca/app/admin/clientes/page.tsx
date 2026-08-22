"use client";

import { useState } from "react";
import { Search, Plus, Pen, Trash2, X } from "lucide-react";
import { useData } from "@/context/DataContext";

export default function AdminClientes() {
  const { clients = [], setClients } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const filteredClients = clients.filter(
    (client) =>
      client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const handleOpenCreateModal = () => {
    setEditingId(null);
    setFormData({ name: "", phone: "", email: "" });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (client: any) => {
    setEditingId(client.id);
    setFormData({
      name: client.name,
      phone: client.phone === "-" ? "" : client.phone,
      email: client.email === "-" ? "" : client.email,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ name: "", phone: "", email: "" });
  };

  const handleDelete = (id: string) => {
    setClients(clients.filter((client) => client.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    if (editingId) {
      setClients(
        clients.map((client) =>
          client.id === editingId
            ? {
                ...client,
                name: formData.name,
                initials: getInitials(formData.name),
                phone: formData.phone || "-",
                email: formData.email || "-",
              }
            : client
        )
      );
    } else {
      const newClient = {
        id: String(Date.now()),
        name: formData.name,
        initials: getInitials(formData.name),
        phone: formData.phone || "-",
        email: formData.email || "-",
      };
      setClients([newClient, ...clients]);
    }

    handleCloseModal();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-96">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nome ou e-mail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#00BFD8] transition-colors placeholder:text-slate-400"
          />
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="flex items-center gap-2 bg-[#00BFD8] hover:bg-[#00a8ba] text-white font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-colors text-sm"
        >
          <Plus size={18} />
          <span>Cadastrar cliente</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <span className="text-sm font-medium text-slate-500">
            {filteredClients.length} clientes encontrados
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 text-xs text-slate-400 font-semibold uppercase border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">NOME</th>
                <th className="px-6 py-4">TELEFONE</th>
                <th className="px-6 py-4">E-MAIL</th>
                <th className="px-6 py-4 text-right pr-10">AÇÕES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-cyan-50 text-[#00BFD8] font-bold text-xs flex items-center justify-center shrink-0">
                        {client.initials}
                      </div>
                      <span className="font-medium text-slate-900">{client.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-['Consolas']">
                    {client.phone}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {client.email}
                  </td>
                  <td className="px-6 py-4 text-right pr-10">
                    <div className="flex items-center justify-end gap-3 text-slate-400">
                      <button
                        onClick={() => handleOpenEditModal(client)}
                        className="hover:text-slate-600 transition-colors p-1"
                      >
                        <Pen size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(client.id)}
                        className="hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <h2 className="text-lg font-semibold text-slate-900">
                {editingId ? "Editar cliente" : "Cadastrar cliente"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-800">
                  Nome completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: João da Silva"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200/80 rounded-xl text-sm focus:outline-none focus:border-[#00BFD8] focus:bg-white transition-colors placeholder:text-slate-600 text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-800">
                  Telefone
                </label>
                <input
                  type="text"
                  placeholder="Ex: (35) 99999-0000"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200/80 rounded-xl text-sm focus:outline-none focus:border-[#00BFD8] focus:bg-white transition-colors placeholder:text-slate-600 text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-800">
                  E-mail
                </label>
                <input
                  type="email"
                  placeholder="Ex: joao@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200/80 rounded-xl text-sm focus:outline-none focus:border-[#00BFD8] focus:bg-white transition-colors placeholder:text-slate-600 text-slate-800"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 border border-slate-200 text-slate-800 font-medium rounded-xl hover:bg-slate-50 transition-colors text-sm"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#00BFD8] hover:bg-[#00a8ba] text-white font-semibold rounded-xl transition-colors text-sm shadow-sm"
                >
                  {editingId ? "Salvar" : "Cadastrar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}