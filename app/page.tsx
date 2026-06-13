"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wifi, GraduationCap, Wallet, Landmark, Heart,
  Vote, Award, BookOpen, Trophy, Scale, Globe,
  FileText, MapPin, Phone, Mail, Laptop, PenTool, Users,
  ArrowRight, CheckCircle2, AlertCircle
} from "lucide-react";
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import ballotAnimation from "@/public/ballot.json";
import HeroAsciiAnimation from "@/components/ui/hero-ascii-one";
import { supabase } from "@/lib/supabase";

// ── Icon mapping ───────────────────────────────────────────────────────────
const iconMap: Record<string, React.ElementType> = {
  wifi: Wifi,
  graduation: GraduationCap,
  wallet: Wallet,
  landmark: Landmark,
  heart: Heart,
};

// ── Types ──────────────────────────────────────────────────────────────────
interface Pillar { icon: string; title: string; items: string[]; color: string; }
interface Stat   { value: string; label: string; source: string; }
interface Testimonial { name: string; role: string; location: string; quote: string; videoUrl: string; }

// ── Data ───────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { href: "#about",       label: "About" },
  { href: "#vision",      label: "Vision" },
  { href: "#pillars",     label: "Pillars" },
  { href: "#timeline",    label: "Elections" },
  { href: "#testimonials",label: "Endorsements" },
  { href: "#register",    label: "Register & Vote" },
];

const STATS: Stat[] = [
  { value: "67%",    label: "Youth unemployment aged 15–34", source: "Afrobarometer 2025" },
  { value: "43%",    label: "Youth considering emigrating",  source: "Afrobarometer 2025" },
  { value: "79%",    label: "Say govt fails youth needs",    source: "GeoPoll 2025" },
  { value: "73%",    label: "Ward ICT hubs not yet built",   source: "April 2026" },
  { value: "800K+",  label: "Youth entering labour market yearly", source: "KIPPRA 2024" },
  { value: "26M",    label: "Young Kenyans aged 18–35",      source: "Kenya Census" },
];

const PILLARS: Pillar[] = [
  {
    icon: "wifi",
    title: "Connect Kenya",
    color: "#0D1B40",
    items: [
      "Ward-by-ward Digital Superhighway accountability dashboard",
      "Mandatory Ajira Digital registration at every ICT hub",
      "Accelerated hub deployment in underserved counties",
      "Remove digital asset loan barriers for youth",
    ],
  },
  {
    icon: "graduation",
    title: "Skills for the Future",
    color: "#1A5C38",
    items: [
      "Emergency TVET trainer recruitment — fill 9,121 vacancies",
      "AI literacy in every Ajira & TVET curriculum",
      "Ward-level Ajira Digital drives nationwide",
      "3–6 month fast-track CBET certificates in all counties",
    ],
  },
  {
    icon: "wallet",
    title: "Capital in Young Hands",
    color: "#B8860B",
    items: [
      "Reform YEDF eligibility — remove title deed barriers",
      "Digital assets as YEDF & NYOTA eligible investments",
      "Raise NYOTA age ceiling from 29 to 35",
      "Transparent county-level youth fund portals",
    ],
  },
  {
    icon: "landmark",
    title: "Youth in Every Room",
    color: "#7B0000",
    items: [
      "NYC representation in national budget process",
      "Annual Youth State of the Nation Report",
      "Youth reps on all 47 county executive committees",
      "Formal Gen Z Policy Dialogue mechanism",
    ],
  },
  {
    icon: "heart",
    title: "Whole-Person Leadership",
    color: "#2E7D52",
    items: [
      "Youth mental health as national NYC priority",
      "Ward-level peer support structures nationwide",
      "Social media literacy in Ajira & TVET curricula",
      "Gender equity audits of all youth programmes",
    ],
  },
];

