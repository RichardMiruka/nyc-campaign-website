"use client";
import '@/app/globals.css';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  return (
    <div className="flex min-h-screen bg-[#0D1B40] text-white noise-overlay">
      {!isLoginPage && (
        <aside className="w-64 border-r border-white/10 p-8 glass">
          <div className="font-display text-2xl text-white mb-10">NYC ADMIN</div>
          <nav className="space-y-4">
            <a href="/admin" className="block text-sm font-bold uppercase tracking-widest text-gold">Dashboard</a>
            <a href="/admin/contacts" className="block text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors">Supporters</a>
            <a href="/admin/content" className="block text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors">Content Manager</a>
          </nav>
        </aside>
      )}
      
      <main className="flex-1 p-12">
        {children}
      </main>
    </div>
  );
}
