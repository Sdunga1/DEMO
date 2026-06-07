import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  Code2,
  Cpu,
  Crown,
  Diamond,
  Fingerprint,
  Globe2,
  Layers3,
  Linkedin,
  Menu,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import './styles.css';
import backgroundImage from '../background_image.jpeg';

const archetypes = [
  {
    title: 'Founding Engineer',
    group: 'Engineering',
    icon: Code2,
    body:
      '0-to-1 builders who architect, ship, and scale core infrastructure from day one. The ones who make the first million lines matter.',
    tags: ['Backend', 'Full-Stack', 'Systems'],
  },
  {
    title: 'AI Engineer',
    group: 'AI / ML',
    icon: BrainCircuit,
    body:
      'LLM specialists, RAG architects, and model optimisers. Deep on transformers, fine-tuning, and production-grade inference pipelines.',
    tags: ['LLMs', 'MLOps', 'RAG'],
  },
  {
    title: 'Forward Deployed Engineer',
    group: 'Hybrid',
    icon: Cpu,
    body:
      'Customer-facing engineers who integrate complex systems directly into enterprise workflows. Technical credibility meets commercial intuition.',
    tags: ['Customer Eng.', 'Integration', 'Enterprise'],
  },
  {
    title: 'Founding GTM',
    group: 'Commercial',
    icon: BriefcaseBusiness,
    body:
      'Commercial leaders who understand technical products and build the revenue engine from scratch. Pipeline, ICP, and playbooks from zero.',
    tags: ['Sales', 'Partnerships', 'Revenue'],
  },
  {
    title: 'Chief of Staff',
    group: 'Operations',
    icon: Layers3,
    body:
      "The founder's right hand. Translates vision into execution across every function, from OKRs to board prep to hiring sprints.",
    tags: ['Strategy', 'Ops', 'Leadership'],
  },
  {
    title: 'Executives',
    group: 'Leadership',
    icon: Crown,
    body:
      "VP- and C-level operators who've scaled before. Whether it is VP Eng, CTO, VP Sales or CPO, we find proven leaders who thrive in ambiguity.",
    tags: ['CTO', 'VP Eng', 'CPO'],
  },
];

const proofPoints = [
  ['VC-backed', 'Founders Fund, Sequoia, a16z, YC'],
  ['Geographies', 'United States, Germany, India'],
  ['Candidate source', 'Private operator and alumni networks'],
  ['Search style', 'Few companies at a time, deep on every role'],
];

const founderChecks = [
  'Deep technical vetting, not just CV screening',
  '0-to-1 startup DNA confirmed',
  'US · Germany · India',
];

const talentChecks = [
  'Exclusive stealth-mode roles',
  'Direct access to technical founders',
  'Equity-heavy, high-impact positions',
];

const theatreSteps = [
  ['01', 'Map private channels', 'Founder circles, operator communities, alumni graphs, and quiet technical networks.'],
  ['02', 'Read intent signals', 'We track mission fit, timing, compensation range, relocation appetite, and founder pull.'],
  ['03', 'Deliver the shortlist', 'Only candidates with the right slope, context, and conviction make it to the founder call.'],
];

const founderBrief = [
  ['Search depth', 'Private communities and founder referrals'],
  ['Candidate state', 'Mostly passive, mission-movable talent'],
  ['First slate', 'High-conviction profiles, not resumes'],
];

const talentBrief = [
  ['Access', 'Direct founder conversations'],
  ['Roles', 'Stealth, equity-heavy, high-impact'],
  ['Process', 'No ghosting, no keyword filters'],
];

