"use client";

import { useState } from 'react';
import { Bell, Plus, Film, BookOpen, CheckCircle2, X } from 'lucide-react';
import { useData } from "@/context/DataContext";

const abas = [
  { id: 'andamento', titulo: 'Em andamento', corAtiva: 'bg-[#0F172A] text-white' },
  { id: 'atraso', titulo: 'Em atraso', corAtiva: 'bg-red-600 text-white' },
  { id: 'historico', titulo: 'Histórico', corAtiva: 'bg-slate-800 text-white' }
];

export default function EmprestimosAba() {
  const [abaAtiva, setAbaAtiva] = useState('andamento');
  
  // 1. Puxando DataContext
  const { 
    emprestimos, setEmprestimos, 
    clients, 
    books, setBooks, 
    movies, setMovies 
  } = useData(); 

  const listaEmprestimos = emprestimos || []; 

  // 2. Estados do Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novoEmprestimo, setNovoEmprestimo] = useState({
    cliente: '',
    tipo: 'book', 
    item: '',
    emprestimo: new Date().toISOString().split('T')[0], // data de hoje  
    devolucao: ''
  });

  const emprestimosFiltrados = listaEmprestimos.filter((emp) => {
    if (abaAtiva === 'andamento') return emp.status === 'Em andamento';
    if (abaAtiva === 'atraso') return emp.status === 'Em atraso';
    if (abaAtiva === 'historico') return emp.status === 'Concluído';
    return true;
  });

  const atrasadosQtd = listaEmprestimos.filter(emp => emp.status === 'Em atraso').length;

  const itensDisponiveis = novoEmprestimo.tipo === 'book' 
    ? books.filter(b => b.status === 'Disponível')
    : movies.filter(m => m.status === 'Disponível');

  const handleSalvarEmprestimo = (e: React.FormEvent) => {
    e.preventDefault();

    const novoId = `#00${listaEmprestimos.length + 1}`;

    const emprestimoFinal = {
      id: novoId,
      ...novoEmprestimo,
      status: 'Em andamento'
    };

    setEmprestimos([emprestimoFinal, ...listaEmprestimos]);

    if (novoEmprestimo.tipo === 'book') {
      setBooks(books.map(b => b.title === novoEmprestimo.item ? { ...b, status: 'Emprestado' } : b));
    } else {
      setMovies(movies.map(m => m.title === novoEmprestimo.item ? { ...m, status: 'Emprestado' } : m));
    }

    setIsModalOpen(false);
    setNovoEmprestimo({ cliente: '', tipo: 'book', item: '', emprestimo: novoEmprestimo.emprestimo, devolucao: '' });
    setAbaAtiva('andamento'); 
  };

  const handleDevolver = (id: string, tipo: string, itemNome: string) => {
    setEmprestimos(listaEmprestimos.map(emp => 
      emp.id === id ? { ...emp, status: 'Concluído' } : emp
    ));

    if (tipo === 'book') {
      setBooks(books.map(b => b.title === itemNome ? { ...b, status: 'Disponível' } : b));
    } else {
      setMovies(movies.map(m => m.title === itemNome ? { ...m, status: 'Disponível' } : m));
    }
  };

  return (
    <div className='flex-1 font-sans space-y-6'>
      <header className='flex justify-between items-center'>
        <div className='inline-flex items-center p-1.5 bg-white border border-slate-200 rounded-xl shadow-sm'>
          {abas.map((aba) => {
            const isAtiva = abaAtiva === aba.id;
            const qtd = listaEmprestimos.filter(emp => {
              if (aba.id === 'andamento') return emp.status === 'Em andamento';
              if (aba.id === 'atraso') return emp.status === 'Em atraso';
              if (aba.id === 'historico') return emp.status === 'Concluído';
            }).length;

            return (
              <button
                key={aba.id}
                onClick={() => setAbaAtiva(aba.id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                  isAtiva ? aba.corAtiva : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {aba.titulo}
                <span className={`px-2 py-0.5 rounded-full text-xs ${isAtiva ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>
                  {qtd}
                </span>
              </button>
            );
          })}
        </div>

        <div className='flex items-center gap-4'>
          {atrasadosQtd > 0 && (
            <button className='flex items-center gap-2 px-4 py-2 border border-red-200 text-red-500 bg-white rounded-xl text-sm font-semibold hover:bg-red-50 transition-colors shadow-sm'>
              <Bell size={16} />
              {atrasadosQtd} em atraso
            </button>
          )}
          
          {/* BOTÃO QUE ABRE O MODAL */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className='flex items-center gap-2 px-4 py-2 bg-[#00BFD8] text-[#0F172A] rounded-xl text-sm font-bold hover:opacity-90 transition-opacity shadow-sm'
          >
            <Plus size={18} />
            Novo Empréstimo
          </button>
        </div>
      </header>

      {/* TABELA DE DADOS */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f8fafc] text-xs font-semibold text-slate-400 uppercase border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">CLIENTE</th>
                <th className="px-6 py-4">ITEM</th>
                <th className="px-6 py-4">EMPRÉSTIMO</th>
                <th className="px-6 py-4">DEVOLUÇÃO</th>
                <th className="px-6 py-4">STATUS</th>
                <th className="px-6 py-4 text-right">AÇÕES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {emprestimosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                    Nenhum empréstimo encontrado nesta categoria.
                  </td>
                </tr>
              ) : (
                emprestimosFiltrados.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-5 text-slate-400 font-medium font-['Consolas']">{emp.id}</td>
                    <td className="px-6 py-5 font-medium text-slate-900">{emp.cliente}</td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${
                        emp.tipo === "book" ? "bg-cyan-50 text-[#00a8ba]" : "bg-purple-50 text-purple-600"
                      }`}>
                        {emp.tipo === "book" ? <BookOpen size={12} /> : <Film size={12} />}
                        {emp.item}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{emp.emprestimo}</td>
                    <td className="px-6 py-4 text-slate-500">{emp.devolucao}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3.5 py-1 rounded-full text-xs font-semibold ${
                        emp.status === "Em atraso" ? "bg-red-100/80 text-red-600"
                        : emp.status === "Concluído" ? "bg-emerald-100 text-emerald-600"
                        : "bg-sky-100/80 text-sky-600"
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
  {emp.status !== 'Concluído' && (
    <button 
      onClick={() => handleDevolver(emp.id, emp.tipo, emp.item)} 
      className="text-slate-400 hover:text-emerald-500 transition-colors p-2 rounded-lg hover:bg-emerald-50" 
      title="Marcar como devolvido"
    >
      <CheckCircle2 size={18} />
    </button>
  )}
</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DE NOVO EMPRÉSTIMO */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">Novo Empréstimo</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSalvarEmprestimo} className="p-6 space-y-4">
              {/* Cliente */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Cliente</label>
                <select 
                  required
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#00BFD8] focus:ring-2 focus:ring-[#00BFD8]/20 transition-all text-slate-600"
                  value={novoEmprestimo.cliente}
                  onChange={e => setNovoEmprestimo({...novoEmprestimo, cliente: e.target.value})}
                >
                  <option value="">Selecione um cliente...</option>
                  {clients.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>

              {/* Tipo de Item */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setNovoEmprestimo({...novoEmprestimo, tipo: 'book', item: ''})}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${
                    novoEmprestimo.tipo === 'book' ? 'border-[#00a8ba] bg-cyan-50 text-[#00a8ba] font-bold' : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <BookOpen size={18} /> Livro
                </button>
                <button
                  type="button"
                  onClick={() => setNovoEmprestimo({...novoEmprestimo, tipo: 'movie', item: ''})}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${
                    novoEmprestimo.tipo === 'movie' ? 'border-purple-500 bg-purple-50 text-purple-600 font-bold' : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <Film size={18} /> Filme
                </button>
              </div>

              {/* Item */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  {novoEmprestimo.tipo === 'book' ? 'Livro Disponível' : 'Filme Disponível'}
                </label>
                <select 
                  required
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#00BFD8] focus:ring-2 focus:ring-[#00BFD8]/20 transition-all text-slate-600"
                  value={novoEmprestimo.item}
                  onChange={e => setNovoEmprestimo({...novoEmprestimo, item: e.target.value})}
                >
                  <option value="">Selecione...</option>
                  {itensDisponiveis.map(item => (
                    <option key={item.id} value={item.title}>{item.title}</option>
                  ))}
                </select>
              </div>

              {/* Datas */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Data de Empréstimo</label>
                  <input 
                    type="date" required
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#00BFD8] focus:ring-2 focus:ring-[#00BFD8]/20 text-slate-600"
                    value={novoEmprestimo.emprestimo}
                    onChange={e => setNovoEmprestimo({...novoEmprestimo, emprestimo: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Devolução Prevista</label>
                  <input 
                    type="date" required
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#00BFD8] focus:ring-2 focus:ring-[#00BFD8]/20 text-slate-600"
                    value={novoEmprestimo.devolucao}
                    onChange={e => setNovoEmprestimo({...novoEmprestimo, devolucao: e.target.value})}
                  />
                </div>
              </div>

              {/* Botões do Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 mt-2 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 rounded-xl text-sm font-bold bg-[#0F172A] text-white hover:bg-[#0F172A]/90 transition-colors shadow-sm"
                >
                  Salvar Empréstimo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}