import { useState, useEffect, useRef } from "react";
import { ArrowRight, Zap, Target, Brain, Calendar, ChevronDown, Plus, Minus, Mail, Phone, Globe, Users, Building2, Code2, Package } from "lucide-react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0,1&family=Inter:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: hsl(222, 47%, 4%);
    --fg: hsl(0, 0%, 98%);
    --muted: hsl(222, 20%, 12%);
    --muted-fg: hsl(215, 20%, 70%);
    --primary: hsl(0, 0%, 98%);
    --primary-fg: hsl(222, 47%, 4%);
    --accent: hsl(239, 84%, 67%);
    --border: hsl(222, 18%, 18%);
    --ring: hsl(239, 84%, 67%);
    --radius: 1rem;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--fg);
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  .serif { font-family: 'Instrument Serif', serif; }
  .serif-italic { font-family: 'Instrument Serif', serif; font-style: italic; }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

  /* ── Canvas BG ── */
  .hero-canvas {
    position: absolute; inset: 0; overflow: hidden; pointer-events: none;
  }

  /* ── Orbs ── */
  .orb {
    position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.18;
    animation: orbFloat 12s ease-in-out infinite alternate;
  }
  .orb-1 { width: 600px; height: 600px; background: radial-gradient(circle, hsl(239,84%,67%) 0%, transparent 70%); top: -200px; left: -100px; animation-duration: 14s; }
  .orb-2 { width: 500px; height: 500px; background: radial-gradient(circle, hsl(200,80%,60%) 0%, transparent 70%); top: 100px; right: -150px; animation-duration: 18s; animation-delay: -6s; }
  .orb-3 { width: 350px; height: 350px; background: radial-gradient(circle, hsl(280,70%,65%) 0%, transparent 70%); bottom: -50px; left: 30%; animation-duration: 20s; animation-delay: -10s; }

  @keyframes orbFloat {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(40px, 30px) scale(1.08); }
  }

  /* ── Grid ── */
  .grid-bg {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 60px 60px;
    animation: gridDrift 30s linear infinite;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
  }
  @keyframes gridDrift {
    0%   { transform: translate(0, 0); }
    100% { transform: translate(60px, 60px); }
  }

  /* ── Particles ── */
  .particle {
    position: absolute; border-radius: 50%;
    animation: particleFly linear infinite;
    pointer-events: none;
  }
  @keyframes particleFly {
    0%   { transform: translateY(0) translateX(0); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 0.6; }
    100% { transform: translateY(-100vh) translateX(var(--dx, 30px)); opacity: 0; }
  }

  /* ── Light streak ── */
  .streak {
    position: absolute; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    animation: streakSlide 6s ease-in-out infinite;
    transform-origin: left;
  }
  @keyframes streakSlide {
    0%   { transform: scaleX(0) translateX(-100%); opacity: 0; }
    40%  { opacity: 1; }
    100% { transform: scaleX(1) translateX(0); opacity: 0; }
  }

  /* ── Navbar ── */
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2.5rem; height: 64px;
    background: rgba(7,10,22,0.55);
    backdrop-filter: blur(20px) saturate(180%);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    transition: all 0.3s ease;
  }
  .navbar.scrolled {
    background: rgba(7,10,22,0.88);
    box-shadow: 0 4px 40px rgba(0,0,0,0.5);
  }
  .nav-logo {
    display: flex; align-items: center; gap: 0.5rem;
    font-family: 'Instrument Serif', serif; font-size: 1.4rem; letter-spacing: 0.02em;
    color: var(--fg);
  }
  .logo-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 10px var(--accent), 0 0 20px var(--accent);
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 10px var(--accent), 0 0 20px var(--accent); transform: scale(1); }
    50% { box-shadow: 0 0 16px var(--accent), 0 0 32px var(--accent); transform: scale(1.2); }
  }
  .nav-links { display: flex; gap: 2rem; }
  .nav-link {
    color: var(--muted-fg); font-size: 0.875rem; font-weight: 500;
    text-decoration: none; letter-spacing: 0.02em;
    transition: color 0.2s;
  }
  .nav-link:hover { color: var(--fg); }
  .nav-cta {
    background: transparent; border: 1px solid rgba(255,255,255,0.15);
    color: var(--fg); padding: 0.5rem 1.25rem; border-radius: 2rem;
    font-size: 0.85rem; font-weight: 500; cursor: pointer; letter-spacing: 0.02em;
    transition: all 0.3s;
    box-shadow: 0 0 0 0 rgba(99,102,241,0);
  }
  .nav-cta:hover {
    background: rgba(99,102,241,0.12);
    border-color: rgba(99,102,241,0.5);
    box-shadow: 0 0 20px rgba(99,102,241,0.2);
  }

  /* ── Hero ── */
  .hero {
    position: relative; min-height: 100vh;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; padding: 6rem 2rem 4rem;
    overflow: hidden;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.3);
    color: hsl(239,84%,80%); padding: 0.4rem 1rem; border-radius: 2rem;
    font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
    margin-bottom: 2.5rem;
    animation: fadeUp 0.8s ease 0.2s both;
  }
  .hero-badge-dot {
    width: 6px; height: 6px; border-radius: 50%; background: var(--accent);
    animation: pulse 1.5s ease-in-out infinite;
  }
  .hero-h1 {
    font-family: 'Instrument Serif', serif;
    font-size: clamp(3rem, 7vw, 6.5rem);
    line-height: 1.05; letter-spacing: -0.02em;
    color: var(--fg); margin-bottom: 1.75rem;
    animation: fadeUp 0.8s ease 0.4s both;
  }
  .hero-h1 em { font-style: italic; color: hsl(239,84%,80%); }
  .hero-sub {
    max-width: 600px; font-size: 1.125rem; line-height: 1.7;
    color: var(--muted-fg); margin: 0 auto 3rem;
    animation: fadeUp 0.8s ease 0.6s both;
  }
  .hero-actions {
    display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;
    animation: fadeUp 0.8s ease 0.8s both;
  }
  .btn-primary {
    display: flex; align-items: center; gap: 0.5rem;
    background: var(--fg); color: var(--primary-fg);
    padding: 0.875rem 2rem; border-radius: 2rem;
    font-size: 0.9rem; font-weight: 600; cursor: pointer; border: none;
    letter-spacing: 0.01em; transition: all 0.3s;
    box-shadow: 0 4px 20px rgba(255,255,255,0.1);
  }
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(255,255,255,0.15);
  }
  .btn-secondary {
    display: flex; align-items: center; gap: 0.5rem;
    background: transparent; color: var(--fg);
    padding: 0.875rem 2rem; border-radius: 2rem;
    font-size: 0.9rem; font-weight: 500; cursor: pointer;
    border: 1px solid var(--border); letter-spacing: 0.01em;
    transition: all 0.3s;
  }
  .btn-secondary:hover {
    background: rgba(255,255,255,0.04);
    border-color: rgba(255,255,255,0.25);
    transform: translateY(-2px);
  }

  /* ── Hero Visual ── */
  .hero-visual {
    position: relative; margin-top: 5rem; width: 100%; max-width: 900px;
    animation: fadeUp 1s ease 1s both;
  }
  .ai-operator {
    position: relative; background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08); border-radius: 1.5rem;
    padding: 2.5rem; backdrop-filter: blur(20px);
    box-shadow: 0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08);
    overflow: hidden;
  }
  .ai-operator::before {
    content: ''; position: absolute; inset: 0; border-radius: inherit;
    background: radial-gradient(ellipse at 30% 0%, rgba(99,102,241,0.08) 0%, transparent 60%);
    pointer-events: none;
  }
  .op-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 2rem;
  }
  .op-title {
    font-size: 0.7rem; font-weight: 600; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--accent);
    display: flex; align-items: center; gap: 0.5rem;
  }
  .op-live {
    display: flex; align-items: center; gap: 0.4rem;
    font-size: 0.65rem; font-weight: 600; letter-spacing: 0.08em;
    color: hsl(142,70%,60%); text-transform: uppercase;
  }
  .live-dot {
    width: 6px; height: 6px; border-radius: 50%; background: hsl(142,70%,60%);
    animation: blink 1.2s ease-in-out infinite;
  }
  @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.3;} }

  .pipeline {
    display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.75rem;
    position: relative;
  }
  .pipe-step {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08); border-radius: 0.75rem;
    padding: 1rem 0.75rem; text-align: center; position: relative;
    transition: all 0.3s;
    animation: pipeIn 0.5s ease both;
  }
  .pipe-step:hover {
    background: rgba(255,255,255,0.07);
    border-color: rgba(99,102,241,0.3);
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.3);
  }
  .pipe-step.active {
    border-color: rgba(99,102,241,0.5);
    background: rgba(99,102,241,0.08);
    box-shadow: 0 0 20px rgba(99,102,241,0.15);
  }
  .pipe-icon { font-size: 1.25rem; margin-bottom: 0.4rem; }
  .pipe-label { font-size: 0.6rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted-fg); line-height: 1.3; }
  .pipe-value { font-size: 0.75rem; font-weight: 600; color: var(--fg); margin-top: 0.25rem; }

  .pipe-connector {
    position: absolute; top: 50%; right: -0.4rem; z-index: 1;
    width: 0.8rem; height: 2px;
    background: linear-gradient(90deg, rgba(99,102,241,0.6), rgba(99,102,241,0.2));
  }
  .connector-pulse {
    position: absolute; top: 50%; right: -0.6rem;
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent); transform: translateY(-50%);
    animation: connPulse 2s ease-in-out infinite;
  }
  @keyframes connPulse {
    0%,100%{opacity:0.3; transform:translateY(-50%) scale(0.8);}
    50%{opacity:1; transform:translateY(-50%) scale(1.3);}
  }

  .meeting-booked {
    margin-top: 1.5rem; padding: 1rem 1.5rem;
    background: rgba(99,102,241,0.08); border: 1px solid rgba(99,102,241,0.25);
    border-radius: 0.75rem; display: flex; align-items: center; justify-content: space-between;
    animation: glow 3s ease-in-out infinite;
  }
  @keyframes glow {
    0%,100%{ box-shadow: 0 0 20px rgba(99,102,241,0.1); }
    50%{ box-shadow: 0 0 40px rgba(99,102,241,0.25); }
  }
  .booked-info { display: flex; flex-direction: column; gap: 0.2rem; }
  .booked-label { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); }
  .booked-name { font-size: 0.9rem; font-weight: 600; color: var(--fg); }
  .booked-meta { font-size: 0.7rem; color: var(--muted-fg); }
  .booked-check {
    width: 36px; height: 36px; border-radius: 50%;
    background: rgba(99,102,241,0.2); border: 1px solid rgba(99,102,241,0.4);
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem;
    animation: checkSpin 0.5s ease 1.5s both;
  }
  @keyframes checkSpin { from{transform:scale(0) rotate(-90deg);} to{transform:scale(1) rotate(0);} }

  /* ── Scroll arrow ── */
  .scroll-hint {
    position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
    color: var(--muted-fg); font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;
    animation: fadeIn 1s ease 2s both;
  }
  .scroll-arrow { animation: scrollBounce 2s ease-in-out infinite; }
  @keyframes scrollBounce { 0%,100%{transform:translateY(0);} 50%{transform:translateY(5px);} }

  /* ── Section shell ── */
  .section { padding: 8rem 2rem; position: relative; }
  .section-inner { max-width: 1100px; margin: 0 auto; }

  .section-label {
    font-size: 0.7rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 1rem;
  }
  .section-h2 {
    font-family: 'Instrument Serif', serif;
    font-size: clamp(2rem, 4vw, 3.5rem);
    line-height: 1.1; letter-spacing: -0.02em; color: var(--fg);
  }
  .section-h2 em { font-style: italic; }
  .section-sub {
    font-size: 1.05rem; color: var(--muted-fg); line-height: 1.7; margin-top: 1rem;
    max-width: 540px;
  }

  /* ── Problem ── */
  .problem-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem; margin-top: 4rem;
  }
  .problem-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07); border-radius: var(--radius);
    padding: 1.75rem; position: relative; overflow: hidden;
    transition: all 0.3s; cursor: default;
  }
  .problem-card:hover {
    background: rgba(255,50,50,0.06);
    border-color: rgba(255,80,80,0.25);
    transform: translateY(-4px);
  }
  .problem-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, hsl(0,80%,60%), transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .problem-card:hover::before { opacity: 1; }
  .problem-icon { font-size: 1.5rem; margin-bottom: 0.75rem; }
  .problem-title { font-size: 0.9rem; font-weight: 600; color: var(--fg); margin-bottom: 0.5rem; }
  .problem-desc { font-size: 0.8rem; color: var(--muted-fg); line-height: 1.5; }
  .problem-pain {
    position: absolute; bottom: 0.75rem; right: 0.75rem;
    font-size: 0.6rem; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; color: hsl(0,70%,60%); opacity: 0.7;
  }

  /* ── Solution ── */
  .solution-bg {
    position: absolute; inset: 0; overflow: hidden; pointer-events: none;
    background: radial-gradient(ellipse 60% 40% at 50% 50%, rgba(99,102,241,0.05) 0%, transparent 70%);
  }
  .feature-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.25rem; margin-top: 4rem;
  }
  .feature-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.07); border-radius: var(--radius);
    padding: 2rem; position: relative; overflow: hidden;
    transition: all 0.4s; cursor: default;
    backdrop-filter: blur(10px);
  }
  .feature-card:hover {
    background: rgba(99,102,241,0.06);
    border-color: rgba(99,102,241,0.3);
    transform: translateY(-6px);
    box-shadow: 0 24px 60px rgba(0,0,0,0.4), 0 0 40px rgba(99,102,241,0.08);
  }
  .feature-card::after {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(circle at 0% 0%, rgba(99,102,241,0.08) 0%, transparent 50%);
    opacity: 0; transition: opacity 0.4s; border-radius: inherit;
  }
  .feature-card:hover::after { opacity: 1; }
  .feature-num {
    font-family: 'Instrument Serif', serif; font-size: 2.5rem; font-style: italic;
    color: rgba(99,102,241,0.2); margin-bottom: 0.75rem; line-height: 1;
  }
  .feature-title { font-size: 1rem; font-weight: 700; color: var(--fg); margin-bottom: 0.5rem; }
  .feature-desc { font-size: 0.85rem; color: var(--muted-fg); line-height: 1.6; }
  .feature-pulse {
    position: absolute; top: 1.25rem; right: 1.25rem;
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 0 0 rgba(99,102,241,0.4);
    animation: featurePulse 2.5s ease-in-out infinite;
  }
  @keyframes featurePulse {
    0%{ box-shadow: 0 0 0 0 rgba(99,102,241,0.4); }
    70%{ box-shadow: 0 0 0 12px rgba(99,102,241,0); }
    100%{ box-shadow: 0 0 0 0 rgba(99,102,241,0); }
  }
  .intelligence-banner {
    margin-top: 3rem; padding: 1.75rem 2.5rem;
    border: 1px solid rgba(99,102,241,0.25);
    border-radius: var(--radius); text-align: center;
    background: linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(99,102,241,0.02) 100%);
    font-family: 'Instrument Serif', serif; font-size: 1.6rem; font-style: italic;
    color: var(--fg); letter-spacing: -0.01em;
    position: relative; overflow: hidden;
  }
  .intelligence-banner::before {
    content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(99,102,241,0.05), transparent);
    animation: shimmer 4s ease-in-out infinite;
  }
  @keyframes shimmer { 0%{left:-100%;} 100%{left:100%;} }

  /* ── Comparison ── */
  .comparison-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 4rem;
  }
  .comp-panel {
    border-radius: var(--radius); padding: 2.5rem; position: relative; overflow: hidden;
  }
  .comp-panel.old {
    background: rgba(255,50,50,0.04);
    border: 1px solid rgba(255,80,80,0.15);
  }
  .comp-panel.new {
    background: rgba(99,102,241,0.05);
    border: 1px solid rgba(99,102,241,0.25);
  }
  .comp-header { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 1.5rem; }
  .comp-panel.old .comp-header { color: hsl(0,70%,60%); }
  .comp-panel.new .comp-header { color: var(--accent); }
  .comp-flow { display: flex; flex-direction: column; gap: 0.75rem; }
  .comp-node {
    display: flex; align-items: flex-start; gap: 0.75rem;
    padding: 0.75rem 1rem; border-radius: 0.5rem;
    font-size: 0.82rem; line-height: 1.4;
  }
  .comp-panel.old .comp-node { background: rgba(255,80,80,0.06); color: hsl(0,30%,75%); }
  .comp-panel.new .comp-node { background: rgba(99,102,241,0.07); color: hsl(239,30%,85%); }
  .comp-node-icon { font-size: 0.9rem; flex-shrink: 0; margin-top: 0.05rem; }
  .comp-arrow {
    display: flex; align-items: center; justify-content: center;
    height: 1.5rem; opacity: 0.35; font-size: 0.7rem; letter-spacing: 0.05em; color: var(--muted-fg);
  }
  .comp-result {
    margin-top: 1.25rem; padding: 1rem 1.25rem;
    border-radius: 0.5rem; font-size: 0.85rem; font-weight: 600;
  }
  .comp-panel.old .comp-result { background: rgba(255,80,80,0.1); color: hsl(0,60%,65%); }
  .comp-panel.new .comp-result { background: rgba(99,102,241,0.12); color: hsl(239,84%,80%); }

  /* ── Who It's For ── */
  .who-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.25rem; margin-top: 4rem;
  }
  .who-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.07); border-radius: var(--radius);
    padding: 2rem 1.75rem; transition: all 0.35s; cursor: default;
    position: relative; overflow: hidden;
  }
  .who-card:hover {
    background: rgba(255,255,255,0.05);
    border-color: rgba(255,255,255,0.15);
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
  }
  .who-icon {
    width: 44px; height: 44px; border-radius: 0.75rem;
    background: rgba(99,102,241,0.12); border: 1px solid rgba(99,102,241,0.25);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1rem; color: var(--accent);
  }
  .who-title { font-size: 1rem; font-weight: 700; color: var(--fg); margin-bottom: 0.5rem; }
  .who-desc { font-size: 0.82rem; color: var(--muted-fg); line-height: 1.55; }

  /* ── How It Works ── */
  .hiw-section { background: rgba(255,255,255,0.01); }
  .hiw-flow {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;
    margin-top: 4rem; position: relative;
  }
  .hiw-flow::before {
    content: ''; position: absolute; top: 2.5rem; left: 10%; right: 10%; height: 1px;
    background: linear-gradient(90deg, transparent, var(--border), transparent);
  }
  .hiw-step {
    display: flex; flex-direction: column; align-items: center; text-align: center;
    padding: 2rem 1rem; position: relative;
  }
  .hiw-num {
    width: 44px; height: 44px; border-radius: 50%;
    border: 1px solid var(--border); display: flex; align-items: center;
    justify-content: center; font-size: 0.8rem; font-weight: 700;
    color: var(--muted-fg); margin-bottom: 1.25rem; position: relative; z-index: 1;
    background: var(--bg);
    transition: all 0.3s;
  }
  .hiw-step:last-child .hiw-num {
    border-color: rgba(99,102,241,0.5);
    background: rgba(99,102,241,0.12);
    color: var(--accent);
    box-shadow: 0 0 24px rgba(99,102,241,0.3);
  }
  .hiw-title { font-size: 0.9rem; font-weight: 700; color: var(--fg); margin-bottom: 0.5rem; }
  .hiw-desc { font-size: 0.8rem; color: var(--muted-fg); line-height: 1.5; }

  /* ── FAQ ── */
  .faq-list { margin-top: 4rem; display: flex; flex-direction: column; gap: 0.75rem; }
  .faq-item {
    border: 1px solid var(--border); border-radius: var(--radius);
    overflow: hidden; background: rgba(255,255,255,0.02);
    transition: border-color 0.3s;
  }
  .faq-item.open { border-color: rgba(99,102,241,0.3); }
  .faq-q {
    width: 100%; display: flex; align-items: center; justify-content: space-between;
    padding: 1.25rem 1.5rem; background: none; border: none;
    color: var(--fg); font-size: 0.9rem; font-weight: 600;
    text-align: left; cursor: pointer; gap: 1rem;
    transition: color 0.2s;
  }
  .faq-q:hover { color: hsl(239,84%,80%); }
  .faq-icon { flex-shrink: 0; color: var(--muted-fg); transition: all 0.3s; }
  .faq-item.open .faq-icon { color: var(--accent); }
  .faq-a {
    max-height: 0; overflow: hidden; transition: max-height 0.4s ease, padding 0.3s;
    font-size: 0.85rem; color: var(--muted-fg); line-height: 1.7;
    padding: 0 1.5rem;
  }
  .faq-a.open { max-height: 200px; padding: 0 1.5rem 1.25rem; }

  /* ── Footer ── */
  .footer {
    border-top: 1px solid var(--border); padding: 3rem 2rem;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 1.5rem; max-width: 1100px; margin: 0 auto;
  }
  .footer-logo {
    font-family: 'Instrument Serif', serif; font-size: 1.2rem;
    color: var(--fg); display: flex; align-items: center; gap: 0.5rem;
  }
  .footer-copy { font-size: 0.78rem; color: var(--muted-fg); }
  .footer-links { display: flex; gap: 1.5rem; }
  .footer-link { font-size: 0.78rem; color: var(--muted-fg); text-decoration: none; transition: color 0.2s; }
  .footer-link:hover { color: var(--fg); }

  /* ── Reveal animation ── */
  .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.16,1,0.3,1); }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
  .reveal-delay-4 { transition-delay: 0.4s; }

  @keyframes fadeUp { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }
  @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .nav-links { display: none; }
    .comparison-grid { grid-template-columns: 1fr; }
    .hiw-flow { grid-template-columns: 1fr 1fr; }
    .hiw-flow::before { display: none; }
    .pipeline { grid-template-columns: repeat(3, 1fr); }
    .navbar { padding: 0 1.25rem; }
    .hero-h1 { font-size: clamp(2.2rem, 10vw, 4rem); }
  }
  @media (max-width: 480px) {
    .hiw-flow { grid-template-columns: 1fr; }
    .pipeline { grid-template-columns: repeat(2, 1fr); }
    .hero-actions { flex-direction: column; align-items: center; }
  }
