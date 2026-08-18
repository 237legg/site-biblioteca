"use client";

import { useState, useEffect } from "react";
import {
  BookOpen, Film, Users, ArrowRight, CheckCircle, Heart,
  ChevronDown, MapPin, Phone, Mail, MessageCircle, Menu,
} from "lucide-react";

// ─── Landing Page ────────────────────────────────────────────────────────────
function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    setActiveSection(id);
  };

  const navLinks = [
    { label: "Início", id: "inicio" },
    { label: "Sobre", id: "sobre" },
    { label: "Doações", id: "doacoes" },
    { label: "Localização", id: "localizacao" },
    { label: "Contato", id: "contato" },
  ];

  return (
    <div className="min-h-screen bg-background font-[Outfit,sans-serif]">
      {/* Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur shadow-sm border-b border-border" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("inicio")} className="flex items-center gap-1 text-foreground font-bold text-lg">
            <span className="text-primary font-black">&laquo;</span>
            <span>biblioteca</span>
            <span className="text-primary font-black">&raquo;</span>
          </button>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(l => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === l.id ? "text-primary bg-primary/10" : "text-foreground/70 hover:text-foreground hover:bg-muted"}`}
              >
                {l.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg hover:bg-muted">
              <Menu size={20} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-white px-4 py-3 flex flex-col gap-1">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)}
                className="text-left px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">{l.label}</button>
            ))}
          </div>
        )}
      </header>

    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });
  const [sent, setSent] = useState(false);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="max-w-md mx-auto text-center py-12 px-6 bg-white rounded-2xl shadow-sm border border-border">
        <CheckCircle size={48} className="text-emerald-500 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-foreground mb-2">Mensagem enviada!</h3>
        <p className="text-muted-foreground text-sm mb-4">Obrigado pelo contato. Retornaremos em breve.</p>
        <button onClick={() => { setForm({ nome: "", email: "", mensagem: "" }); setSent(false); }}
          className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors">
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handle} className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-border p-8 flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Nome <span className="text-red-500">*</span></label>
        <input required value={form.nome} onChange={e => setForm(p => ({ ...p, nome: e.target.value }))}
          className="w-full px-3 py-2 rounded-lg border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          placeholder="Seu nome completo" />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">E-mail <span className="text-red-500">*</span></label>
        <input required type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
          className="w-full px-3 py-2 rounded-lg border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          placeholder="seu@email.com" />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Mensagem <span className="text-red-500">*</span></label>
        <textarea required value={form.mensagem} onChange={e => setForm(p => ({ ...p, mensagem: e.target.value }))}
          className="w-full px-3 py-2 rounded-lg border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
          rows={4} placeholder="Como podemos ajudar?" />
      </div>
      <button type="submit"
        className="w-full px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors">
        Enviar mensagem
      </button>
    </form>
  );
}

export default LandingPage;