function NetworkCanvas() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frame = 0;
    let raf;
    let width = 0;
    let height = 0;
    let points = [];

    const makePoints = () => {
      const count = Math.min(110, Math.max(54, Math.floor((width * height) / 18000)));
      points = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        size: index % 5 === 0 ? 2.2 : 1.25 + Math.random() * 1.3,
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makePoints();
    };

    const onMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = event.clientX - rect.left;
      mouse.current.y = event.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };

    const draw = () => {
      frame += 0.006;
      ctx.clearRect(0, 0, width, height);
      const gradient = ctx.createRadialGradient(width * 0.54, height * 0.16, 40, width * 0.5, height * 0.28, width * 0.82);
      gradient.addColorStop(0, 'rgba(98, 146, 255, 0.16)');
      gradient.addColorStop(0.46, 'rgba(163, 133, 255, 0.07)');
      gradient.addColorStop(1, 'rgba(4, 6, 12, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      points.forEach((point) => {
        const mouseDx = point.x - mouse.current.x;
        const mouseDy = point.y - mouse.current.y;
        const mouseDistance = Math.hypot(mouseDx, mouseDy);

        if (mouseDistance < 140) {
          const push = (140 - mouseDistance) / 140;
          point.x += (mouseDx / Math.max(mouseDistance, 1)) * push * 0.55;
          point.y += (mouseDy / Math.max(mouseDistance, 1)) * push * 0.55;
        }

        point.x += point.vx;
        point.y += point.vy + Math.sin(frame + point.pulse) * 0.025;

        if (point.x < -20) point.x = width + 20;
        if (point.x > width + 20) point.x = -20;
        if (point.y < -20) point.y = height + 20;
        if (point.y > height + 20) point.y = -20;
      });

      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const a = points[i];
          const b = points[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < 142) {
            const opacity = ((142 - distance) / 142) * 0.2;
            ctx.strokeStyle = `rgba(112, 141, 205, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      points.forEach((point) => {
        const glow = 0.55 + Math.sin(frame * 4 + point.pulse) * 0.25;
        ctx.fillStyle = `rgba(124, 166, 255, ${0.34 + glow * 0.24})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="network-canvas" aria-hidden="true" />;
}

function MagneticButton({ children, href, variant = 'primary', icon = true }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 16, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 180, damping: 16, mass: 0.45 });

  const onMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.14);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
  };

  return (
    <motion.a
      className={`magnetic-button ${variant}`}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.97 }}
    >
      <span>{children}</span>
      {icon && <ArrowRight size={18} strokeWidth={2.4} />}
    </motion.a>
  );
}