`;

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 15,
  duration: Math.random() * 15 + 10,
  dx: `${(Math.random() - 0.5) * 100}px`,
  opacity: Math.random() * 0.4 + 0.1,
}));

const STREAKS = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  top: `${10 + i * 14}%`,
  width: `${200 + Math.random() * 300}px`,
  left: `${Math.random() * 60}%`,
  delay: `${i * 1.2}s`,
}));

function Navbar({ scrolled }) {
  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="nav-logo">
        <div className="logo-dot" />
        OUTZAAR
      </div>
      <div className="nav-links">
        {["Home", "Features", "About", "Contact"].map(l => (
          <a key={l} href="#" className="nav-link">{l}</a>
        ))}
      </div>
      <button className="nav-cta">Book a Demo</button>
    </nav>
  );
}

function HeroVisual() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { icon: "🔍", label: "Lead Discovery", value: "4,218 cos" },
    { icon: "🧠", label: "Decision Mapping", value: "847 DMs" },
    { icon: "⚡", label: "Signal Analysis", value: "23 signals" },
    { icon: "✉️", label: "Outreach", value: "312 sent" },
    { icon: "📅", label: "Meetings Booked", value: "14 booked" },
  ];

  useEffect(() => {
    const t = setInterval(() => setActiveStep(s => (s + 1) % steps.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="hero-visual">
      <div className="ai-operator">
        <div className="op-header">
          <div className="op-title">
            <span>⚙️</span> OUTZAAR AI Operator
          </div>
          <div className="op-live">
            <div className="live-dot" /> Live
          </div>
        </div>
        <div className="pipeline">
          {steps.map((s, i) => (
            <div key={i} className={`pipe-step${activeStep === i ? " active" : ""}`} style={{ animationDelay: `${i * 0.1}s` }}>
              {i < steps.length - 1 && <div className="pipe-connector"><div className="connector-pulse" /></div>}
              <div className="pipe-icon">{s.icon}</div>
              <div className="pipe-label">{s.label}</div>
              <div className="pipe-value">{s.value}</div>
            </div>
          ))}
        </div>
        <div className="meeting-booked">
          <div className="booked-info">
            <div className="booked-label">✅ Meeting Booked</div>
            <div className="booked-name">Priya Sharma — Head of Growth, Razorpay</div>
            <div className="booked-meta">Tomorrow · 11:00 AM IST · 30 min discovery call</div>
          </div>
          <div className="booked-check">🗓️</div>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? " open" : ""}`}>
      <button className="faq-q" onClick={() => setOpen(o => !o)}>
        {q}
        <span className="faq-icon">{open ? <Minus size={16} /> : <Plus size={16} />}</span>
      </button>
      <div className={`faq-a${open ? " open" : ""}`}>{a}</div>
    </div>
  );
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const problems = [
    { icon: "🗂️", title: "Company Searching", desc: "Hours browsing LinkedIn, Google, and directories just to build a basic prospect list.", pain: "~8 hrs/week" },
    { icon: "🕵️", title: "Decision-Maker Research", desc: "Manually profiling individuals, their roles, buying signals, and reporting lines.", pain: "~5 hrs/week" },
    { icon: "📨", title: "Manual Outreach", desc: "Writing one-off emails, copy-pasting templates, praying someone replies.", pain: "~6 hrs/week" },
    { icon: "🔁", title: "Repetitive Follow-Ups", desc: "Chasing cold leads with zero signal, burning time on the wrong prospects.", pain: "~4 hrs/week" },
    { icon: "🗓️", title: "Scheduling Chaos", desc: "Back-and-forth to find a time. Calendar links ignored. Meetings missed.", pain: "~3 hrs/week" },
  ];

  const features = [
    { num: "01", title: "Company Intelligence", desc: "Deep research on thousands of companies — funding, headcount, tech stack, intent signals, and growth indicators. All automated." },
    { num: "02", title: "Decision-Maker Mapping", desc: "Identify the exact people who buy what you sell — title, seniority, responsibility scope, and likely pain points." },
    { num: "03", title: "Targeting Strategy", desc: "AI-built account and persona maps. Prioritised by fit, intent, and likelihood to engage right now." },
    { num: "04", title: "Intelligent Outreach", desc: "Personalised multi-touch sequences that feel handwritten. Tone, timing, and channel optimised per prospect." },
    { num: "05", title: "Meeting Booking", desc: "End-to-end follow-through until a meeting is scheduled. OUTZAAR handles the back-and-forth so you don't have to." },
  ];

  const whoCards = [
    { icon: <Globe size={20} />, title: "Digital & Growth Agencies", desc: "Land retainer clients on autopilot while your team focuses on delivery." },
    { icon: <Code2 size={20} />, title: "B2B SaaS Companies", desc: "Build a predictable pipeline of qualified demos without a full SDR team." },
    { icon: <Users size={20} />, title: "IT Services & Staffing", desc: "Reach decision-makers at the right moment in their hiring or tech cycle." },
    { icon: <Package size={20} />, title: "Manufacturers & Exporters", desc: "Find international buyers and distributors across any market, automatically." },
  ];

  const faqs = [
    { q: "Is this just another email automation tool?", a: "No. Most tools automate sending. OUTZAAR automates thinking — research, targeting, strategy, sequencing, and booking — the entire outbound process end to end. Email is just one of the channels it uses." },
    { q: "How does it find Indian companies?", a: "OUTZAAR uses proprietary data sources, public business registries, web crawling, and verified signal aggregation to discover and profile companies across India and globally — far beyond what LinkedIn or ZoomInfo offer." },
    { q: "Does it work without a sales team?", a: "Yes. That's the point. You define your ICP and messaging preferences. OUTZAAR does the prospecting, research, outreach, and booking. One person can run it like a team of ten." },
    { q: "What channels does it use?", a: "Email is the primary channel. LinkedIn, WhatsApp, and enriched calling data are part of the roadmap, with multi-channel orchestration launching in the next phase." },
    { q: "When can I access it?", a: "OUTZAAR is currently in private beta with select customers. Book a demo to get early access and secure preferential pricing before the public launch." },
  ];

  return (
    <>
      <style>{style}</style>
      <Navbar scrolled={scrolled} />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-canvas">
          <div className="grid-bg" />
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          {STREAKS.map(s => (
            <div key={s.id} className="streak" style={{ top: s.top, width: s.width, left: s.left, animationDelay: s.delay }} />
          ))}
          {PARTICLES.map(p => (
            <div key={p.id} className="particle" style={{
              left: p.left, bottom: 0,
              width: `${p.size}px`, height: `${p.size}px`,
              background: `rgba(99,102,241,${p.opacity})`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              "--dx": p.dx,
            }} />
          ))}
        </div>

        <div className="hero-badge">
          <div className="hero-badge-dot" />
          AI-Powered Outbound Infrastructure
        </div>

        <h1 className="hero-h1">
          Your <em>AI Sales Team</em>.<br />
          No Humans Required.
        </h1>

        <p className="hero-sub">
          Describe your ideal customer. Our AI finds them, researches them, builds a targeting strategy, and books the first meeting — automatically.
        </p>

        <div className="hero-actions">
          <button className="btn-primary" onClick={() => window.open("https://calendly.com", "_blank")}>
            Book a Demo <ArrowRight size={16} />
          </button>
          <button className="btn-secondary" onClick={() => document.getElementById("solution")?.scrollIntoView({ behavior: "smooth" })}>
            See How It Works <ChevronDown size={16} />
          </button>
        </div>

        <HeroVisual />

        <div className="scroll-hint">
          <span>Scroll</span>
          <ChevronDown size={16} className="scroll-arrow" />
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="section" style={{ background: "rgba(0,0,0,0.2)" }}>
        <div className="section-inner">
          <div className="reveal">
            <div className="section-label">The Problem</div>
            <h2 className="section-h2">Sales Is Still Manual.<br /><em>That's Insane.</em></h2>
            <p className="section-sub">Your best salespeople are spending their days on tasks a machine could do in seconds.</p>
          </div>
          <div className="problem-grid">
            {problems.map((p, i) => (
              <div key={i} className={`problem-card reveal reveal-delay-${Math.min(i + 1, 4)}`}>
                <div className="problem-icon">{p.icon}</div>
                <div className="problem-title">{p.title}</div>
                <div className="problem-desc">{p.desc}</div>
                <div className="problem-pain">{p.pain}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTION ── */}
      <section className="section" id="solution">
        <div className="solution-bg" />
        <div className="section-inner">
          <div className="reveal">
            <div className="section-label">The Solution</div>
            <h2 className="section-h2">Describe Your Ideal Customer.<br /><em>We Handle Everything Else.</em></h2>
          </div>
          <div className="feature-grid">
            {features.map((f, i) => (
              <div key={i} className={`feature-card reveal reveal-delay-${Math.min(i + 1, 4)}`}>
                <div className="feature-pulse" />
                <div className="feature-num">{f.num}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
          <div className="intelligence-banner reveal">
            This Isn't Automation. It's Intelligence.
          </div>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section className="section" style={{ background: "rgba(0,0,0,0.15)" }}>
        <div className="section-inner">
          <div className="reveal">
            <div className="section-label">Before vs After</div>
            <h2 className="section-h2">Outbound, <em>Reinvented.</em></h2>
          </div>
          <div className="comparison-grid">
            <div className="comp-panel old reveal">
              <div className="comp-header">⚡ Old Outbound</div>
              <div className="comp-flow">
                {[
                  ["😰", "Manually search for companies"],
                  ["🔍", "Individually research each contact"],
                  ["✍️", "Write emails one by one"],
                  ["📞", "Chase leads with no signal"],
                  ["📅", "Play calendar tag for weeks"],
                ].map(([icon, text], i) => (
                  <div key={i}>
                    <div className="comp-node"><span className="comp-node-icon">{icon}</span>{text}</div>
                    {i < 4 && <div className="comp-arrow">↓ hours later</div>}
                  </div>
                ))}
              </div>
              <div className="comp-result">🚫 Months of work. A handful of meetings.</div>
            </div>
            <div className="comp-panel new reveal reveal-delay-2">
              <div className="comp-header">✦ OUTZAAR</div>
              <div className="comp-flow">
                {[
                  ["💬", "Describe your ideal customer"],
                  ["🧠", "AI maps the entire market for you"],
                  ["⚡", "Intelligent, personalised outreach fires"],
                  ["📊", "Signals monitored, follow-ups automated"],
                  ["📅", "Meeting appears on your calendar"],
                ].map(([icon, text], i) => (
                  <div key={i}>
                    <div className="comp-node"><span className="comp-node-icon">{icon}</span>{text}</div>
                    {i < 4 && <div className="comp-arrow">↓ seconds later</div>}
                  </div>
                ))}
              </div>
              <div className="comp-result">✅ One prompt. Meetings booked. Pipeline filled.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className="section">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-label">Who It's For</div>
            <h2 className="section-h2">Built for Teams<br /><em>Who Need More Pipeline.</em></h2>
          </div>
          <div className="who-grid">
            {whoCards.map((w, i) => (
              <div key={i} className={`who-card reveal reveal-delay-${Math.min(i + 1, 4)}`}>
                <div className="who-icon">{w.icon}</div>
                <div className="who-title">{w.title}</div>
                <div className="who-desc">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section hiw-section">
        <div className="section-inner">
          <div className="reveal" style={{ textAlign: "center" }}>
            <div className="section-label">How It Works</div>
            <h2 className="section-h2">Three Inputs.<br /><em>One Output: Booked Meetings.</em></h2>
          </div>
          <div className="hiw-flow">
            {[
              { n: "01", title: "What You Sell", desc: "Your product, use case, and the outcomes you deliver. That's it." },
              { n: "02", title: "Your Ideal Customer", desc: "Industry, size, role, signals, geography. Or just describe them in plain English." },
              { n: "03", title: "How You Sound", desc: "Tone, style, messaging preferences. We personalise every touchpoint." },
              { n: "✦", title: "Booked Meetings", desc: "Researched, contacted, and interested prospects with meetings scheduled. In your calendar." },
            ].map((s, i) => (
              <div key={i} className={`hiw-step reveal reveal-delay-${i + 1}`}>
                <div className="hiw-num">{s.n}</div>
                <div className="hiw-title">{s.title}</div>
                <div className="hiw-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="section" style={{ background: "rgba(99,102,241,0.04)", padding: "5rem 2rem" }}>
        <div className="section-inner" style={{ textAlign: "center" }}>
          <div className="reveal">
            <div className="section-label">Early Access</div>
            <h2 className="section-h2" style={{ marginBottom: "1rem" }}>Ready to Fill<br /><em>Your Pipeline?</em></h2>
            <p style={{ color: "var(--muted-fg)", marginBottom: "2.5rem", maxWidth: 440, margin: "1rem auto 2.5rem" }}>
              Join the private beta. We're onboarding select companies with preferential pricing.
            </p>
            <button className="btn-primary" style={{ margin: "0 auto" }} onClick={() => window.open("https://calendly.com", "_blank")}>
              Book a Demo <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section" style={{ background: "rgba(0,0,0,0.1)" }}>
        <div className="section-inner">
          <div className="reveal">
            <div className="section-label">FAQ</div>
            <h2 className="section-h2">Common <em>Questions.</em></h2>
          </div>
          <div className="faq-list">
            {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer">
          <div className="footer-logo">
            <div className="logo-dot" style={{ width: 7, height: 7 }} />
            OUTZAAR
          </div>
          <div className="footer-copy">© 2025 OUTZAAR. All rights reserved.</div>
          <div className="footer-links">
            <a href="#" className="footer-link">Privacy</a>
            <a href="#" className="footer-link">Terms</a>
            <a href="#" className="footer-link">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}
