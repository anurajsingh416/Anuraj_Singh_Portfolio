import { useEffect, useRef, useState } from 'react'
import { profile, services, projects, skills } from './data'

const Arrow = () => <svg viewBox="0 0 24 24" className="h-[22px] w-[22px] fill-none stroke-current stroke-[1.5]"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
const Mail = () => <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.5]"><path d="M4 4h16v16H4V4zm0 0l8 8 8-8"/></svg>
const Github = () => <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.5]"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
const Linkedin = () => <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.5]"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
const Phone = () => <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.5]"><path d="M5 4h4l2 5-2.5 1.5A11 11 0 0 0 15.5 17.5L17 15l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(entries => entries.forEach((entry, i) => {
      if (entry.isIntersecting) { setTimeout(() => entry.target.classList.add('visible'), i * 60); io.unobserve(entry.target) }
    }), { threshold: .1 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function useTilt(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el || !window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const move = e => { const r = el.getBoundingClientRect(); const px=(e.clientX-r.left)/r.width-.5; const py=(e.clientY-r.top)/r.height-.5; el.style.transition='transform .08s ease-out'; el.style.transform=`perspective(900px) rotateX(${(-py*5).toFixed(2)}deg) rotateY(${(px*6).toFixed(2)}deg) translateY(-4px)` }
    const leave = () => { el.style.transition=''; el.style.transform='' }
    el.addEventListener('mousemove', move); el.addEventListener('mouseleave', leave)
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave) }
  }, [ref])
}

