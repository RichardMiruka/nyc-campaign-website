"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else router.push('/admin');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0D1B40] text-white noise-overlay">
      <form onSubmit={handleLogin} className="doppelrand p-1 w-96">
        <div className="doppelrand-inner p-10 bg-navy">
          <h1 className="font-display text-2xl text-white mb-6">ADMIN LOGIN</h1>
          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 mb-4 rounded-full bg-white/5 border border-white/10 text-white outline-none focus:border-gold transition-colors text-sm" />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 mb-6 rounded-full bg-white/5 border border-white/10 text-white outline-none focus:border-gold transition-colors text-sm" />
          <button type="submit" className="w-full py-3 rounded-full font-bold text-sm bg-gold text-[#0D1B40] hover:bg-gold/90 transition-colors">Login</button>
        </div>
      </form>
    </div>
  );
}