function CodeWindow() {
  const lines = [
    ['comment', '// Employia talent engine'],
    ['space', ''],
    ['keyword', 'async function findEngineers(query: SearchQuery) {'],
    ['plain', '  const networks = ['],
    ['string', '    "ex-FAANG private channels",'],
    ['string', '    "stealth-mode referrals",'],
    ['string', '    "YC/a16z alumni nets"'],
    ['plain', '  ];'],
    ['space', ''],
    ['plain', '  const candidates = await'],
    ['accent', '    deepSearch(networks, {'],
    ['string', '      role: "Founding Engineer",'],
    ['plain', '      markets: ["SF", "BLR", "BER"],'],
    ['plain', '      topPercentile: 1'],
    ['accent', '    });'],
    ['space', ''],
    ['keyword', '  return rankByImpact(candidates);'],
    ['plain', '}'],
    ['space', ''],
    ['comment', '// -> 3 vetted profiles in <10 days'],
  ];

  return (
    <motion.div
      className="code-window parallax-card"
      initial={{ opacity: 0, y: 40, rotateX: 9 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="window-bar">
        <span className="dot red" />
        <span className="dot yellow" />
        <span className="dot blue" />
        <strong>talent.search.ts</strong>
      </div>
      <div className="code-body">
        <div className="scanline" />
        {lines.map(([type, text], index) => (
          <div className={`code-line ${type}`} key={`${text}-${index}`}>
            {text || '\u00A0'}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function RoleCard({ role, index, progress }) {
  const Icon = role.icon;
  const prefersReducedMotion = useReducedMotion();
  const easedProgress = useSpring(progress, { stiffness: 58, damping: 22, mass: 0.95 });
  const pyramid = [
    { x: 150, y: 210, scale: 0.9, rotate: -3.4 },
    { x: -150, y: 210, scale: 0.9, rotate: 3.4 },
    { x: 74, y: 122, scale: 0.94, rotate: -1.9 },
    { x: -74, y: 122, scale: 0.94, rotate: 1.9 },
    { x: 26, y: 34, scale: 0.98, rotate: -0.8 },
    { x: -26, y: 34, scale: 0.98, rotate: 0.8 },
  ];
  const start = pyramid[index] || pyramid[0];
  const x = useTransform(easedProgress, [0, 1], [start.x, 0]);
  const y = useTransform(easedProgress, [0, 1], [start.y, 0]);
  const scale = useTransform(easedProgress, [0, 1], [start.scale, 1]);
  const rotate = useTransform(easedProgress, [0, 1], [start.rotate, 0]);
  const opacity = useTransform(easedProgress, [0, 0.35, 1], [0.48, 0.82, 1]);

  return (
    <motion.article
      className="role-card"
      style={prefersReducedMotion ? undefined : { x, y, scale, rotate, opacity }}
    >
      <div className="role-top">
        <span className="role-icon">
          <Icon size={22} />
        </span>
        <span>{role.group}</span>
      </div>
      <h3>{role.title}</h3>
      <p>{role.body}</p>
      <div className="tag-row">
        {role.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </motion.article>
  );
}

function RolesShowcase() {
  const rolesRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: rolesRef, offset: ['start 90%', 'end 58%'] });

  return (
    <section className="roles-section" id="roles" ref={rolesRef}>
      <SectionIntro
        eyebrow="What We Place"
        title="The Archetypes We Recruit"
        text="We do not do generic recruiting. We specialise in the high-leverage roles that determine whether an early-stage company succeeds."
      />
      <div className="role-grid" aria-label="Recruiting archetypes">
        {archetypes.map((role, index) => (
          <RoleCard role={role} index={index} progress={scrollYProgress} key={role.title} />
        ))}
      </div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, text }) {
  return (
    <motion.div
      className="section-intro"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </motion.div>
  );
}

function SearchTheatre() {
  const theatreRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: theatreRef, offset: ['start end', 'end start'] });
  const leftY = useTransform(scrollYProgress, [0, 1], [140, -170]);
  const rightY = useTransform(scrollYProgress, [0, 1], [-90, 150]);
  const centerScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1.04, 0.96]);
  const beamRotate = useTransform(scrollYProgress, [0, 1], [-8, 9]);

  return (
    <section className="theatre-section" ref={theatreRef} aria-label="Employia search process">
      <div className="theatre-sticky">
        <motion.div className="theatre-copy" style={{ y: leftY }}>
          <span className="eyebrow">How We Search</span>
          <h2>Every search moves through hidden networks before it reaches a job board.</h2>
          <p>
            Employia runs a high-context search motion across founders, alumni graphs, private operator
            communities, and passive technical leaders who move only when the mission is precise.
          </p>
        </motion.div>

        <motion.div className="theatre-orbit" style={{ scale: centerScale }}>
          <motion.div className="theatre-beam" style={{ rotate: beamRotate }} />
          <div className="theatre-core">
            <Diamond size={28} />
            <span>Top 1%</span>
            <strong>builder signal</strong>
          </div>
          <div className="candidate-card card-a">
            <span>Founding Engineer</span>
            <strong>0-to-1 infra lead</strong>
            <small>Passive · founder referred</small>
          </div>
          <div className="candidate-card card-b">
            <span>AI Engineer</span>
            <strong>LLM systems builder</strong>
            <small>Private alumni channel</small>
          </div>
          <div className="candidate-card card-c">
            <span>Operator</span>
            <strong>Chief of Staff</strong>
            <small>Scaleup execution DNA</small>
          </div>
        </motion.div>

        <motion.div className="theatre-steps" style={{ y: rightY }}>
          {theatreSteps.map(([number, title, body]) => (
            <article key={title}>
              <span>{number}</span>
              <strong>{title}</strong>
              <p>{body}</p>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SplitPanel({ id, label, title, body, checks, cta, brief, reverse = false }) {
  return (
    <section className={`split-section ${reverse ? 'reverse' : ''}`} id={id}>
      <motion.div
        className="split-copy"
        initial={{ opacity: 0, x: reverse ? 36 : -36 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-120px' }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="eyebrow">{label}</span>
        <h2>{title}</h2>
        <p>{body}</p>
        <ul className="check-list">
          {checks.map((check, index) => (
            <li key={check}>
              {reverse ? <ArrowRight size={18} /> : <Check size={18} />}
              <span>{check}</span>
            </li>
          ))}
        </ul>
        <MagneticButton href="#contact">{cta}</MagneticButton>
      </motion.div>

      <motion.div
        className="brief-stack"
        initial={{ opacity: 0, x: reverse ? -36 : 36 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-120px' }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        {brief.map(([metric, value], index) => (
          <article key={metric} className={`brief-card card-${index + 1}`}>
            <span>{metric}</span>
            <strong>{value}</strong>
          </article>
        ))}
        <div className="brief-seal">
          {reverse ? <Users size={22} /> : <Fingerprint size={22} />}
          <span>{reverse ? 'Talent-first introductions' : 'Confidential founder search'}</span>
        </div>
      </motion.div>
    </section>
  );
}

function CookieBanner() {
  const [visible, setVisible] = useState(() => localStorage.getItem('employia-cookie-choice') !== 'set');
  if (!visible) return null;

  const choose = () => {
    localStorage.setItem('employia-cookie-choice', 'set');
    setVisible(false);
  };

  return (
    <motion.div
      className="cookie-banner"
      initial={{ y: 90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <p>
        We use cookies on our website to see how you interact with it. By accepting, you agree to our use of
        such cookies. <a href="#privacy">Privacy Policy</a>
      </p>
      <div className="cookie-actions">
        <button type="button" onClick={choose}>
          Decline
        </button>
        <button type="button" className="accept" onClick={choose}>
          Accept
        </button>
      </div>
    </motion.div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const mainRef = useRef(null);
  const introRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: mainRef, offset: ['start start', 'end start'] });
  const { scrollYProgress: introProgress } = useScroll({ target: introRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 0.55], [0, 260]);
  const heroScale = useTransform(scrollYProgress, [0, 0.42], [1, 0.94]);
  const codeY = useTransform(scrollYProgress, [0, 0.5], [0, -150]);
  const haloY = useTransform(scrollYProgress, [0, 0.55], [0, 360]);
  const cinematicScale = useTransform(introProgress, [0, 1], [1.08, 1.42]);
  const cinematicRotate = useTransform(introProgress, [0, 1], [-2.4, 6.5]);
  const cinematicX = useTransform(introProgress, [0, 1], [0, -58]);
  const cinematicY = useTransform(introProgress, [0, 1], [0, 96]);
  const cinematicOpacity = useTransform(introProgress, [0, 0.72, 1], [0.82, 0.72, 0]);

  return (
    <div className="site-shell" ref={mainRef}>
      <NetworkCanvas />
      <motion.div className="ambient-halo" style={{ y: haloY }} aria-hidden="true" />

      <header className="nav-wrap">
        <a className="brand" href="#top" aria-label="Employia home">
          EMPLOYIA
        </a>
        <nav className={menuOpen ? 'open' : ''} aria-label="Primary navigation">
          <a href="#roles" onClick={() => setMenuOpen(false)}>
            Roles
          </a>
          <a href="#founders" onClick={() => setMenuOpen(false)}>
            Founders
          </a>
          <a href="#talent" onClick={() => setMenuOpen(false)}>
            Talent
          </a>
          <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>
            Book a Call <ArrowRight size={17} />
          </a>
        </nav>
        <button className="menu-button" type="button" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main>
        <div className="intro-cinema" ref={introRef}>
          <motion.div
            className="cinematic-bg"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              opacity: cinematicOpacity,
              rotate: cinematicRotate,
              scale: cinematicScale,
              x: cinematicX,
              y: cinematicY,
            }}
            aria-hidden="true"
          />
          <div className="cinematic-lines" aria-hidden="true">
            <span className="cinematic-line line-a" />
            <span className="cinematic-line line-b" />
            <span className="cinematic-line line-c" />
            <span className="cinematic-line line-d" />
            <span className="cinematic-line line-e" />
            <span className="cinematic-line line-f" />
          </div>

          <section className="hero-section" id="top">
            <motion.div className="hero-copy" style={{ y: heroY, scale: heroScale }}>
              <motion.span
                className="hero-kicker"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
            >
              VC-backed startups, scaleups, and frontier teams
            </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.92, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                We find the builders who define the future.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.82, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                Building the teams behind tomorrow&apos;s breakthroughs. We go beyond job boards to surface the
                engineers and operators most companies never reach.
              </motion.p>
              <motion.div
                className="hero-actions"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.82, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                <MagneticButton href="#founders">Hire Top Talent</MagneticButton>
                <MagneticButton href="#talent" variant="secondary">
                  Join the Network
                </MagneticButton>
              </motion.div>
            </motion.div>

            <motion.div className="hero-visual" style={{ y: codeY }}>
              <CodeWindow />
              <div className="orbit-card upper">
                <Globe2 size={18} />
                <span>US · Germany · India</span>
              </div>
              <div className="orbit-card lower">
                <ShieldCheck size={18} />
                <span>Passive talent, vetted deeply</span>
              </div>
            </motion.div>
          </section>

          <section className="proof-band" aria-label="Employia proof points">
            <div className="proof-track">
              {[...proofPoints, ...proofPoints].map(([label, value], index) => (
                <div className="proof-item" key={`${label}-${index}`} aria-hidden={index >= proofPoints.length}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </section>
        </div>

        <RolesShowcase />

        <SearchTheatre />

        <SplitPanel
          id="founders"
          label="For Founders"
          title="Your biggest bottleneck is not capital. It is people."
          body="We go beyond LinkedIn. Our sourcing runs through private communities, ex-FAANG networks, founder referrals, and operator circles, finding candidates who are not looking but will move for the right mission."
          checks={founderChecks}
          brief={founderBrief}
          cta="Book a Strategy Call"
        />

        <SplitPanel
          id="talent"
          label="For Top Talent"
          title="Stop applying. Start being found."
          body="We bypass the HR firewall and put you directly in front of technical founders building the most exciting AI products globally. No ghosting, no keyword bots."
          checks={talentChecks}
          brief={talentBrief}
          cta="Join the Network"
          reverse
        />

        <section className="quote-section">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <blockquote>
              The hard thing is hiring the people who can actually build that dream.
            </blockquote>
            <p>Inspired by Ben Horowitz, The Hard Thing About Hard Things</p>
            <strong>That is the hard thing we solve.</strong>
          </motion.div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-copy">
            <span className="eyebrow">Get in touch</span>
            <h2>We work with a select number of companies at any given time.</h2>
            <p>If you are building something that matters, let&apos;s talk.</p>
          </div>
          <div className="contact-actions">
            <MagneticButton href="mailto:hello@employia.de">Book a Call</MagneticButton>
            <a className="linkedin-link" href="https://www.linkedin.com/company/employia/" target="_blank" rel="noreferrer">
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div>
          <a className="brand footer-brand" href="#top">
            EMPLOYIA
          </a>
          <p>The talent network for the world&apos;s most ambitious tech companies.</p>
        </div>
        <div className="footer-links">
          <a href="#founders">Founders</a>
          <a href="#roles">Hire Top 1%</a>
          <a href="#roles">Open Archetypes</a>
          <a href="#talent">Talent</a>
          <a href="#talent">Join Network</a>
          <a href="#roles">See Roles</a>
        </div>
        <div className="trust-lines">
          <span>heyData GDPR seal</span>
          <span>Mitglied im Bitmi - Bundesverband IT-Mittelstand e.V.</span>
        </div>
        <div className="legal-row">
          <a href="#imprint">Imprint</a>
          <a href="#privacy">Privacy Policy</a>
          <span>© 2026 Employia. Built for the frontier.</span>
        </div>
      </footer>

      <CookieBanner />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
