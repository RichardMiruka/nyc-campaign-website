"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Contact {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  interest: string;
  message: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setContacts(data);
      setLoading(false);
    };
    fetchContacts();
  }, []);

  return (
    <div>
      <h1 className="font-display text-4xl text-white mb-8">Supporter Submissions</h1>
      
      <div className="doppelrand p-1">
        <div className="doppelrand-inner overflow-hidden">
            <table className="w-full text-left text-white/80">
            <thead className="bg-navy border-b border-white/10">
                <tr>
                <th className="p-6 text-xs uppercase tracking-widest text-gold">Date</th>
                <th className="p-6 text-xs uppercase tracking-widest text-gold">Name</th>
                <th className="p-6 text-xs uppercase tracking-widest text-gold">Phone</th>
                <th className="p-6 text-xs uppercase tracking-widest text-gold">Interest</th>
                </tr>
            </thead>
            <tbody>
                {loading ? (
                <tr><td colSpan={4} className="p-8 text-center">Loading...</td></tr>
                ) : contacts.map(c => (
                <tr key={c.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-6 text-sm">{new Date(c.created_at).toLocaleDateString()}</td>
                    <td className="p-6 text-sm font-bold">{c.name}</td>
                    <td className="p-6 text-sm">{c.phone}</td>
                    <td className="p-6 text-sm uppercase text-gold">{c.interest}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}
