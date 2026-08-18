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

      {/* Doações */}
      <section id="doacoes" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-primary to-[#0097a7] rounded-3xl p-10 lg:p-14">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-white/60">Contribua conosco</span>
                <h2 className="text-4xl font-black text-white mt-2 mb-4">Faça uma doação e transforme vidas</h2>
                <p className="text-white/75 leading-relaxed mb-6">
                  Aceitamos livros, filmes em DVD e revistas em bom estado de conservação. Cada doação ajuda a ampliar nosso acervo e levar conhecimento para mais pessoas da comunidade.
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    "Livros de qualquer gênero literário",
                    "Filmes em DVD bem conservados",
                    "Revistas e periódicos",
                    "Gibis e histórias em quadrinhos",
                  ].map(item => (
                    <div key={item} className="flex items-center gap-3 text-white/90 text-sm">
                      <CheckCircle size={16} className="text-[#ffe500] flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
                <div className="text-white font-bold text-lg mb-6">Como doar?</div>
                <div className="flex flex-col gap-4">
                  {[
                    { n: "01", t: "Separe os itens", d: "Verifique se os livros e filmes estão em bom estado de conservação." },
                    { n: "02", t: "Entre em contato", d: "Fale conosco pelo WhatsApp ou e-mail para combinar a entrega." },
                    { n: "03", t: "Entregue na biblioteca", d: "Traga os itens pessoalmente durante o horário de funcionamento." },
                  ].map(step => (
                    <div key={step.n} className="flex gap-4">
                      <div className="w-8 h-8 rounded-lg bg-[#ffe500] text-foreground font-black text-xs flex items-center justify-center flex-shrink-0">{step.n}</div>
                      <div>
                        <div className="text-white font-semibold text-sm">{step.t}</div>
                        <div className="text-white/60 text-xs leading-relaxed">{step.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Horário */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Quando nos visitar</span>
            <h2 className="text-3xl font-black text-foreground mt-2">Horário de Funcionamento</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { dia: "Segunda — Sexta", horario: "08h00 — 18h00", cor: "border-primary" },
              { dia: "Sábado", horario: "08h00 — 13h00", cor: "border-[#ffe500]" },
              { dia: "Domingo", horario: "Fechado", cor: "border-red-300" },
            ].map(h => (
              <div key={h.dia} className={`bg-white rounded-2xl p-6 border-t-4 ${h.cor} shadow-sm text-center`}>
                <div className="text-sm font-semibold text-muted-foreground mb-1">{h.dia}</div>
                <div className="text-xl font-black text-foreground">{h.horario}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Localização */}
      <section id="localizacao" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Como chegar</span>
            <h2 className="text-4xl font-black text-foreground mt-2">Localização</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="rounded-2xl overflow-hidden shadow-lg bg-muted aspect-[4/3] flex items-center justify-center border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60105.57855936698!2d-45.509736!3d-22.4256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cc0e5e7b0b4cf5%3A0x9c9e3b9a6e4b8c8d!2sItajub%C3%A1%2C%20MG!5e0!3m2!1spt-BR!2sbr!4v1691800000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "350px" }}
                allowFullScreen
                loading="lazy"
                title="Localização da biblioteca"
              />
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">Como nos encontrar</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-muted">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">Endereço</div>
                      <div className="text-muted-foreground text-sm">Rua Exemplo, 123 — Centro<br />Itajubá — MG, 37500-000</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-muted">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <Phone size={18} />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">Telefone</div>
                      <div className="text-muted-foreground text-sm">(35) 3629-0000</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-muted">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <Mail size={18} />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">E-mail</div>
                      <div className="text-muted-foreground text-sm">contato@biblioteca.org.br</div>
                    </div>
                  </div>
                </div>
              </div>
              <a
                href="https://wa.me/5535999990000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#20c25b] transition-colors"
              >
                <MessageCircle size={20} /> Chamar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="py-24 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Fale conosco</span>
            <h2 className="text-4xl font-black text-foreground mt-2 mb-3">Mande uma mensagem</h2>
            <p className="text-muted-foreground">Tem alguma dúvida ou quer saber mais sobre a biblioteca? Entre em contato!</p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f172a] text-white/70 pt-14 pb-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-1 text-white font-bold text-xl mb-3">
                <span className="text-primary font-black">&laquo;</span>
                <span>biblioteca</span>
                <span className="text-primary font-black">&raquo;</span>
              </div>
              <p className="text-sm leading-relaxed">Um espaço de cultura, aprendizado e comunidade. Venha nos conhecer!</p>
            </div>
            <div>
              <div className="text-white font-semibold text-sm mb-4">Navegação</div>
              <div className="flex flex-col gap-2 text-sm">
                {navLinks.map(l => (
                  <button key={l.id} onClick={() => { window.scrollTo(0, 0); setTimeout(() => scrollTo(l.id), 100); }}
                    className="text-left hover:text-primary transition-colors">{l.label}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-white font-semibold text-sm mb-4">Contato</div>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2"><MapPin size={13} className="text-primary" /> Rua Exemplo, 123 — Centro, Itajubá/MG</div>
                <div className="flex items-center gap-2"><Phone size={13} className="text-primary" /> (35) 3629-0000</div>
                <div className="flex items-center gap-2"><Mail size={13} className="text-primary" /> contato@biblioteca.org.br</div>
                <div className="flex items-center gap-2"><MessageCircle size={13} className="text-[#25D366]" /> WhatsApp: (35) 99999-0000</div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div>© 2024 Biblioteca Comunitária. Todos os direitos reservados.</div>
            <div className="flex items-center gap-1.5">
              Desenvolvido por
              <span className="text-primary font-semibold">&laquo; byron.solutions &raquo;</span>
            </div>
          </div>
        </div>
      </footer>
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
