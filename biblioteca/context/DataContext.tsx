"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Client {
  id: string;
  name: string;
  initials?: string;
  phone?: string;
  email?: string;
}

const INITIAL_EMPRESTIMOS = [
  { id: '#001', cliente: 'Ana Clara Souza', item: '1984', tipo: 'book', emprestimo: '2024-07-20', devolucao: '2024-08-03', status: 'Em atraso' },
  { id: '#002', cliente: 'Pedro Henrique Lima', item: 'Matrix', tipo: 'movie', emprestimo: '2024-07-28', devolucao: '2024-08-11', status: 'Em andamento' },
  { id: '#003', cliente: 'Mariana Ferreira Costa', item: 'Harry Potter', tipo: 'book', emprestimo: '2024-07-15', devolucao: '2024-07-29', status: 'Em atraso' },
];

const INITIAL_BOOKS = [
  { id: "1", title: "O Senhor dos Anéis", author: "J.R.R. Tolkien", category: "Fantasia", ageRating: "14+", location: "A-01", status: "Disponível" },
  { id: "2", title: "1984", author: "George Orwell", category: "Ficção Científica", ageRating: "16+", location: "B-03", status: "Emprestado" },
  { id: "3", title: "O Pequeno Príncipe", author: "Antoine de Saint-Exupéry", category: "Literatura", ageRating: "Livre", location: "A-05", status: "Disponível" },
  { id: "4", title: "Dom Casmurro", author: "Machado de Assis", category: "Clássico Brasileiro", ageRating: "14+", location: "C-02", status: "Disponível" },
  { id: "5", title: "Harry Potter e a Pedra Filosofal", author: "J.K. Rowling", category: "Fantasia", ageRating: "10+", location: "A-08", status: "Emprestado" },
  { id: "6", title: "Sapiens", author: "Yuval Noah Harari", category: "Não-ficção", ageRating: "16+", location: "D-01", status: "Disponível" },
  { id: "7", title: "A Revolução dos Bichos", author: "George Orwell", category: "Ficção Científica", ageRating: "12+", location: "B-04", status: "Disponível" },
  { id: "8", title: "Cem Anos de Solidão", author: "Gabriel García Márquez", category: "Literatura", ageRating: "16+", location: "C-07", status: "Emprestado" },
];

const INITIAL_MOVIES = [
  { id: "1", title: "Devoradores de Estrelas", category: "Ficção Científica", rating: "13+", location: "DVD-B2", status: "Disponível" },
  { id: "2", title: "Inception", category: "Ação", rating: "14+", location: "A-02", status: "Emprestado" },
  { id: "3", title: "Interstellar", category: "Ficção Científica", rating: "12+", location: "B-06", status: "Disponível" },
  { id: "4", title: "O Poderoso Chefão", category: "Drama", rating: "14+", location: "D-03", status: "Emprestado" },
  { id: "5", title: "Matrix", category: "Ficção Científica", rating: "14+", location: "B-04", status: "Emprestado" },
  { id: "6", title: "Pulp Fiction", category: "Drama/Comédia", rating: "18+", location: "C-02", status: "Emprestado" },
  { id: "7", title: "Sociedade dos Poetas Mortos", category: "Drama", rating: "12+", location: "D-01", status: "Disponível" },
];

const INITIAL_CLIENTS = [
  { id: "1", name: "Ana Clara Souza", initials: "AC", phone: "(35) 99812-3456", email: "ana.souza@email.com" },
  { id: "2", name: "Pedro Henrique Lima", initials: "PH", phone: "(35) 98723-4567", email: "pedro.lima@email.com" },
  { id: "3", name: "Mariana Ferreira Costa", initials: "MF", phone: "(35) 99634-5678", email: "mariana.costa@email.com" },
  { id: "4", name: "Lucas Oliveira Santos", initials: "LO", phone: "(35) 97545-6789", email: "lucas.santos@email.com" },
  { id: "5", name: "Isabela Rodrigues Alves", initials: "IR", phone: "(35) 99456-7890", email: "isabela.alves@email.com" },
  { id: "6", name: "Gabriel Martins Pereira", initials: "GM", phone: "(35) 98367-8901", email: "gabriel.pereira@email.com" },
  { id: "7", name: "Júlia Mendes Barbosa", initials: "JM", phone: "(35) 99278-9012", email: "julia.barbosa@email.com" },
];

interface DataContextType {
  books: any[];
  setBooks: React.Dispatch<React.SetStateAction<any[]>>;
  movies: any[];
  setMovies: React.Dispatch<React.SetStateAction<any[]>>;
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  // Adicionado: Empréstimos
  emprestimos: any[];
  setEmprestimos: React.Dispatch<React.SetStateAction<any[]>>;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<any[]>(INITIAL_BOOKS);
  const [movies, setMovies] = useState<any[]>(INITIAL_MOVIES);
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  // Adicionado: State para Empréstimos
  const [emprestimos, setEmprestimos] = useState<any[]>(INITIAL_EMPRESTIMOS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedBooks = localStorage.getItem("biblioteca_books");
      const savedMovies = localStorage.getItem("biblioteca_movies");
      const savedClients = localStorage.getItem("biblioteca_clients");
      // Adicionado: Puxar empréstimos do localStorage
      const savedEmprestimos = localStorage.getItem("biblioteca_emprestimos");

      if (savedBooks) setBooks(JSON.parse(savedBooks));
      if (savedMovies) setMovies(JSON.parse(savedMovies));
      if (savedClients) setClients(JSON.parse(savedClients));
      if (savedEmprestimos) setEmprestimos(JSON.parse(savedEmprestimos));
    } catch (e) {
      console.error("Erro ao carregar do localStorage", e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("biblioteca_books", JSON.stringify(books));
    }
  }, [books, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("biblioteca_movies", JSON.stringify(movies));
    }
  }, [movies, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("biblioteca_clients", JSON.stringify(clients));
    }
  }, [clients, isLoaded]);

  // Adicionado: Salvar empréstimos no localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("biblioteca_emprestimos", JSON.stringify(emprestimos));
    }
  }, [emprestimos, isLoaded]);

  return (
    <DataContext.Provider value={{ books, setBooks, movies, setMovies, clients, setClients, emprestimos, setEmprestimos }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData deve ser usado dentro de DataProvider");
  return context;
}