function ContactChip({ href, children, icon }) { return <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noreferrer' : undefined} className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-2 text-xs text-[#6B665C] transition hover:border-black/20 hover:bg-white hover:text-[#14120F]">{icon}{children}</a> }
function SectionHeading({ label, title }) { return <><p className="section-label reveal font-mono text-[.7rem] uppercase tracking-[.14em] text-[#9C968A]">// {label}</p><h2 className="section-title reveal mt-2 font-display text-5xl tracking-[.02em] sm:text-6xl">{title}</h2></> }
function TiltCard({ children, className='' }) { const ref=useRef(null); useTilt(ref); return <div ref={ref} className={className}>{children}</div> }

export default function App() {
  const [menu, setMenu] = useState(false)
  useReveal()
  const close = () => setMenu(false)
  return <div className="min-h-screen bg-[#F7F4EE] text-[#14120F]">
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-black/10 bg-[#F7F4EE]/85 px-5 py-4 backdrop-blur-xl sm:px-8">
      <a href="#hero" onClick={close} className="font-display text-3xl tracking-[.05em]">AS</a>
      <button onClick={()=>setMenu(!menu)} className="rounded-full border border-black/10 px-3 py-1.5 font-mono text-xs sm:hidden">{menu ? 'Close' : 'Menu'}</button>
      <div className={`${menu ? 'absolute left-4 right-4 top-16 flex' : 'hidden'} flex-col gap-3 rounded-2xl border border-black/10 bg-[#F7F4EE]/95 p-5 backdrop-blur-xl sm:static sm:flex sm:flex-row sm:items-center sm:gap-8 sm:border-0 sm:bg-transparent sm:p-0`}>
        {['services','projects','experience','skills','contact'].map(x => <a key={x} onClick={close} href={`#${x}`} className="text-xs uppercase tracking-[.08em] text-[#6B665C] transition hover:text-[#14120F]">{x}</a>)}
      </div>
      <a className="hidden rounded-full bg-[#14120F] px-5 py-2 text-xs uppercase tracking-[.08em] text-[#F7F4EE] transition hover:opacity-80 sm:block" href="/assets/Anuraj_Singh_CV_V2.pdf" download>Resume</a>
    </nav>

    <main>
      <section id="hero" className="flex min-h-screen flex-col justify-center px-5 pb-16 pt-32 sm:px-12 lg:px-16">
        <div className="hero-in hero-in-1 mb-10 flex items-center justify-between"><span className="font-mono text-[.7rem] font-medium uppercase tracking-[.05em]">✦ Full-Stack Developer</span><span className="font-mono text-[.7rem] tracking-[.05em] text-[#9C968A]">© 2026</span></div>
        <h1 className="hero-in hero-in-2 font-display text-[clamp(5.5rem,17vw,13rem)] leading-[.78] tracking-[-.02em]">Hey!</h1>
        <p className="hero-in hero-in-3 mt-5 font-display text-[clamp(3rem,8vw,6.5rem)] leading-[.9]">I'm Anuraj Singh</p>
        <p className="hero-in hero-in-4 mt-8 max-w-2xl text-base leading-7 text-[#6B665C] sm:text-lg">{profile.intro}</p>
        <div className="hero-in hero-in-4 mt-7 flex flex-wrap gap-2">
          <ContactChip href={`mailto:${profile.email}`} icon={<Mail/>}>{profile.email}</ContactChip>
          <ContactChip href="#contact" icon={<Phone/>}>Open to opportunities</ContactChip>
          <ContactChip href={profile.github} icon={<Github/>}>GitHub</ContactChip>
          <ContactChip href={profile.linkedin} icon={<Linkedin/>}>LinkedIn</ContactChip>
          <ContactChip href={profile.leetcode}>LeetCode</ContactChip>
        </div>
      </section>

      <Divider />
      <section id="services" className="px-5 py-20 sm:px-12 lg:px-16"><SectionHeading label="What I Do" title="Services"/><div className="mt-10 divide-y divide-black/10 border-y border-black/10">{services.map(([no,name,desc])=><div key={no} className="service-row reveal flex items-center gap-4 py-7 transition hover:bg-white/35 sm:gap-8"><span className="w-7 shrink-0 font-mono text-xs text-[#9C968A]">{no}</span><span className="flex-1 font-display text-3xl tracking-[.02em] sm:text-4xl">{name}</span><span className="hidden max-w-[380px] text-right text-sm leading-6 text-[#6B665C] md:block">{desc}</span><Arrow/></div>)}</div></section>

      <Divider />
      <section id="projects" className="px-5 py-20 sm:px-12 lg:px-16"><SectionHeading label="Featured" title="Projects"/><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{projects.map(p=><TiltCard key={p.no} className="project-card reveal overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_18px_45px_rgba(20,18,15,.04)]"><div className="flex h-16 items-center justify-between px-5 text-white" style={{background:p.color}}><span className="font-display text-4xl">{p.code}</span><span className="font-mono text-xs opacity-75">{p.no}</span></div><div className="p-7"><p className="font-mono text-[.68rem] uppercase tracking-[.1em] text-[#9C968A]">{p.type}</p><h3 className="mt-2 font-display text-3xl tracking-[.02em]">{p.name}</h3><p className="mt-4 text-sm leading-6 text-[#6B665C]">{p.desc}</p><div className="mt-5 flex flex-wrap gap-2">{p.tags.map(t=><span key={t} className="rounded-full border border-black/10 bg-[#F7F4EE] px-2.5 py-1 font-mono text-[.65rem] text-[#6B665C]">{t}</span>)}</div><a href={p.href} className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[.08em] transition hover:gap-3">View Project <Arrow/></a></div></TiltCard>)}</div></section>

      <Divider />
      <section id="experience" className="px-5 py-20 sm:px-12 lg:px-16"><SectionHeading label="Background" title="Experience"/><TiltCard className="exp-card reveal mt-10 flex flex-col justify-between gap-8 rounded-2xl border border-black/10 bg-white p-7 sm:flex-row sm:p-9"><div><h3 className="font-display text-3xl">Full-Stack Development</h3><p className="mt-1 text-sm text-[#6B665C]">Independent Projects & Technical Development</p><p className="mt-1 font-mono text-xs text-[#9C968A]">India</p><p className="mt-5 max-w-3xl text-sm leading-7 text-[#6B665C]">Built and iterated on full-stack web applications using React, Next.js, TypeScript, Node.js, PostgreSQL, MongoDB, and authentication technologies. Currently strengthening problem-solving and software engineering skills through DSA and interview preparation.</p></div><div className="shrink-0 sm:text-right"><p className="font-mono text-xs text-[#9C968A]">Ongoing</p><span className="mt-3 inline-block rounded-full border border-black/10 px-3 py-1 font-mono text-[.65rem] uppercase tracking-[.08em]">Software Development</span></div></TiltCard></section>

      <Divider />
      <section id="education" className="px-5 py-20 sm:px-12 lg:px-16"><SectionHeading label="Education" title="Education"/><TiltCard className="edu-card reveal mt-10 flex flex-col justify-between gap-8 rounded-2xl border border-black/10 bg-white p-7 sm:flex-row sm:p-9"><div><h3 className="font-display text-3xl">Pune University</h3><p className="mt-1 text-sm text-[#6B665C]">Bachelor of Computer Applications (BCA)</p><p className="mt-1 font-mono text-xs text-[#9C968A]">Maharashtra, India</p></div><div className="sm:text-right"><p className="font-display text-5xl">9.7</p><p className="font-mono text-[.65rem] tracking-[.1em] text-[#9C968A]">CGPA / 10.00</p><p className="mt-3 font-mono text-xs text-[#9C968A]">BCA Graduate</p></div></TiltCard></section>

      <Divider />
      <section id="skills" className="px-5 py-20 sm:px-12 lg:px-16"><SectionHeading label="Toolbox" title="Technical Skills"/><div className="mt-10 space-y-6">{skills.map(([group,items])=><div key={group} className="skill-row reveal flex flex-col gap-4 border-b border-black/10 pb-6 sm:flex-row sm:gap-8"><span className="w-36 shrink-0 font-mono text-xs uppercase tracking-[.08em] text-[#6B665C]">{group}</span><div className="flex flex-1 flex-wrap gap-2">{items.map(s=><span key={s} className="rounded-full border border-black/10 bg-white px-3 py-1.5 font-mono text-[.68rem] text-[#6B665C]">{s}</span>)}</div></div>)}</div></section>

      <Divider />
      <section className="px-5 py-20 sm:px-12 lg:px-16"><SectionHeading label="Recognition" title="Achievements"/><div className="mt-10 divide-y divide-black/10 border-y border-black/10">{[['IBM Generative AI Engineering Professional Certificate','Coursera','Ongoing'],['DSA & Problem Solving','LeetCode practice and interview preparation','Ongoing'],['Full-Stack Web Development','React, Node.js, Next.js and database-driven applications','Projects']].map(([a,b,c],i)=><div key={a} className="ach-item reveal flex items-center gap-4 py-6"><span className="font-mono text-xs text-[#9C968A]">0{i+1}</span><div className="flex-1"><p className="text-sm">{a}</p><p className="font-mono text-xs text-[#6B665C]">{b}</p></div><span className="font-mono text-xs text-[#9C968A]">{c}</span></div>)}</div></section>

      <Divider />
      <section className="px-5 py-20 sm:px-12 lg:px-16"><SectionHeading label="Beyond" title="Development & More"/><div className="mt-10 grid gap-5 lg:grid-cols-2"><InfoCard title="Development"><p><strong>Full-Stack Projects</strong> — Built web applications covering e-commerce, notes, news, assessments, and AI-powered career workflows.</p><span>React · Next.js · Node.js · PostgreSQL · MongoDB</span><p><strong>Continuous Learning</strong> — Actively improving DSA, software engineering fundamentals, and modern AI development skills.</p><span>DSA · DBMS · OOP · Generative AI</span></InfoCard><InfoCard title="Beyond Code"><p><strong>Problem Solving</strong></p><span>LeetCode · Algorithms · Data Structures</span><p><strong>Career Focus</strong></p><span>Software Development · Full-Stack · AI-enabled Applications</span></InfoCard></div></section>

      <Divider />
      <section id="contact" className="px-5 py-20 sm:px-12 lg:px-16"><div className="reveal rounded-3xl bg-[#14120F] px-6 py-20 text-center text-[#F7F4EE] sm:px-12"><h2 className="font-display text-6xl leading-[.9] sm:text-8xl">Let's build<br/><span>something.</span></h2><p className="mx-auto mt-7 max-w-xl text-sm leading-6 text-[#F7F4EE]/65 sm:text-base">BCA graduate open to software development opportunities, internships, and collaborations in full-stack and AI-enabled applications.</p><div className="mt-7 flex flex-wrap justify-center gap-2"><ContactChip href={`mailto:${profile.email}`} icon={<Mail/>}>{profile.email}</ContactChip><ContactChip href={profile.github} icon={<Github/>}>GitHub</ContactChip><ContactChip href={profile.linkedin} icon={<Linkedin/>}>LinkedIn</ContactChip><ContactChip href={profile.leetcode}>LeetCode</ContactChip></div></div></section>
    </main>

    <footer className="border-t border-black/10 px-5 py-8 sm:px-12 lg:px-16"><div className="flex flex-col justify-between gap-2 sm:flex-row"><p className="font-mono text-xs text-[#9C968A]">Anuraj Singh · BCA · Software Development</p><p className="font-mono text-xs text-[#9C968A]">Available for opportunities · © 2026</p></div><div className="mt-7 font-display text-8xl leading-none tracking-[.05em]">AS</div></footer>
  </div>
}

function Divider(){return <div className="mx-5 h-px bg-black/10 sm:mx-12 lg:mx-16"/>}
function InfoCard({title,children}){return <div className="info-card reveal rounded-2xl border border-black/10 bg-white p-7"><h3 className="font-display text-3xl">{title}</h3><div className="mt-5 space-y-5 text-sm leading-6 text-[#6B665C]">{children}</div></div>}