const TESTIMONIALS: Testimonial[] = [
  { name: "Testimonial 1",  role: "Youth Leader",         location: "Makina Ward",         quote: "Richard is the real thing — someone who has actually worked in our community, taught our young people, and shown up consistently without waiting for a title.",     videoUrl: "https://drive.google.com/your-video-link-1"  },
  { name: "Testimonial 2",  role: "ICT Student",          location: "Kibera",              quote: "I learned web development from Richard and got my first online job within 3 months. He doesn't just talk about digital skills — he teaches them.",                 videoUrl: "https://drive.google.com/your-video-link-2"  },
  { name: "Testimonial 3",  role: "Community Leader",     location: "Gatwikira",           quote: "We need young people in the NYC who understand what is happening on the ground in places like Kibera. Richard is that person.",                                    videoUrl: "https://drive.google.com/your-video-link-3"  },
  { name: "Testimonial 4",  role: "Football Coach",       location: "Makina Ward",         quote: "Richard organised football tournaments not just for fun but to bring youth together and register them. That is the kind of leader we need.",                       videoUrl: "https://drive.google.com/your-video-link-4"  },
  { name: "Testimonial 5",  role: "Entrepreneur",         location: "Kibra Constituency",  quote: "I accessed the YEDF but it took so long because of documentation. Richard's commitment to reform that is personal — he has seen young people fail because of bureaucracy.", videoUrl: "https://drive.google.com/your-video-link-5"  },
  { name: "Testimonial 6",  role: "TVET Graduate",        location: "Nairobi",             quote: "If we had a NYC member who actually understands the digital economy and TVET system, everything would work better. Richard is that person.",                        videoUrl: "https://drive.google.com/your-video-link-6"  },
  { name: "Testimonial 7",  role: "Volunteer",            location: "Soweto East",         quote: "I have seen Richard give time and energy to youth who had nothing to offer him in return. That is rare. That is who I want representing us.",                       videoUrl: "https://drive.google.com/your-video-link-7"  },
  { name: "Testimonial 8",  role: "University Student",   location: "Nairobi",             quote: "Richard speaks our language — not the language of politicians who talk about youth without ever listening to us. He actually listens.",                            videoUrl: "https://drive.google.com/your-video-link-8"  },
  { name: "Testimonial 9",  role: "Youth Chairperson",    location: "Kibera",              quote: "The NYC needs someone who will fight for things that matter — YEDF reform, digital access, mental health. Richard has a plan. Not just a slogan.",                 videoUrl: "https://drive.google.com/your-video-link-9"  },
  { name: "Testimonial 10", role: "Software Developer",   location: "Nairobi",             quote: "I know Richard professionally. His technical knowledge is genuine, his commitment to youth is genuine. Kenya needs this combination in the NYC.",                   videoUrl: "https://drive.google.com/your-video-link-10" },
  { name: "Testimonial 11", role: "Teacher",              location: "Makina Ward",         quote: "Richard mentored young people in my school for free. He didn't ask for anything. He just cared. That is the only kind of leader worth voting for.",                videoUrl: "https://drive.google.com/your-video-link-11" },
  { name: "Testimonial 12", role: "Registered Voter",     location: "Makina Ward",         quote: "I signed his Form 1 nomination because I believe in him. He knows our ward, he knows our problems, and he has a real plan to take to the national level.",         videoUrl: "https://drive.google.com/your-video-link-12" },
];

const MARQUEE_TEXT = [
  "YOUTH VOICE", "YOUTH POWER", "BETTER TOMORROW", "SISI NI PAMOJA",
  "MAKINA WARD", "KIBRA CONSTITUENCY", "NATIONAL YOUTH COUNCIL",
  "5 JULY 2026", "REGISTER & VOTE", "ONE NATION ONE FUTURE",
];

// ── Motion Variants ────────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.32, 0.72, 0, 1] as any } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.12, 
      delayChildren: 0.1,
      ease: [0.32, 0.72, 0, 1] as any
    } 
  }
};

const navItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] as any } 
  }
};

