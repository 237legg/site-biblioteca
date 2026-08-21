"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function loginPage() {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const router = useRouter();

    const handleLogin = (e: React.SubmitEvent) => {
        e.preventDefault();
        if(email === "admin@biblioteca.com" && senha === "admin123") {
            alert("Login efetuado!");
            router.push('/admin')
        } else {
            alert("Credenciais inválidas!")
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#0F172A] font-sans">
            <div className="w-full max-w-md">
                
                <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-white/40 hover:text-white mb-6 text-sm font-medium"
                >
                    ← Voltar ao Site
                </Link>

                <div className="w-full max-w-[450px] bg-white rounded-[16px] bg-white shadow-2xl overflow-hidden">
                    <div className="flex flex-col justify-between p-8 bg-linear-45 from-[#00BFD8] to-[#0097A7] font-outfit">
                        <h1 className="text-white font-bold text-xl max-h-[28px]">« biblioteca »</h1>
                        <p className="text-white/70 text-sm max-h-[20px]">Acesso à área administrativa</p>
                    </div>
                    <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-full max-w-wd">
                        <label className="block text-sm font-outfit font-medium mb-2">
                            E-mail<span className="text-red-500"> *</span>
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange = {(e) => setEmail(e.target.value)}
                            placeholder="admin@biblioteca.com"
                            className="w-full px-4 py-3 border border-black/20 rounded-lg mb-4 bg-[#F1F5F9]"
                        />
                        <label className="block text-sm font-outfit font-medium mb-2">
                            Senha<span className="text-red-500"> *</span>
                            </label>
                        <input
                            type="password"
                            required
                            value={senha}
                            onChange = {(e) => setSenha(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 border border-black/20 rounded-lg mb-6 bg-[#F1F5F9]"
                        />
                        <button 
                            type="submit" 
                            className="w-full py-3 bg-[#00bfd8] text-white font-semibold rounded-lg hover:bg-[#00BFD8]/90 transition-colors">
                                Entrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};