"use client";

import { useState } from "react";
import { Search, Plus, Pen, Trash2, X } from "lucide-react";
import { useData } from "@/context/DataContext";

export default function AdminFilmes() {
  const { movies = [], setMovies } = useData();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    rating: "",
    location: "",
  });

  const filteredMovies = (movies || []).filter(
    (movie) =>
      movie?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie?.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleStatus = (id: string) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id
          ? {
              ...movie,
              status: movie.status === "Disponível" ? "Emprestado" : "Disponível",
            }
          : movie
      )
    );
  };

  const handleOpenCreateModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      category: "",
      rating: "",
      location: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (movie: any) => {
    setEditingId(movie.id);
    setFormData({
      title: movie.title || "",
      category: movie.category || "",
      rating: movie.rating || movie.ageRating || "",
      location: movie.location || "",
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      title: "",
      category: "",
      rating: "",
      location: "",
    });
  };

  const handleDelete = (id: string) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    if (editingId) {
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie.id === editingId
            ? {
                ...movie,
                title: formData.title,
                category: formData.category || "-",
                rating: formData.rating || "-",
                location: formData.location || "-",
              }
            : movie
        )
      );
    } else {
      const newMovie = {
        id: String(Date.now()),
        title: formData.title,
        category: formData.category || "-",
        rating: formData.rating || "-",
        location: formData.location || "-",
        status: "Disponível",
      };
      setMovies((prevMovies) => [newMovie, ...prevMovies]);
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
            placeholder="Buscar por título ou categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#00BFD8] transition-colors placeholder:text-slate-400"
          />
        </div>

        <button
          type="button"
          onClick={handleOpenCreateModal}
          className="flex items-center gap-2 bg-[#00BFD8] hover:bg-[#00a8ba] text-white font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-colors text-sm"
        >
          <Plus size={18} />
          <span>Adicionar filme</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <span className="text-sm font-medium text-slate-500">
            {filteredMovies.length} filmes encontrados
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 text-xs text-slate-400 font-semibold uppercase border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">TÍTULO</th>
                <th className="px-6 py-4">CATEGORIA</th>
                <th className="px-6 py-4">CLASSIFICAÇÃO</th>
                <th className="px-6 py-4">LOCALIZAÇÃO</th>
                <th className="px-6 py-4">STATUS</th>
                <th className="px-6 py-4 text-right pr-10">AÇÕES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMovies.map((movie) => (
                <tr key={movie.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {movie.title}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {movie.category}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {movie.rating || movie.ageRating || "-"}
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-['Consolas']">
                    {movie.location}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(movie.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors font-['Consolas'] ${
                        movie.status === "Disponível"
                          ? "bg-emerald-100/80 text-emerald-700 hover:bg-emerald-200/80"
                          : "bg-amber-100/80 text-amber-700 hover:bg-amber-200/80"
                      }`}
                    >
                      {movie.status}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right pr-10">
                    <div className="flex items-center justify-end gap-3 text-slate-400">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(movie)}
                        className="hover:text-slate-600 transition-colors p-1"
                      >
                        <Pen size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(movie.id)}
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
                {editingId ? "Editar filme" : "Adicionar filme"}
              </h2>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-slate-800">
                  Título <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Matrix"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200/80 rounded-xl text-sm focus:outline-none focus:border-[#00BFD8] focus:bg-white transition-colors placeholder:text-slate-400 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-slate-800">
                    Categoria
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Ficção Científica"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200/80 rounded-xl text-sm focus:outline-none focus:border-[#00BFD8] focus:bg-white transition-colors placeholder:text-slate-400 text-slate-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-slate-800">
                    Classificação
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 14 anos"
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({ ...formData, rating: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200/80 rounded-xl text-sm focus:outline-none focus:border-[#00BFD8] focus:bg-white transition-colors placeholder:text-slate-400 text-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-slate-800">
                  Localização
                </label>
                <input
                  type="text"
                  placeholder="Ex: DVD-A1"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200/80 rounded-xl text-sm focus:outline-none focus:border-[#00BFD8] focus:bg-white transition-colors placeholder:text-slate-400 text-slate-800"
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
                  {editingId ? "Salvar" : "Adicionar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}