// ── Animated Section Wrapper ────────────────────────────────────────────────
function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Counter component with bar graph ───────────────────────────────────────
function AnimatedStat({ value, label, source, className = "" }: Stat & { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  
  // Extract numeric part for graph (handle "800K+" and "26M" or "67%")
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const maxValue = 100; // Assuming 100 as base for percentage-based stats
  const percentage = Math.min((numericValue / maxValue) * 100, 100);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  
  return (
    <div ref={ref} className={`p-8 h-full flex flex-col justify-between ${className}`}>
      <div className="flex justify-between items-start gap-4">
        <div className={`font-display text-5xl md:text-7xl transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 blur-md"}`}
          style={{ color: "#D4A017" }}>
          {value}
        </div>
        
        {/* Trader-style Bar Graph */}
        <div className="w-16 h-12 flex items-end gap-1 bg-white/5 p-1 rounded-sm">
          <div 
            className="w-full bg-gold/50 transition-all duration-[2s] ease-[cubic-bezier(0.32,0.72,0,1)]"
            style={{ height: visible ? `${percentage}%` : '0%' }}
          />
        </div>
      </div>
      
      <div className="mt-6">
        <div className="text-white font-bold text-sm md:text-lg tracking-tight leading-tight">{label}</div>
        <div className="text-gray-400 text-xs mt-2 font-medium opacity-60 uppercase tracking-widest">{source}</div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ name: "", phone: "", interest: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [supporterCount, setSupporterCount] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fetch supporter count (simulated or real from Supabase)
  useEffect(() => {
    async function fetchStats() {
      try {
        const { count, error } = await supabase
          .from('contacts')
          .select('*', { count: 'exact', head: true });
        
        if (!error && count !== null) {
          setSupporterCount(150 + count); // Offset for base supporters
        } else {
          setSupporterCount(150); // Fallback
        }
      } catch (e) {
        setSupporterCount(150);
      }
    }
    fetchStats();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([
          { 
            name: formData.name, 
            phone: formData.phone, 
            interest: formData.interest, 
            message: formData.message 
          }
        ]);

      if (error) throw error;

      setSubmitStatus("success");
      setFormData({ name: "", phone: "", interest: "", message: "" });
      
      // Update local count
      if (supporterCount !== null) setSupporterCount(supporterCount + 1);

      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen selection:bg-gold selection:text-navy">

      {/* ── NAV ──────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] flex justify-center ${
        scrolled ? "pt-6" : "pt-8"
      }`}>
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
          className={`glass-pill px-6 py-3 rounded-full flex items-center gap-8 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            scrolled ? "mx-4 w-full max-w-4xl" : "w-max"
          }`}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-display text-lg text-white transition-all duration-500 group-hover:scale-110 shadow-lg"
              style={{ background: "var(--green-deep)", boxShadow: "0 0 20px rgba(26, 92, 56, 0.4)" }}>R</div>
            <div className={`${scrolled ? "flex" : "hidden"} sm:flex flex-col`}>
              <div className="font-display text-white text-sm leading-none tracking-wider">MIRUKA</div>
              <div className="text-[10px] tracking-[0.2em] font-bold" style={{ color: "#D4A017" }}>NYC '26</div>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((l, i) => (
              <motion.a 
                key={l.href} 
                href={l.href}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 + i * 0.05 }}
                className="text-gray-400 hover:text-white text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold transition-all duration-500 group-hover:w-full opacity-0 group-hover:opacity-100" />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href="#register"
              className="hidden sm:flex px-6 py-2 rounded-full font-bold text-[11px] uppercase tracking-[0.15em] transition-all duration-500 hover:scale-105 active:scale-95 btn-gold"
              style={{ background: "#D4A017", color: "#0D1B40" }}>
              VOTE
            </a>

            {/* Mobile hamburger */}
            <button 
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center relative group" 
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div className={`w-5 h-0.5 bg-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${menuOpen ? "rotate-45 absolute" : "mb-1"}`} />
              <div className={`w-5 h-0.5 bg-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${menuOpen ? "-rotate-45 absolute" : "mt-1"}`} />
            </button>
          </div>
        </motion.div>

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(32px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              className="fixed inset-0 bg-navy/80 z-[-1] flex flex-col items-center justify-center p-8 lg:hidden"
            >
              <div className="flex flex-col items-center gap-8">
                {NAV_LINKS.map((l, i) => (
                  <motion.a 
                    key={l.href} 
                    href={l.href} 
                    onClick={() => setMenuOpen(false)}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                    className="text-white font-display text-4xl md:text-6xl hover:text-gold transition-colors duration-300"
                  >
                    {l.label}
                  </motion.a>
                ))}
                <motion.a 
                  href="#register" 
                  onClick={() => setMenuOpen(false)}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: NAV_LINKS.length * 0.1, duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                  className="mt-8 px-12 py-4 rounded-full font-display text-2xl text-navy bg-gold shadow-[0_0_30px_rgba(212,160,23,0.3)]"
                >
                  REGISTER & VOTE
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>


      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-navy overflow-hidden">
          {/* Mesh Gradient Orbs */}
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-green-deep/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-gold/10 blur-[120px] rounded-full" />
          
          {/* Background grid */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
        </div>

        {/* Kenya flag accent */}
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-black" />
          <div className="flex-1 bg-red-600" />
          <div className="flex-1 bg-green-600" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-[1.2fr,0.8fr] gap-16 items-center">
          {/* Left: text */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] mb-10 bg-white/5 border border-white/10 text-gold uppercase">
              <Vote className="w-3 h-3" strokeWidth={3} /> National Youth Council 2026
            </motion.div>

            <motion.h1 variants={fadeInUp} className="font-display leading-[0.85] mb-8 tracking-tighter" style={{ fontSize: "clamp(4rem,12vw,9.5rem)" }}>
              <span className="block text-white">YOUTH</span>
              <span className="block text-gradient-gold">VOICE.</span>
              <span className="block text-white">YOUTH</span>
              <span className="block text-gradient-gold">POWER.</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="font-serif text-2xl md:text-3xl mb-12 italic text-white/60 leading-tight max-w-xl">
              Engineering a better tomorrow for every young Kenyan.
            </motion.p>

            <motion.div variants={fadeInUp} className="mb-12">
              <div className="font-display text-3xl text-white mb-2 tracking-wide">RICHARD MIRUKA</div>
              <div className="text-[10px] tracking-[0.3em] font-black opacity-50 uppercase flex items-center gap-3">
                <span>Software Engineer</span>
                <span className="w-1 h-1 rounded-full bg-gold" />
                <span>ICT Instructor</span>
                <span className="w-1 h-1 rounded-full bg-gold" />
                <span>Youth Leader</span>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-6">
              <a href="#register" className="btn-premium">
                <span>Register & Vote</span>
                <div className="btn-premium-icon">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </a>
              <a href="#pillars" className="flex items-center gap-4 px-8 py-4 rounded-full font-bold text-sm tracking-widest border border-white/10 hover:bg-white/5 transition-all duration-500">
                The Agenda
              </a>
            </motion.div>
          </motion.div>

          {/* Right: candidate image and vote animation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: [0.32, 0.72, 0, 1], delay: 0.2 }}
            className="relative flex flex-col items-center lg:items-end gap-6"
          >
            {/* Vote Me Animation */}
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1, type: "spring", stiffness: 200 }}
              className="doppelrand !rounded-full w-24 h-24 absolute -top-12 -left-6 lg:left-0 z-20"
            >
              <div className="doppelrand-inner !rounded-full bg-navy/80 p-2">
                <Lottie 
                  animationData={voteMeAnimation} 
                  loop={true} 
                  className="w-full h-full"
                />
              </div>
            </motion.div>

            <div className="doppelrand w-full max-w-[440px] aspect-[3/4]">
              <div className="doppelrand-inner">
                <Image src="/richard-miruka.png" alt="Richard Miruka"
                  width={440} height={580} className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-[2s] ease-out"
                  priority />
                
                {/* Overlay badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="font-display text-3xl text-white tracking-tight">RICHARD MIRUKA</div>
                  <div className="text-[10px] tracking-[0.3em] font-black text-gold uppercase mt-1">
                    Vote #1 · Makina Ward
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MARQUEE TICKER ─────────────────────────────────────────────── */}
      <div className="py-6 overflow-hidden bg-gold relative z-10">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...MARQUEE_TEXT, ...MARQUEE_TEXT, ...MARQUEE_TEXT].map((t, i) => (
            <span key={i} className="font-display text-sm md:text-lg tracking-[0.3em] px-12 text-navy font-black uppercase">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS (ASYMMETRICAL BENTO) ─────────────────────────────────── */}
      <section className="section-p bg-navy relative">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-20">
            <motion.div variants={fadeInUp} className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <div className="eyebrow mb-6">The Crisis We Name</div>
                <h2 className="font-display text-6xl md:text-8xl text-white leading-[0.9] tracking-tighter">
                  KENYA IS BURNING. <br/>
                  <span className="text-white/30">WE NEED ACTION.</span>
                </h2>
              </div>
              <p className="text-gray-400 text-lg md:text-xl font-medium max-w-sm leading-snug">
                Every percentage represents a life, a dream, and a future currently being stifled by systemic neglect.
              </p>
            </motion.div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Bento Layout */}
            <div className="md:col-span-8 md:row-span-2 doppelrand">
              <div className="doppelrand-inner bg-green-deep/10">
                <AnimatedStat {...STATS[0]} />
              </div>
            </div>
            
            <div className="md:col-span-4 doppelrand">
              <div className="doppelrand-inner">
                <AnimatedStat {...STATS[1]} />
              </div>
            </div>

            <div className="md:col-span-4 doppelrand">
              <div className="doppelrand-inner">
                <AnimatedStat {...STATS[2]} />
              </div>
            </div>

            <div className="md:col-span-4 doppelrand">
              <div className="doppelrand-inner">
                <AnimatedStat {...STATS[3]} />
              </div>
            </div>

            <div className="md:col-span-4 doppelrand">
              <div className="doppelrand-inner bg-gold/5">
                <AnimatedStat {...STATS[4]} />
              </div>
            </div>

            <div className="md:col-span-4 doppelrand">
              <div className="doppelrand-inner">
                <AnimatedStat {...STATS[5]} />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── ABOUT ──────────────────────────────────────────────────────── */}
      <section id="about" className="section-p bg-white relative overflow-hidden">
        {/* Subtle decorative elements for Editorial look */}
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-green-deep/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <AnimatedSection>
              <motion.div variants={fadeInUp} className="eyebrow mb-8">Who I Am</motion.div>
              <motion.h2 variants={fadeInUp} className="font-display text-7xl md:text-8xl mb-10 leading-[0.9] tracking-tighter text-navy">
                SHAPED BY <span className="text-green-deep">KIBERA.</span><br />
                RUNNING FOR <span className="opacity-30">KENYA.</span>
              </motion.h2>
              <motion.div variants={fadeInUp} className="space-y-6 text-gray-600 text-xl leading-relaxed max-w-xl">
                <p>
                  I am a <strong className="text-navy font-bold">Full Stack Software Engineer</strong> and community architect. For years, I've taught digital skills at Ta'awun Trust — witnessing firsthand how access to tools transforms a young person's trajectory.
                </p>
                <p>
                  Service without a title has been my life's work. From football tournaments to scholarship drives, I haven't waited for permission to lead. <strong>Now, I am seeking the title to scale that impact to every ward in Kenya.</strong>
                </p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4 mt-12">
                {[
                  { icon: Laptop, label: "Engineer",    sub: "Full Stack" },
                  { icon: BookOpen, label: "Instructor",  sub: "Ta'awun Trust" },
                  { icon: Trophy, label: "Leader",      sub: "Community" },
                  { icon: PenTool, label: "Mentor",      sub: "Digital Skills" },
                ].map((item, i) => (
                  <div key={i} className="group p-6 rounded-[1.5rem] bg-gray-50 border border-gray-100 flex items-center gap-4 transition-all duration-500 hover:bg-green-deep hover:border-green-deep">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                      <item.icon className="w-6 h-6 text-green-deep" />
                    </div>
                    <div>
                      <div className="font-bold text-navy group-hover:text-white transition-colors">{item.label}</div>
                      <div className="text-xs text-gray-400 group-hover:text-white/60 transition-colors uppercase tracking-widest">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatedSection>

            {/* Quote card with Double-Bezel */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
              className="doppelrand md:rotate-2 hover:rotate-0 transition-transform duration-700"
            >
              <div className="doppelrand-inner bg-navy p-12 md:p-16">
                <div className="font-display text-8xl text-gold/20 absolute top-8 right-12 leading-none">"</div>
                <p className="font-serif text-3xl md:text-4xl text-white leading-[1.2] mb-12 italic relative z-10">
                  I have worked with passion.<br />I will serve with purpose.
                </p>
                
                <div className="border-t border-white/10 pt-10 flex items-center justify-between">
                  <div>
                    <div className="font-display text-3xl text-white tracking-tight">RICHARD MIRUKA</div>
                    <div className="text-[10px] tracking-[0.3em] font-black text-gold uppercase mt-1">
                      NYC Candidate 2026
                    </div>
                  </div>
                  <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-gold animate-pulse" />
                  </div>
                </div>
                
                <div className="mt-12 space-y-4">
                  {[
                    "National Youth Council Act, Cap. 132",
                    "Digital Superhighway Accountability",
                    "YEDF, NYOTA & Ajira Reform",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-white/40 text-sm font-medium">
                      <div className="w-1 h-1 rounded-full bg-gold" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VISION ─────────────────────────────────────────────────────── */}
      <section id="vision" className="section-p bg-navy relative overflow-hidden">
        {/* Intense Mesh Gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(26,92,56,0.15)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <AnimatedSection>
            <motion.div variants={fadeInUp} className="eyebrow mb-10 border-white/20 text-white/60">The Vision</motion.div>
            <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-6xl text-white leading-[1.1] mb-12 italic tracking-tight">
              "A Kenya where every young person has the <span className="text-gold">skills, capital, and space</span> to build a dignified life and shape our nation's future."
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-white/50 max-w-3xl mx-auto leading-relaxed mb-20">
              Grounded in the <strong className="text-white">NYC Act, Cap. 132</strong>. Powered by the <strong className="text-white">Digital Superhighway</strong>. For every county, ward, and young Kenyan.
            </motion.p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Scale, title: "Legally Grounded", body: "Traces directly to Section 5 mandates of the NYC Act. Statutory obligations over political promises." },
              { icon: Wifi, title: "Tech-Powered",     body: "Ensuring the Digital Superhighway reaches every ward, turning ICT hubs into engines of growth." },
              { icon: Globe, title: "Nationally Scaled", body: "A Makina ward movement with a 47-county agenda. No young Kenyan left behind." },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                className="doppelrand"
              >
                <div className="doppelrand-inner p-10 text-left">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:bg-gold transition-colors duration-500">
                    <item.icon className="w-7 h-7 text-gold group-hover:text-navy" />
                  </div>
                  <div className="font-display text-2xl text-white mb-4 tracking-tight uppercase">{item.title}</div>
                  <p className="text-white/50 text-sm leading-relaxed">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ── PILLARS ─────────────────────────────────────────────────────── */}
      <section id="pillars" className="section-p bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-24">
            <motion.div variants={fadeInUp} className="eyebrow mb-8">The Agenda</motion.div>
            <motion.h2 variants={fadeInUp} className="font-display text-7xl md:text-8xl mb-6 leading-[0.9] tracking-tighter text-navy">
              FIVE PILLARS <br/>
              <span className="opacity-30">OF ACTION.</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-500 text-xl max-w-2xl mx-auto leading-relaxed">
              Measurable. Accountable. Statutory. Each pillar is a roadmap to a dignified future for every young Kenyan.
            </motion.p>
          </AnimatedSection>

          <div className="space-y-8">
            {PILLARS.map((pillar, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.32, 0.72, 0, 1], delay: i * 0.1 }}
                className="doppelrand group"
              >
                <div className="doppelrand-inner grid md:grid-cols-[280px,1fr] bg-white">
                  {/* Left accent */}
                  <div className="flex flex-col items-center justify-center p-12 text-white relative overflow-hidden"
                    style={{ background: pillar.color }}>
                    <div className="absolute top-0 right-0 p-4 font-display text-7xl opacity-10 select-none">0{i + 1}</div>
                    {iconMap[pillar.icon] && (
                      <div className="mb-6 relative z-10">
                        {(() => {
                          const Icon = iconMap[pillar.icon];
                          return <Icon className="w-16 h-16 group-hover:scale-110 transition-transform duration-700" strokeWidth={1} />;
                        })()}
                      </div>
                    )}
                    <div className="font-display text-3xl text-center leading-[0.9] tracking-tight relative z-10 uppercase">{pillar.title}</div>
                  </div>
                  {/* Right content */}
                  <div className="p-12 md:p-16 flex items-center">
                    <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6 w-full">
                      {pillar.items.map((item, j) => (
                        <div key={j} className="flex items-start gap-4 group/item">
                          <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300"
                            style={{ background: pillar.color }} />
                          <span className="text-gray-600 text-sm md:text-base leading-relaxed font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANIFESTO DOWNLOAD ──────────────────────────────────────────── */}
      <section className="section-p bg-gold relative overflow-hidden">
        {/* Subtle noise and pattern for gold section */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <AnimatedSection>
            <motion.h2 variants={fadeInUp} className="font-display text-6xl md:text-8xl mb-8 leading-[0.85] tracking-tighter text-navy uppercase">
              Download the <br/> Full Manifesto.
            </motion.h2>
            <motion.p variants={fadeInUp} className="mb-12 text-xl md:text-2xl font-medium text-navy/70 leading-relaxed max-w-2xl mx-auto">
              30+ specific commitments grounded in the NYC Act. Print it. Share it. Hold me to it.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <a href="/manifesto.pdf" download className="btn-premium !bg-navy !text-white hover:!shadow-navy/20">
                <span>Download Manifesto (PDF)</span>
                <div className="btn-premium-icon !bg-white/10">
                  <FileText className="w-4 h-4 text-white" />
                </div>
              </a>
            </motion.div>
            <motion.p variants={fadeInUp} className="mt-8 text-[10px] font-black uppercase tracking-[0.3em] text-navy/40">
              Also available in Swahili via campaign offices.
            </motion.p>
          </AnimatedSection>
        </div>
      </section>


      {/* ── ELECTION TIMELINE ───────────────────────────────────────────── */}
      <section id="timeline" className="section-p bg-navy relative overflow-hidden">
        {/* Subtle mesh for background depth */}
        <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-24">
            <motion.div variants={fadeInUp} className="eyebrow mb-8 border-white/20 text-white/60">Elections Timetable</motion.div>
            <motion.h2 variants={fadeInUp} className="font-display text-7xl md:text-8xl text-white mb-6 leading-[0.9] tracking-tighter uppercase">
              How the NYC <br/> <span className="text-white/30">Election Works.</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
              Four statutory steps. Your vote at step one powers the journey to the National Council.
            </motion.p>
          </AnimatedSection>

          <div className="relative">
            {/* Vertical line - Premium gradient */}
            <div className="absolute left-[31.5px] top-0 bottom-0 w-[1px] hidden md:block bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            
            <div className="space-y-12">
              {[
                { step: "01", date: "NOW → JUNE 2026", title: "VOTER REGISTRATION",     body: "Register through your ward youth officer or NYC website. Mandatory for ages 18–35.", color: "#1A5C38",  cta: "Register Now",      href: "https://nationalyouthcouncil.go.ke/nyc-elections/" },
                { step: "02", date: "PRE-5 JULY 2026", title: "NOMINATIONS — FORM 1",  body: "Richard needs 50 signatures from registered Makina Ward voters to get on the ballot. Support the nomination.", color: "#2E7D52",  cta: "Sign Form 1",        href: "#contact" },
                { step: "03", date: "5 JULY 2026",     title: "WARD ELECTIONS",         body: "Registered youth in Makina Ward vote for delegates. Polls open 8am–5pm. Bring National ID.", color: "#D4A017",  cta: "Ward Polls",  href: "#register" },
                { step: "04", date: "16 JULY 2026",    title: "CONSTITUENCY ELECTIONS", body: "Ward delegates elect two Kibra Constituency delegates — for the National Youth Congress.", color: "#B8860B",  cta: "Kibra Level", href: "#register" },
                { step: "05", date: "27 JULY 2026",    title: "NATIONAL YOUTH CONGRESS",body: "580 delegates from all 290 constituencies elect the Council. This is the final stage.", color: "#CE1126", cta: "National Congress",  href: "#vision" },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                  className="flex gap-10 md:gap-16 group"
                >
                  {/* Step circle */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center font-display text-xl text-white shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-110"
                    style={{ background: item.color, boxShadow: `0 0 30px ${item.color}44` }}>
                    {item.step}
                  </div>
                  {/* Content - Card based */}
                  <div className="flex-1 doppelrand !rounded-[1.5rem] group-hover:-translate-y-1 transition-transform duration-500">
                    <div className="doppelrand-inner !rounded-[calc(1.5rem-1.5px)] p-8">
                      <div className="font-display text-[10px] tracking-[0.3em] font-black mb-2 opacity-50 uppercase" style={{ color: item.color }}>{item.date}</div>
                      <div className="font-display text-3xl text-white mb-4 tracking-tight uppercase leading-none">{item.title}</div>
                      <p className="text-white/40 text-sm md:text-base mb-8 leading-relaxed max-w-xl">{item.body}</p>
                      <a href={item.href}
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 rounded-full transition-all duration-300 hover:bg-white hover:text-navy"
                        style={{ background: `${item.color}11`, color: item.color, border: `1px solid ${item.color}33` }}>
                        {item.cta} <ArrowRight className="w-3 h-3" strokeWidth={3} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────────── */}
      <section id="testimonials" className="section-p bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-24">
            <motion.div variants={fadeInUp} className="eyebrow mb-8">Community Voices</motion.div>
            <motion.h2 variants={fadeInUp} className="font-display text-7xl md:text-8xl text-navy mb-6 leading-[0.9] tracking-tighter uppercase">
              Endorsements & <br/> <span className="opacity-30">Testimonials.</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-500 text-xl max-w-2xl mx-auto">
              Real stories from the people who have seen the work firsthand.
            </motion.p>
          </AnimatedSection>

          {/* Featured testimonial with Double-Bezel */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
            className="doppelrand mb-20"
          >
            <div className="doppelrand-inner grid md:grid-cols-[1fr,1.2fr] bg-navy">
              {/* Video Section */}
              <div className="relative bg-black aspect-video md:aspect-auto flex items-center justify-center group cursor-pointer overflow-hidden"
                onClick={() => window.open(TESTIMONIALS[activeTestimonial].videoUrl, "_blank")}>
                <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700"
                  style={{ background: "linear-gradient(135deg, #1A5C38, #0D1B40)" }} />
                
                {/* Animated pulses */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full animate-ping-slow opacity-20 bg-gold" />
                </div>

                <div className="relative z-10 text-center px-8">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 transition-all duration-700 group-hover:scale-110 glass-pill"
                    style={{ border: "1px solid rgba(212,160,23,0.5)" }}>
                    <div className="w-0 h-0 ml-2" style={{
                      borderTop: "16px solid transparent",
                      borderBottom: "16px solid transparent",
                      borderLeft: "24px solid #D4A017"
                    }} />
                  </div>
                  <div className="font-display text-3xl text-white tracking-[0.1em] mb-3 uppercase">Hear the Impact</div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gold">
                    {TESTIMONIALS[activeTestimonial].name} · {TESTIMONIALS[activeTestimonial].location}
                  </p>
                </div>
              </div>
              {/* Quote */}
              <div className="p-12 md:p-20 flex flex-col justify-center relative bg-navy/50">
                <div className="font-display text-[12rem] mb-[-4rem] mt-[-6rem] opacity-5 text-white leading-none select-none">"</div>
                <p className="font-serif text-3xl md:text-4xl text-white leading-[1.2] italic mb-12 relative z-10">
                  {TESTIMONIALS[activeTestimonial].quote}
                </p>
                <div className="flex items-center gap-8 relative z-10">
                  <div className="w-20 h-[1px] bg-gold/50" />
                  <div>
                    <div className="font-display text-2xl text-white tracking-tight uppercase leading-none">{TESTIMONIALS[activeTestimonial].name}</div>
                    <div className="text-[10px] tracking-[0.3em] font-black text-gold uppercase mt-2">
                      {TESTIMONIALS[activeTestimonial].role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Testimonial grid - Refined Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                className={`doppelrand !rounded-[1.5rem] cursor-pointer group transition-all duration-700 ${activeTestimonial === i ? "ring-2 ring-gold" : ""}`}
                onClick={() => setActiveTestimonial(i)}>
                <div className="doppelrand-inner !rounded-[calc(1.5rem-1.5px)] bg-white h-full">
                  <div className="aspect-video relative overflow-hidden bg-navy">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-deep/40 to-navy opacity-60" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-10 h-10 rounded-full glass-pill flex items-center justify-center">
                        <div className="w-0 h-0 ml-1" style={{
                          borderTop: "8px solid transparent",
                          borderBottom: "8px solid transparent",
                          borderLeft: "12px solid #D4A017"
                        }} />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-500 text-xs leading-relaxed italic mb-6 line-clamp-3">"{t.quote}"</p>
                    <div className="font-display text-lg text-navy tracking-tight leading-none mb-1 uppercase">{t.name}</div>
                    <div className="text-[9px] font-black uppercase tracking-[0.2em] text-gold">{t.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REGISTER & VOTE CTA ──────────────────────────────────────────── */}
      <section id="register" className="section-p bg-navy relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(212,160,23,0.1)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <AnimatedSection className="flex flex-col items-center">
            {/* Ballot Animation with Double-Bezel Tray */}
            <motion.div 
              variants={fadeInUp}
              className="doppelrand mb-12 w-32 h-32 md:w-48 md:h-48 !rounded-full overflow-hidden"
            >
              <div className="doppelrand-inner !rounded-full bg-navy/50 flex items-center justify-center p-4">
                <Lottie 
                  animationData={ballotAnimation} 
                  loop={true} 
                  className="w-full h-full"
                />
              </div>
            </motion.div>

            <motion.h2 variants={fadeInUp} className="font-display text-7xl md:text-9xl mb-8 leading-[0.85] tracking-tighter uppercase">
              Your Vote is <br/> <span className="text-gradient-gold">Your Power.</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl mb-16 text-white/60 max-w-2xl mx-auto leading-relaxed">
              Three statutory steps. One outcome. Real change for Kenya's 26 million youth.
            </motion.p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {[
              { step: "1", action: "REGISTER", detail: "At your ward youth officer or NYC website", color: "var(--green-deep)" },
              { step: "2", action: "NOMINATE", detail: "Sign Form 1 to get Richard on the Makina Ward ballot", color: "var(--gold)" },
              { step: "3", action: "VOTE",     detail: "Show up on 5 July 2026 · 8am–5pm · Bring ID",     color: "#CE1126" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                className="doppelrand !rounded-[2rem]"
              >
                <div className="doppelrand-inner !rounded-[calc(2rem-1.5px)] p-10 h-full">
                  <div className="font-display text-6xl mb-4" style={{ color: item.color }}>{item.step}</div>
                  <div className="font-display text-2xl text-white mb-4 tracking-tight uppercase">{item.action}</div>
                  <p className="text-sm text-white/40 leading-relaxed">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatedSection className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.a 
              variants={fadeInUp} 
              href="https://nationalyouthcouncil.go.ke/nyc-elections/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-premium"
            >
              <span>Register for NYC Elections</span>
              <div className="btn-premium-icon">
                <Globe className="w-4 h-4 text-white" />
              </div>
            </motion.a>
            <motion.a variants={fadeInUp} href="tel:+254700000000" className="px-10 py-4 rounded-full font-bold text-sm tracking-widest border border-white/10 hover:bg-white/5 transition-all duration-500">
              Call Campaign Team
            </motion.a>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" className="section-p bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="text-center mb-24">
            <motion.div variants={fadeInUp} className="eyebrow mb-8">Get In Touch</motion.div>
            <motion.h2 variants={fadeInUp} className="font-display text-7xl md:text-8xl text-navy mb-6 leading-[0.9] tracking-tighter uppercase">
              Let's Build <br/> <span className="opacity-30">This Together.</span>
            </motion.h2>
          </AnimatedSection>

          <div className="grid lg:grid-cols-[1fr,1.2fr] gap-16">
            <AnimatedSection className="space-y-4">
              {[
                { icon: MapPin, label: "Campaign Base",   value: "Makina Ward, Kibera, Nairobi" },
                { icon: Phone, label: "WhatsApp",         value: "+254 700 000 000" },
                { icon: Mail, label: "Email",            value: "campaign@richardmiruka.co.ke" },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeInUp} className="flex items-center gap-6 p-8 rounded-[1.5rem] bg-gray-50 border border-gray-100 group hover:bg-navy hover:border-navy transition-all duration-500">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <item.icon className="w-6 h-6 text-navy" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black tracking-[0.2em] mb-1 text-gold uppercase">{item.label}</div>
                    <div className="font-bold text-navy group-hover:text-white transition-colors text-lg">{item.value}</div>
                  </div>
                </motion.div>
              ))}
              
              <motion.div variants={fadeInUp} className="flex gap-4 pt-8">
                {["X", "Instagram", "TikTok"].map((s, i) => (
                  <a key={i} href="#" className="flex-1 text-center py-4 rounded-full text-[10px] font-black tracking-[0.2em] border border-navy/10 text-navy uppercase hover:bg-navy hover:text-white transition-all duration-500">
                    {s}
                  </a>
                ))}
              </motion.div>
            </AnimatedSection>

            {/* Quick message form with Double-Bezel */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
              className="doppelrand"
            >
              <form onSubmit={handleFormSubmit} className="doppelrand-inner bg-navy p-10 md:p-12 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input type="text" placeholder="Name" required
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white outline-none focus:border-gold transition-colors text-sm" />
                  <input type="tel" placeholder="Phone" required
                    value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white outline-none focus:border-gold transition-colors text-sm" />
                </div>
                <select required
                  value={formData.interest} onChange={e => setFormData({...formData, interest: e.target.value})}
                  className="w-full px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white/50 outline-none focus:border-gold transition-colors text-sm appearance-none">
                  <option value="" disabled>I want to...</option>
                  <option value="volunteer">Volunteer for the campaign</option>
                  <option value="nominate">Sign the nomination form</option>
                  <option value="manifesto">Get a printed manifesto</option>
                  <option value="media">Media / podcast inquiry</option>
                  <option value="other">Something else</option>
                </select>
                <textarea rows={4} placeholder="Message" required
                  value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full px-8 py-6 rounded-[2rem] bg-white/5 border border-white/10 text-white outline-none focus:border-gold transition-colors text-sm resize-none" />
                
                <button type="submit" disabled={isSubmitting} className="btn-premium w-full justify-between">
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  <div className="btn-premium-icon">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                </button>
                
                {submitStatus === "success" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-green-500 text-xs font-bold text-center tracking-widest uppercase">
                    Message Sent Successfully
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="bg-navy pt-24 pb-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-[2fr,1fr,1.5fr] gap-20 pb-20 border-b border-white/5">
            <div>
              <div className="font-display text-4xl text-white mb-4 tracking-tighter uppercase">Richard Miruka</div>
              <div className="text-[10px] tracking-[0.4em] font-black text-gold uppercase mb-8">National Youth Council 2026</div>
              <p className="text-white/30 text-sm leading-relaxed max-w-sm font-medium">
                Software Engineer. ICT Instructor. Youth Leader. Bringing technical credibility and genuine advocacy to the National level.
              </p>
            </div>
            
            <div>
              <div className="text-[10px] tracking-[0.3em] font-black text-white/20 uppercase mb-8">Navigation</div>
              <div className="space-y-4">
                {NAV_LINKS.map(l => (
                  <a key={l.href} href={l.href} className="block text-sm text-white/50 hover:text-gold transition-colors font-bold uppercase tracking-widest">
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <div className="text-[10px] tracking-[0.3em] font-black text-white/20 uppercase mb-8">Election Cycle</div>
              <div className="space-y-6">
                {[
                  { date: "5 July 2026",  event: "Ward Elections" },
                  { date: "16 July 2026", event: "Constituency" },
                  { date: "27 July 2026", event: "National Congress" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <div>
                      <div className="text-white text-xs font-bold uppercase tracking-widest leading-none mb-1">{item.event}</div>
                      <div className="text-gold text-[10px] font-black tracking-widest">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-[9px] font-black tracking-[0.3em] text-white/20 uppercase">
              © 2026 Richard Miruka · Sisi Ni Pamoja
            </div>
            <div className="font-display text-lg text-white/40 tracking-widest">
              WARD · CONSTITUENCY · NATION
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
