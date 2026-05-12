"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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
  { value: "67%",    label: "Youth unemployment aged 18–34", source: "Afrobarometer 2025" },
  { value: "43%",    label: "Youth considering emigrating",  source: "Afrobarometer 2025" },
  { value: "79%",    label: "Say govt fails youth needs",    source: "GeoPoll 2025" },
  { value: "73%",    label: "Ward ICT hubs not yet built",   source: "April 2026" },
  { value: "800K+",  label: "Youth entering labour market yearly", source: "KIPPRA 2024" },
  { value: "26M",    label: "Young Kenyans aged 18–35",      source: "Kenya Census" },
];

const PILLARS: Pillar[] = [
  {
    icon: "📡",
    title: "Connect Kenya",
    color: "#0D1B40",
    items: [
      "Ward-by-ward Digital Superhighway accountability dashboard to track connectivity and infrastructure progress",
      "Mandatory Ajira Digital registration and onboarding at every public ICT hub, TVET and youth centre",
      "Accelerated deployment, equipping and maintenance of ICT hubs in underserved wards and counties",
      "Advocate for the removal of barriers to youth access to laptops, devices and digital asset financing",
      "Nationwide digital literacy, cybersecurity and online safety training for youth and community groups",
      "Public-private partnerships to expand affordable internet access, devices and innovation spaces",
    ],
  },
  {
    icon: "🎓",
    title: "Skills for the Future",
    color: "#1A5C38",
    items: [
      "Advocate for urgent recruitment of TVET trainers to address the existing staffing gap across the country",
      "Integrate Artificial Intelligence, coding, data skills and digital entrepreneurship into Ajira and TVET curricula",
      "Coordinate ward-level Ajira Digital outreach and job-readiness campaigns in all 290 constituencies",
      "Expand 3–6 month Competency-Based Education and Training (CBET) programmes aligned to market demand",
      "Strengthen mentorship, internship and apprenticeship pathways linking youth to industry",
      "Promote recognition of prior learning so self-taught youth can earn nationally recognized certifications",
    ],
  },
  {
    icon: "💰",
    title: "Capital in Young Hands",
    color: "#B8860B",
    items: [
      "Advocate for reforms to Youth Enterprise Development Fund eligibility to remove unnecessary collateral barriers",
      "Recognize laptops, software, digital tools and online businesses as eligible youth investments",
      "Support expansion of programmes such as NYOTA to include all youth up to 35 years",
      "Promote transparent county-level youth fund portals to track applications, approvals and disbursements",
      "Increase financial literacy and business development support for youth-led enterprises",
      "Strengthen market linkages so funded youth businesses can scale sustainably",
    ],
  },
  {
    icon: "🏛️",
    title: "Youth in Every Room",
    color: "#7B0000",
    items: [
      "Institutionalize meaningful youth participation in national and county planning and budget processes",
      "Publish an Annual Youth State of the Nation Report highlighting progress, challenges and recommendations",
      "Advocate for structured youth advisory representation across all 47 counties",
      "Establish a formal intergenerational policy dialogue mechanism to engage young people and decision-makers",
      "Strengthen the National Youth Council as an accountable and effective voice for all Kenyan youth",
      "Promote civic education so young people understand and influence public policy",
    ],
  },
  {
    icon: "❤️",
    title: "Whole-Person Leadership",
    color: "#2E7D52",
    items: [
      "Elevate youth mental health and psychosocial support as a national priority",
      "Promote ward-level peer support and mentorship networks across the country",
      "Integrate social media literacy, digital citizenship and responsible online engagement into youth programmes",
      "Advocate for gender-responsive and inclusive audits of all youth programmes",
      "Support sports, arts and community service as pathways for leadership development",
      "Champion integrity, accountability and values-based leadership among young people",
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

// ── Scroll reveal hook ────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ── Counter component ──────────────────────────────────────────────────────
function AnimatedStat({ value, label, source }: Stat) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="text-center p-6">
      <div className={`font-display text-5xl md:text-6xl transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ color: "#D4A017" }}>
        {value}
      </div>
      <div className="text-white font-semibold mt-2 text-sm md:text-base">{label}</div>
      <div className="text-gray-400 text-xs mt-1">{source}</div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────
export default function Home() {
  useReveal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen">

      {/* ── NAV ──────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 shadow-2xl" : "py-5"
      }`} style={{ background: scrolled ? "rgba(13,27,64,0.97)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none" }}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-display text-xl text-white pulse-gold"
              style={{ background: "var(--green-deep)" }}>R</div>
            <div className="hidden sm:block">
              <div className="font-display text-white text-lg leading-none tracking-wider">RICHARD MIRUKA</div>
              <div className="text-xs tracking-widest" style={{ color: "#D4A017" }}>NYC 2026</div>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href}
                className="text-gray-300 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200 relative group">
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                  style={{ background: "#D4A017" }} />
              </a>
            ))}
            <a href="#register"
              className="px-5 py-2.5 rounded font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ background: "#D4A017", color: "#0D1B40" }}>
              Register & Vote
            </a>
          </div>

          {/* Mobile hamburger */}
          <button className="lg:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <div className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t mt-3 py-4 px-4" style={{ background: "rgba(13,27,64,0.98)", borderColor: "rgba(212,160,23,0.3)" }}>
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="block py-3 text-gray-200 hover:text-white font-medium border-b"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                {l.label}
              </a>
            ))}
            <a href="#register" onClick={() => setMenuOpen(false)}
              className="block mt-4 text-center py-3 rounded font-bold"
              style={{ background: "#D4A017", color: "#0D1B40" }}>
              Register & Vote
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0D1B40 0%, #1A5C38 60%, #0D1B40 100%)" }}>

        {/* Background grid */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        {/* Kenya flag accent */}
        <div className="absolute top-0 left-0 right-0 flag-stripe" />

        {/* Large background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="font-display text-[20vw] text-white opacity-[0.03] leading-none select-none">
            NYC
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-32 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest mb-8"
              style={{ background: "rgba(212,160,23,0.15)", color: "#D4A017", border: "1px solid rgba(212,160,23,0.3)" }}>
              🗳️ NATIONAL YOUTH COUNCIL ELECTION 2026
            </div>

            <h1 className="font-display leading-none mb-4" style={{ fontSize: "clamp(3rem,8vw,7rem)" }}>
              <span className="block text-white">YOUTH</span>
              <span className="block gold-shimmer">VOICE.</span>
              <span className="block text-white">YOUTH</span>
              <span className="block gold-shimmer">POWER.</span>
            </h1>

            <p className="font-serif text-xl md:text-2xl mb-8 italic" style={{ color: "rgba(255,255,255,0.8)" }}>
              Better Tomorrow — for every young Kenyan.
            </p>

            <div className="mb-8">
              <div className="font-display text-2xl md:text-3xl text-white mb-1">RICHARD MIRUKA</div>
              <div className="text-sm tracking-widest" style={{ color: "#D4A017" }}>
                SOFTWARE ENGINEER  •  ICT INSTRUCTOR  •  YOUTH LEADER
              </div>
            </div>

            {/* Election levels */}
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { level: "WARD", place: "Makina Ward", date: "5 Jul", color: "#1A5C38" },
                { level: "CONSTITUENCY", place: "Kibra", date: "16 Jul", color: "#2E7D52" },
                { level: "NATIONAL", place: "NYC Congress", date: "27 Jul", color: "#D4A017" },
              ].map((l, i) => (
                <div key={i} className="px-4 py-3 rounded-lg text-center"
                  style={{ background: `${l.color}33`, border: `1px solid ${l.color}66` }}>
                  <div className="font-display text-white text-xs tracking-wider">{l.level}</div>
                  <div className="text-white text-sm font-semibold">{l.place}</div>
                  <div className="text-xs font-bold" style={{ color: "#D4A017" }}>{l.date} July 2026</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="#register"
                className="px-8 py-4 rounded-lg font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/20"
                style={{ background: "#D4A017", color: "#0D1B40" }}>
                Register & Vote →
              </a>
              <a href="#pillars"
                className="px-8 py-4 rounded-lg font-semibold text-base border-2 text-white transition-all duration-300 hover:bg-white hover:text-navy-900"
                style={{ borderColor: "rgba(255,255,255,0.4)" }}>
                See My Agenda
              </a>
            </div>
          </div>

          {/* Right: candidate image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl blur-3xl opacity-30"
                style={{ background: "radial-gradient(circle, #D4A017 0%, #1A5C38 60%, transparent 100%)", transform: "scale(1.1)" }} />
              {/* Image frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl"
                style={{ border: "3px solid rgba(212,160,23,0.5)", maxWidth: "420px" }}>
                <Image src="/richard-miruka.png" alt="Richard Miruka — NYC Candidate 2026"
                  width={420} height={560} className="w-full object-cover object-top"
                  priority style={{ maxHeight: "560px" }} />
                {/* Overlay badge */}
                <div className="absolute bottom-0 left-0 right-0 p-4"
                  style={{ background: "linear-gradient(transparent, rgba(13,27,64,0.95))" }}>
                  <div className="font-display text-2xl text-white">RICHARD MIRUKA</div>
                  <div className="text-xs tracking-wider" style={{ color: "#D4A017" }}>
                    VOTE #1 · NYC 2026 · SISI NI PAMOJA
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>SCROLL</div>
          <div className="w-px h-8" style={{ background: "rgba(212,160,23,0.5)" }} />
        </div>
      </section>

      {/* ── MARQUEE TICKER ─────────────────────────────────────────────── */}
      <div className="py-4 overflow-hidden" style={{ background: "#D4A017" }}>
        <div className="marquee-inner gap-12">
          {[...MARQUEE_TEXT, ...MARQUEE_TEXT].map((t, i) => (
            <span key={i} className="font-display text-sm tracking-widest px-6 flex-shrink-0"
              style={{ color: "#0D1B40" }}>
              {t} <span className="opacity-40 mx-2">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS ──────────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#0D1B40" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="reveal text-center mb-12">
            <div className="font-display text-4xl md:text-5xl text-white mb-3">THE CRISIS WE MUST NAME</div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Kenya cannot afford polite conversations about a crisis that is burning. These are the numbers — and every one represents a young Kenyan whose potential is being wasted.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 border border-white/10 rounded-xl overflow-hidden">
            {STATS.map((s, i) => (
              <div key={i} className="border-r border-b border-white/10 last:border-r-0">
                <AnimatedStat {...s} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 diagonal-bg">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <div className="inline-block px-3 py-1 text-xs font-bold tracking-widest rounded mb-6"
              style={{ background: "var(--green-light)", color: "var(--green-deep)" }}>
              WHO I AM
            </div>
            <h2 className="font-display text-5xl md:text-6xl mb-6 leading-tight"
              style={{ color: "var(--navy)" }}>
              I WAS RAISED & SHAPED<br />
              <span style={{ color: "var(--green-deep)" }}>BY SERVICE IN VULNERABLE & UNDERSERVED COMMUNITIES.</span><br />
              I AM RUNNING TO REPRESENT<br />
              THE MANY IN ALL OF KENYA.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              I am a <strong>Full Stack Software Engineer, Technical Mentor</strong> and community volunteer. I have spent five years supporting literacy and digital skills in Kenya — From Web development, cybersecurity, and ICT fundamentals — watching young people transform when they get real tools.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              I have organized youth meetups and dialogues, led youth communities, volunteered in schools and scholarship drives, and mentored young people without waiting for permission. <strong>Service without a title has been my career. I am now seeking a title to scale that service nationally.</strong>
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "💻", label: "Software Engineer",    sub: "Full Stack" },
                { icon: "📚", label: "ICT Instructor",       sub: "Ta'awun Trust" },
                { icon: "⚽", label: "Community Leader",     sub: "Football & Youth" },
                { icon: "🎓", label: "Technical Mentor",     sub: "Digital Skills" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl"
                  style={{ background: "var(--green-light)" }}>
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: "var(--navy)" }}>{item.label}</div>
                    <div className="text-xs text-gray-500">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quote card */}
          <div className="reveal reveal-d2">
            <div className="rounded-2xl overflow-hidden shadow-2xl"
              style={{ background: "var(--navy)" }}>
              <div className="p-10">
                <div className="font-display text-6xl mb-6" style={{ color: "var(--gold)" }}>"</div>
                <p className="font-serif text-xl md:text-2xl text-white leading-relaxed mb-8 italic">
                  I have worked with passion.<br />I will serve with purpose.
                </p>
                <div className="border-t pt-6" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                  <div className="font-display text-xl text-white">RICHARD MIRUKA</div>
                  <div className="text-sm tracking-widest mt-1" style={{ color: "#D4A017" }}>
                    NYC CANDIDATE 2026
                  </div>
                </div>
              </div>
              <div className="px-10 pb-8 space-y-3">
                {[
                  "National Youth Council Act, Cap. 132 — legally grounded agenda",
                  "Digital Superhighway — tech-first youth development",
                  "YEDF, NYOTA, Ajira — real programme reform",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#D4A017" }} />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISION ─────────────────────────────────────────────────────── */}
      <section id="vision" className="py-24 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #1A5C38 0%, #0D1B40 100%)" }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #D4A017 0%, transparent 50%), radial-gradient(circle at 80% 20%, #fff 0%, transparent 40%)" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="reveal">
            <div className="inline-block px-3 py-1 text-xs font-bold tracking-widest rounded mb-6 text-navy-900"
              style={{ background: "#D4A017", color: "#0D1B40" }}>
              MY NATIONAL VISION
            </div>
            <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-8" style={{ color: "white" }}>
              "A Kenya where every young person — regardless of county, gender, disability or economic background — has access to the skills, capital, connectivity and civic space to build a dignified life and shape the nation's future."
            </h2>
            <p className="text-lg mb-12" style={{ color: "rgba(255,255,255,0.7)" }}>
              Grounded in the <strong className="text-white">National Youth Council Act, Cap. 132</strong>. 
              Powered by Kenya's <strong className="text-white">Digital Superhighway</strong>. 
              For every county. For every ward. For every young Kenyan.
            </p>
          </div>
          <div className="reveal reveal-d2 grid md:grid-cols-3 gap-6">
            {[
              { icon: "⚖️", title: "Legally Grounded", body: "Every commitment traces directly to the NYC Act Section 5 mandates. Not political promises — statutory obligations." },
              { icon: "📡", title: "Tech-Powered",     body: "The Digital Superhighway is Kenya's biggest youth investment. My mission: ensure it reaches every ward, not just cities." },
              { icon: "🌍", title: "Nationally Scaled", body: "This campaign starts in Makina but the agenda is for all 47 counties. No young Kenyan left behind." },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl text-left"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="font-bold text-lg text-white mb-2">{item.title}</div>
                <div className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{item.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PILLARS ─────────────────────────────────────────────────────── */}
      <section id="pillars" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="reveal text-center mb-16">
            <div className="inline-block px-3 py-1 text-xs font-bold tracking-widest rounded mb-6"
              style={{ background: "var(--green-light)", color: "var(--green-deep)" }}>
              FIVE PILLARS OF ACTION
            </div>
            <h2 className="font-display text-5xl md:text-6xl mb-4" style={{ color: "var(--navy)" }}>
              MY NATIONAL AGENDA
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Five priorities. Each grounded in law, data and lived experience. Measurable. Accountable. For every county in Kenya.
            </p>
          </div>
          <div className="space-y-6">
            {PILLARS.map((pillar, i) => (
              <div key={i} className={`reveal reveal-d${i + 1} rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300`}
                style={{ border: `1px solid ${pillar.color}33` }}>
                <div className="grid md:grid-cols-[200px,1fr]">
                  {/* Left accent */}
                  <div className="flex flex-col items-center justify-center p-8 text-white"
                    style={{ background: pillar.color }}>
                    <div className="text-5xl mb-2">{pillar.icon}</div>
                    <div className="font-display text-xl text-center leading-tight">{pillar.title}</div>
                    <div className="font-display text-4xl mt-2 opacity-30">0{i + 1}</div>
                  </div>
                  {/* Right content */}
                  <div className="p-8" style={{ background: `${pillar.color}08` }}>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {pillar.items.map((item, j) => (
                        <div key={j} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                            style={{ background: pillar.color }} />
                          <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANIFESTO DOWNLOAD ──────────────────────────────────────────── */}
      <section className="py-16" style={{ background: "#D4A017" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-4" style={{ color: "#0D1B40" }}>
            DOWNLOAD THE FULL MANIFESTO
          </h2>
          <p className="mb-8 text-lg" style={{ color: "rgba(13,27,64,0.75)" }}>
            30+ specific commitments grounded in the NYC Act. Print it. Share it. Hold me to it.
          </p>
          <a href="/manifesto.pdf" download
            className="inline-flex items-center gap-3 px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
            style={{ background: "#0D1B40", color: "white" }}>
            📄 Download Manifesto (PDF)
          </a>
          <p className="mt-4 text-sm" style={{ color: "rgba(13,27,64,0.6)" }}>
            Also available in Swahili. Contact the campaign team for a printed copy.
          </p>
        </div>
      </section>

      {/* ── ELECTION TIMELINE ───────────────────────────────────────────── */}
      <section id="timeline" className="py-24" style={{ background: "var(--navy)" }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="reveal text-center mb-16">
            <div className="inline-block px-3 py-1 text-xs font-bold tracking-widest rounded mb-6"
              style={{ background: "rgba(212,160,23,0.2)", color: "#D4A017", border: "1px solid rgba(212,160,23,0.3)" }}>
              ELECTIONS TIMETABLE
            </div>
            <h2 className="font-display text-5xl text-white mb-4">HOW THE NYC ELECTION WORKS</h2>
            <p className="text-gray-400">Four steps. Your vote at step one powers the journey to the national council.</p>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px hidden md:block" style={{ background: "rgba(212,160,23,0.3)" }} />
            <div className="space-y-8">
              {[
                { step: "01", date: "NOW → JUNE 2026", title: "VOTER REGISTRATION",     body: "Register as a voter through your ward youth officer or at nationalyouthcouncil.go.ke. You must be aged 18–35.", color: "#1A5C38",  cta: "Register Now →",      href: "https://nationalyouthcouncil.go.ke" },
                { step: "02", date: "PRE-5 JULY 2026", title: "NOMINATIONS — FORM 1",  body: "Richard needs 50 signatures from registered Makina Ward voters to get on the ballot. Sign Form 1 to nominate him.", color: "#2E7D52",  cta: "Sign Form 1",        href: "#contact" },
                { step: "03", date: "5 JULY 2026",     title: "WARD ELECTIONS",         body: "Registered youth in Makina Ward vote for ward delegates. Polls open 8:00am–5:00pm. Bring National ID or Passport.", color: "#D4A017",  cta: "Makina Ward Polls",  href: "#register" },
                { step: "04", date: "16 JULY 2026",    title: "CONSTITUENCY ELECTIONS", body: "Ward delegates elect two Kibra Constituency delegates — one male, one female — for the National Youth Congress.", color: "#B8860B",  cta: "Kibra Constituency", href: "#register" },
                { step: "05", date: "27 JULY 2026",    title: "NATIONAL YOUTH CONGRESS",body: "580 delegates from all 290 constituencies elect NYC members. Richard's goal: be elected to the National Youth Council.", color: "#CE1126", cta: "National Congress",  href: "#vision" },
              ].map((item, i) => (
                <div key={i} className={`reveal reveal-d${i + 1} flex gap-6 md:gap-12`}>
                  {/* Step circle */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center font-display text-xl text-white shadow-lg relative z-10"
                    style={{ background: item.color }}>
                    {item.step}
                  </div>
                  {/* Content */}
                  <div className="flex-1 pb-8 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                    <div className="font-display text-xs tracking-widest mb-1" style={{ color: item.color }}>{item.date}</div>
                    <div className="font-display text-2xl text-white mb-2">{item.title}</div>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">{item.body}</p>
                    <a href={item.href}
                      className="inline-flex items-center gap-2 text-xs font-bold tracking-wider px-4 py-2 rounded transition-all duration-200 hover:scale-105"
                      style={{ background: `${item.color}22`, color: item.color, border: `1px solid ${item.color}44` }}>
                      {item.cta}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────────── */}
      <section id="testimonials" className="py-24 diagonal-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="reveal text-center mb-16">
            <div className="inline-block px-3 py-1 text-xs font-bold tracking-widest rounded mb-6"
              style={{ background: "var(--green-light)", color: "var(--green-deep)" }}>
              VOICES FROM THE COMMUNITY
            </div>
            <h2 className="font-display text-5xl md:text-6xl mb-4" style={{ color: "var(--navy)" }}>
              ENDORSEMENTS &amp; TESTIMONIALS
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Real people. Real stories. Real reasons to vote for Richard Miruka.
            </p>
          </div>

          {/* Featured testimonial */}
          <div className="reveal mb-12 rounded-2xl overflow-hidden shadow-xl grid md:grid-cols-2"
            style={{ background: "var(--navy)" }}>
            {/* Video placeholder */}
            <div className="relative bg-black aspect-video md:aspect-auto flex items-center justify-center group cursor-pointer"
              style={{ background: "linear-gradient(135deg, #1A5C38, #0D1B40)" }}
              onClick={() => window.open(TESTIMONIALS[activeTestimonial].videoUrl, "_blank")}>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: "rgba(212,160,23,0.2)", border: "2px solid #D4A017" }}>
                  <div className="w-0 h-0 ml-2" style={{
                    borderTop: "16px solid transparent",
                    borderBottom: "16px solid transparent",
                    borderLeft: "24px solid #D4A017"
                  }} />
                </div>
                <p className="text-white font-semibold">Watch Testimonial</p>
                <p className="text-xs mt-1" style={{ color: "rgba(212,160,23,0.8)" }}>
                  {TESTIMONIALS[activeTestimonial].name} — {TESTIMONIALS[activeTestimonial].location}
                </p>
                <p className="text-xs mt-2 px-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Video will be available once uploaded to Google Drive
                </p>
              </div>
            </div>
            {/* Quote */}
            <div className="p-10 flex flex-col justify-center">
              <div className="font-display text-5xl mb-4" style={{ color: "#D4A017" }}>"</div>
              <p className="font-serif text-lg md:text-xl text-white leading-relaxed italic mb-8">
                {TESTIMONIALS[activeTestimonial].quote}
              </p>
              <div>
                <div className="font-bold text-white">{TESTIMONIALS[activeTestimonial].name}</div>
                <div className="text-sm" style={{ color: "#D4A017" }}>
                  {TESTIMONIALS[activeTestimonial].role} · {TESTIMONIALS[activeTestimonial].location}
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <div key={i}
                className={`rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${activeTestimonial === i ? "ring-2" : ""}`}
                style={{ background: "var(--navy)", border: activeTestimonial === i ? "2px solid #D4A017" : "1px solid rgba(255,255,255,0.08)" }}
                onClick={() => setActiveTestimonial(i)}>
                {/* Video thumb placeholder */}
                <div className="aspect-video flex items-center justify-center relative group"
                  style={{ background: `linear-gradient(135deg, ${i % 2 === 0 ? "#1A5C38" : "#0D1B40"}, #0D1B40)` }}>
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                      style={{ background: "rgba(212,160,23,0.2)" }}>
                      <div className="w-0 h-0 ml-1" style={{
                        borderTop: "8px solid transparent",
                        borderBottom: "8px solid transparent",
                        borderLeft: "12px solid #D4A017"
                      }} />
                    </div>
                    <p className="text-xs text-white opacity-60">Video Testimonial</p>
                  </div>
                  {activeTestimonial === i && (
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: "#D4A017" }} />
                  )}
                </div>
                <div className="p-4">
                  <p className="text-white text-xs leading-relaxed mb-3 line-clamp-3 italic">
                    "{t.quote.substring(0, 90)}..."
                  </p>
                  <div className="font-semibold text-xs text-white">{t.name}</div>
                  <div className="text-xs" style={{ color: "#D4A017" }}>{t.role} · {t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REGISTER & VOTE CTA ──────────────────────────────────────────── */}
      <section id="register" className="py-24 relative overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, #0D1B40 0%, #1A5C38 100%)" }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #D4A017 0%, transparent 60%)" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="reveal">
            <div className="font-display text-6xl md:text-7xl mb-6 leading-none">
              YOUR VOTE IS<br />
              <span className="gold-shimmer">YOUR POWER.</span>
            </div>
            <p className="text-xl mb-12 max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.8)" }}>
              Three steps. One outcome. Real change for Kenya's 26 million youth.
            </p>
          </div>
          <div className="reveal reveal-d2 grid md:grid-cols-3 gap-6 mb-12">
            {[
              { step: "1", action: "REGISTER", detail: "At your ward youth officer or nationalyouthcouncil.go.ke", color: "#1A5C38" },
              { step: "2", action: "NOMINATE", detail: "Sign Form 1 to get Richard on the Makina Ward ballot", color: "#D4A017" },
              { step: "3", action: "VOTE",     detail: "Show up on 5 July 2026 · 8am–5pm · Bring your ID",     color: "#CE1126" },
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.07)", border: `2px solid ${item.color}66` }}>
                <div className="font-display text-5xl mb-2" style={{ color: item.color }}>{item.step}</div>
                <div className="font-display text-2xl text-white mb-3">{item.action}</div>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{item.detail}</p>
              </div>
            ))}
          </div>
          <div className="reveal reveal-d3 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://nationalyouthcouncil.go.ke" target="_blank" rel="noopener noreferrer"
              className="px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/30"
              style={{ background: "#D4A017", color: "#0D1B40" }}>
              Register at NYC Website →
            </a>
            <a href="tel:+254700000000"
              className="px-10 py-4 rounded-xl font-bold text-lg border-2 text-white transition-all duration-300 hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.4)" }}>
              Call the Campaign Team
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="reveal text-center mb-16">
            <h2 className="font-display text-5xl mb-4" style={{ color: "var(--navy)" }}>GET IN TOUCH</h2>
            <p className="text-gray-500">Have a question, want to volunteer, or need a printed manifesto?</p>
          </div>
          <div className="reveal grid md:grid-cols-2 gap-12">
            {/* Contact info */}
            <div className="space-y-6">
              {[
                { icon: "📍", label: "Campaign Base",   value: "Makina Ward, Kibera, Nairobi" },
                { icon: "📱", label: "WhatsApp",         value: "+254 [NUMBER]" },
                { icon: "📧", label: "Email",            value: "campaign@richardmiruka.co.ke" },
                { icon: "🌐", label: "Website",          value: "richardmiruka.co.ke" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl"
                  style={{ background: "var(--green-light)" }}>
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="text-xs font-bold tracking-widest mb-1" style={{ color: "var(--green-deep)" }}>{item.label}</div>
                    <div className="font-semibold text-gray-700">{item.value}</div>
                  </div>
                </div>
              ))}
              <div className="flex gap-4 pt-4">
                {[
                  { label: "X / Twitter", href: "https://twitter.com/richardmiruka" },
                  { label: "Instagram",   href: "https://instagram.com/richardmiruka" },
                  { label: "TikTok",      href: "https://tiktok.com/@richardmiruka" },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="flex-1 text-center py-3 rounded-lg text-sm font-bold transition-all duration-200 hover:scale-105"
                    style={{ background: "var(--navy)", color: "white" }}>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick message form */}
            <div className="rounded-2xl p-8 shadow-xl" style={{ background: "var(--navy)" }}>
              <h3 className="font-display text-2xl text-white mb-6">SEND A MESSAGE</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg text-white text-sm placeholder-gray-500 outline-none focus:ring-2 ring-yellow-500/50"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }} />
                <input type="tel" placeholder="Phone / WhatsApp"
                  className="w-full px-4 py-3 rounded-lg text-white text-sm placeholder-gray-500 outline-none focus:ring-2 ring-yellow-500/50"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }} />
                <select className="w-full px-4 py-3 rounded-lg text-sm outline-none focus:ring-2 ring-yellow-500/50"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}>
                  <option value="" style={{ background: "#0D1B40" }}>I want to...</option>
                  <option value="volunteer" style={{ background: "#0D1B40" }}>Volunteer for the campaign</option>
                  <option value="nominate"  style={{ background: "#0D1B40" }}>Sign the nomination form</option>
                  <option value="manifesto" style={{ background: "#0D1B40" }}>Get a printed manifesto</option>
                  <option value="media"     style={{ background: "#0D1B40" }}>Media / podcast inquiry</option>
                  <option value="other"     style={{ background: "#0D1B40" }}>Something else</option>
                </select>
                <textarea rows={3} placeholder="Your message..."
                  className="w-full px-4 py-3 rounded-lg text-white text-sm placeholder-gray-500 outline-none focus:ring-2 ring-yellow-500/50 resize-none"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }} />
                <button className="w-full py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105"
                  style={{ background: "#D4A017", color: "#0D1B40" }}>
                  Send Message →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer style={{ background: "#0D1B40" }}>
        <div className="flag-stripe" />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-12 pb-12 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            {/* Brand */}
            <div>
              <div className="font-display text-3xl text-white mb-2">RICHARD MIRUKA</div>
              <div className="text-xs tracking-widest mb-6" style={{ color: "#D4A017" }}>NATIONAL YOUTH COUNCIL 2026</div>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                Software Engineer. ICT Instructor. Youth Leader. Running to bring technical credibility, grassroots accountability and genuine youth advocacy to the National Youth Council.
              </p>
            </div>
            {/* Links */}
            <div>
              <div className="font-bold text-white text-sm tracking-widest mb-6 uppercase">Quick Links</div>
              <div className="space-y-3">
                {NAV_LINKS.map(l => (
                  <a key={l.href} href={l.href} className="block text-sm transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.5)" }}>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
            {/* Election dates */}
            <div>
              <div className="font-bold text-white text-sm tracking-widest mb-6 uppercase">Election Dates</div>
              <div className="space-y-4">
                {[
                  { date: "5 July 2026",  event: "Ward Elections",          loc: "Makina Ward" },
                  { date: "16 July 2026", event: "Constituency Elections",  loc: "Kibra Constituency" },
                  { date: "27 July 2026", event: "National Youth Congress", loc: "National Level" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#D4A017" }} />
                    <div>
                      <div className="font-bold text-xs" style={{ color: "#D4A017" }}>{item.date}</div>
                      <div className="text-white text-sm">{item.event}</div>
                      <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{item.loc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              © 2026 Richard Miruka Campaign. All rights reserved. | Grounded in the National Youth Council Act, Cap. 132
            </div>
            <div className="font-display text-sm" style={{ color: "#D4A017" }}>
              SISI NI PAMOJA · ONE WARD · ONE CONSTITUENCY · ONE NATION · ONE FUTURE
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
