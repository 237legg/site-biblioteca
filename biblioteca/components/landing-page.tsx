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

      {/* Hero */}
      <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600&h=900&fit=crop&auto=format"
          alt="Biblioteca com estantes de livros"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/85 via-[#0f172a]/60 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-primary text-xs font-semibold mb-6 uppercase tracking-widest">
              <BookOpen size={13} /> Biblioteca Comunitária
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
              Um espaço para<br />
              <span className="text-[#ffe500]">aprender</span> e<br />
              <span className="text-primary">crescer.</span>
            </h1>
            <p className="text-white/75 text-lg leading-relaxed mb-8 max-w-lg">
              Acervo com livros e filmes disponíveis para a comunidade. Visite-nos, faça um empréstimo e explore novos mundos.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => scrollTo("sobre")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors">
                Conhecer a Biblioteca <ArrowRight size={16} />
              </button>
              <button onClick={() => scrollTo("doacoes")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ffe500] text-[#0f172a] font-semibold hover:bg-yellow-300 transition-colors">
                <Heart size={16} /> Fazer Doação
              </button>
            </div>
            <div className="mt-12 flex gap-8">
              {[
                { n: "500+", label: "Livros" },
                { n: "120+", label: "Filmes" },
                { n: "1.2k+", label: "Usuários" },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-3xl font-black text-white">{s.n}</div>
                  <div className="text-white/50 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 animate-bounce">
          <ChevronDown size={20} />
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Quem somos</span>
              <h2 className="text-4xl font-black text-foreground mt-2 mb-6 leading-tight">
                Sobre a<br />Biblioteca
              </h2>
              <p className="text-foreground/60 leading-relaxed mb-4">
                Nossa biblioteca comunitária nasceu do desejo de levar cultura e conhecimento para todos. Com um acervo diversificado de livros e filmes, buscamos ser um ponto de encontro para leitores de todas as idades.
              </p>
              <p className="text-foreground/60 leading-relaxed mb-8">
                Funcionamos como um espaço aberto e acolhedor onde a comunidade pode acessar gratuitamente obras literárias, cinematográficas e muito mais, tudo de forma simples e organizada.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <BookOpen size={18} />, title: "Acervo literário", desc: "Mais de 500 títulos catalogados" },
                  { icon: <Film size={18} />, title: "Videoteca", desc: "120+ filmes disponíveis" },
                  { icon: <Users size={18} />, title: "Comunidade ativa", desc: "Mais de 1.200 usuários" },
                  { icon: <Heart size={18} />, title: "Voluntariado", desc: "Mantida pela comunidade" },
                ].map(item => (
                  <div key={item.title} className="flex gap-3 p-4 rounded-xl bg-muted">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">{item.icon}</div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=700&h=800&fit=crop&auto=format"
                alt="Livros organizados em estante"
                className="rounded-2xl w-full object-cover shadow-xl"
              />
              <div className="absolute -bottom-5 -left-5 bg-[#ffe500] text-foreground rounded-2xl p-5 shadow-lg">
                <div className="text-3xl font-black">8+</div>
                <div className="text-sm font-medium">anos de história</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* História */}
      <section className="py-24 bg-[#0f172a]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Nossa trajetória</span>
            <h2 className="text-4xl font-black text-white mt-2">História do Projeto</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { ano: "2015", titulo: "A semente", desc: "Um grupo de voluntários começou com apenas 50 livros doados pela comunidade, com o sonho de tornar a leitura acessível a todos." },
              { ano: "2018", titulo: "A videoteca", desc: "Com o crescimento do acervo, expandimos para filmes em DVD, atendendo às necessidades de diferentes públicos e faixas etárias." },
              { ano: "Hoje", titulo: "Uma comunidade", desc: "Hoje somos um espaço consolidado, com mais de 500 livros, 120 filmes e 1.200 usuários ativos que fazem parte desta história." },
            ].map((item, i) => (
              <div key={i} className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-primary text-white font-black text-sm flex items-center justify-center mb-4">{item.ano}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.titulo}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
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
