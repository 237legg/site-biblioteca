"use client";

import { useState } from "react";
import { Search, Plus, Pen, Trash2, X, ChevronDown } from "lucide-react";
import { useData } from "@/context/DataContext";

export default function AdminLivros() {
  const { books = [], setBooks } = useData();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    ageRating: "",
    location: "",
    status: "disponivel",
  });

  // Filtro com validação defensiva contra campos indefinidos
  const filteredBooks = (books || []).filter(
    (book) =>
      book?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book?.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book?.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleStatus = (id: string) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id
          ? {
              ...book,
              status: book.status === "Disponível" ? "Emprestado" : "Disponível",
            }
          : book
      )
    );
  };

  const handleOpenCreateModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      author: "",
      category: "",
      ageRating: "",
      location: "",
      status: "disponivel",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (book: any) => {
    setEditingId(book.id);
    setFormData({
      title: book.title || "",
      author: book.author || "",
      category: book.category || "",
      ageRating: book.ageRating || "",
      location: book.location || "",
      status: book.status?.toLowerCase() === "emprestado" ? "emprestado" : "disponivel",
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      title: "",
      author: "",
      category: "",
      ageRating: "",
      location: "",
      status: "disponivel",
    });
  };

  const handleDelete = (id: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.author) return;

    const formattedStatus =
      formData.status === "emprestado" ? "Emprestado" : "Disponível";

    if (editingId) {
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === editingId
            ? {
                ...book,
                title: formData.title,
                author: formData.author,
                category: formData.category || "-",
                ageRating: formData.ageRating || "-",
                location: formData.location || "-",
                status: formattedStatus,
              }
            : book
        )
      );
    } else {
      const newBook = {
        id: String(Date.now()),
        title: formData.title,
        author: formData.author,
        category: formData.category || "-",
        ageRating: formData.ageRating || "-",
        location: formData.location || "-",
        status: formattedStatus,
      };
      setBooks((prevBooks) => [newBook, ...prevBooks]);
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
            placeholder="Buscar por título, autor ou categoria..."
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
          <span>Adicionar livro</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <span className="text-sm font-medium text-slate-500">
            {filteredBooks.length} livros encontrados
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 text-xs text-slate-400 font-semibold uppercase border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">TÍTULO</th>
                <th className="px-6 py-4">AUTOR</th>
                <th className="px-6 py-4">CATEGORIA</th>
                <th className="px-6 py-4">FAIXA ETÁRIA</th>
                <th className="px-6 py-4">LOCALIZAÇÃO</th>
                <th className="px-6 py-4">STATUS</th>
                <th className="px-6 py-4 text-right pr-10">AÇÕES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBooks.map((book) => (
                <tr key={book.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {book.title}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {book.author}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {book.category}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {book.ageRating}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {book.location}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(book.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                        book.status === "Disponível"
                          ? "bg-emerald-100/80 text-emerald-700 hover:bg-emerald-200/80"
                          : "bg-amber-100/80 text-amber-700 hover:bg-amber-200/80"
                      }`}
                    >
                      {book.status}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right pr-10">
                    <div className="flex items-center justify-end gap-3 text-slate-400">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(book)}
                        className="hover:text-slate-600 transition-colors p-1"
                      >
                        <Pen size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(book.id)}
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
        <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <h2 className="text-lg font-semibold text-slate-900">
                {editingId ? "Editar livro" : "Adicionar livro"}
              </h2>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-900">
                  Título <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: O Senhor dos Anéis"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#f1f5f9]/70 border border-slate-200/50 rounded-xl text-sm focus:outline-none focus:border-[#00BFD8] focus:bg-white transition-colors placeholder:text-slate-400 text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-900">
                  Autor <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: J.R.R. Tolkien"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#f1f5f9]/70 border border-slate-200/50 rounded-xl text-sm focus:outline-none focus:border-[#00BFD8] focus:bg-white transition-colors placeholder:text-slate-400 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-900">
                    Categoria
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Fantasia"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#f1f5f9]/70 border border-slate-200/50 rounded-xl text-sm focus:outline-none focus:border-[#00BFD8] focus:bg-white transition-colors placeholder:text-slate-400 text-slate-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-900">
                    Faixa Etária
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 14+"
                    value={formData.ageRating}
                    onChange={(e) =>
                      setFormData({ ...formData, ageRating: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#f1f5f9]/70 border border-slate-200/50 rounded-xl text-sm focus:outline-none focus:border-[#00BFD8] focus:bg-white transition-colors placeholder:text-slate-400 text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-900">
                    Localização
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: A-01"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#f1f5f9]/70 border border-slate-200/50 rounded-xl text-sm focus:outline-none focus:border-[#00BFD8] focus:bg-white transition-colors placeholder:text-slate-400 text-slate-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-900">
                    Status
                  </label>
                  <div className="relative">
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[#f1f5f9]/70 border border-slate-200/50 rounded-xl text-sm focus:outline-none focus:border-[#00BFD8] focus:bg-white transition-colors text-slate-800 appearance-none cursor-pointer pr-10 font-normal"
                    >
                      <option value="disponivel">disponivel</option>
                      <option value="emprestado">emprestado</option>
                    </select>
                    <ChevronDown
                      size={18}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-700 pointer-events-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2.5 border border-slate-200 text-slate-800 font-semibold rounded-xl hover:bg-slate-50 transition-colors text-sm"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#00BFD8] hover:bg-[#00a8ba] text-white font-semibold rounded-xl transition-colors text-sm shadow-sm"
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