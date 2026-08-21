import Link from "next/link";
import { BookMarked, Clapperboard, RefreshCw, CircleAlert,
         ArrowRight, BookOpen, Film } from "lucide-react";

export default function AdminDashboard() {
    const rawLoans = [
  ["#001", "Ana Clara Souza", "1984", "book", "2024-07-20", "2024-08-03", "Em atraso"],
  ["#002", "Pedro Henrique Lima", "Matrix", "movie", "2024-07-28", "2024-08-11", "Em andamento"],
  ["#003", "Mariana Ferreira Costa", "Harry Potter e a Pedra Filosofal", "book", "2024-07-15", "2024-07-29", "Em atraso"],
  ["#004", "Lucas Oliveira Santos", "Divertida Mente", "movie", "2024-08-01", "2024-08-15", "Em andamento"],
  ["#005", "Isabela Rodrigues Alves", "Cem Anos de Solidão", "book", "2024-07-22", "2024-08-05", "Em atraso"],
];

const loans = rawLoans.map(([id, client, item, type, dateOut, dateDue, status]) => ({
  id, client, item, type, dateOut, dateDue, status
}));


  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm min-h-[160px]">
            <div className="flex items-center justify-between text-gray-500 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#00a8ba]/10 text-[#00a8ba] flex items-center justify-center">
                <BookMarked size={20}/>
              </div>
            </div>
            <p className="text-3xl font-extrabold text-gray-900">8</p>
            <span className="text-sm font-medium text-gray-500">
                Livros cadastrados
            </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm min-h-[160px]">
            <div className="flex items-center justify-between text-gray-500 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Clapperboard size={20} />
                </div>
            </div>
            <div>
                <p className="text-3xl font-extrabold text-slate-900">6</p>
                <span className="text-sm font-medium text-gray-500 mt-1">
                    Filmes cadastrados
                </span>
            </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm min-h-[160px]">
          <div className="flex items-center justify-between text-gray-500 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                <RefreshCw size={20} />
              </div>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-slate-900">3</p>
            <span className="text-sm font-medium text-gray-500 mt-1">
              Empréstimos ativos
            </span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm min-h-[160px]">
          <div className="flex items-center justify-between text-gray-500 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                <CircleAlert size={20} />
              </div>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-slate-900">3</p>
            <span className="text-sm font-medium text-gray-500 mt-1">
              Empréstimos em atraso
            </span>
          </div>
        </div>
      </div>

    {/* FIM DOS CARDS */}

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            Empréstimos recentes
          </h2>
          <Link
            href="/admin/emprestimos"
            className="text-sm font-semibold text-[#00a8ba] hover:underline flex items-center gap-1"
          >
            Ver todos <ArrowRight size={14} />
          </Link>
        </div>
        

      <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f8fafc] text-xs font-semibold text-slate-400 uppercase border-y border-slate-100">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">CLIENTE</th>
                <th className="px-6 py-4">ITEM</th>
                <th className="px-6 py-4">EMPRÉSTIMO</th>
                <th className="px-6 py-4">DEVOLUÇÃO PREVISTA</th>
                <th className="px-6 py-4">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
             {loans.map((loan) => (
              <tr key={loan.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-5 text-slate-400 font-medium font-['Consolas']">{loan.id}</td>
                <td className="px-6 py-5 font-medium text-slate-900">
                  {loan.client}
                </td>
                <td className="px-6 py-5">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-50 text-[#00a8ba] text-xs ${
                    loan.type === "book"
                        ? "bg-cyan-50 text-[#00a8ba]"
                        : "bg-purple-50 text-purple-600"
                  }`}
                >
                   {loan.type === "book" ? (
                    <BookOpen size={12} />
                   ) : (
                    <Film size={12} />
                   )}
                   {loan.item}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500">{loan.dateOut}</td>
                <td className="px-6 py-4 text-slate-500">{loan.dateDue}</td>
                <td className="px-6 py-4">
                  <span 
                    className={`inline-block px-3.5 py-1 rounded-full text-xs font-semibold ${
                      loan.status === "Em atraso"
                        ? "bg-red-100/80 text-red-600"
                        : "bg-sky-100/80 text-sky-600"
                    }`}
                  >
                    {loan.status}
                  </span>
                </td>
              </tr>
             ))}
            </tbody>
          </table>
        </div>
       </div>
    </div>
  );
}