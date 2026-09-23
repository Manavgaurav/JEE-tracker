import { StrictMode, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BarChart3, BookOpen, CalendarDays, CheckCircle2, ChevronRight, Clock3, Flame, LayoutDashboard, Medal, Play, Search, Target, TimerReset, Trophy, Zap } from 'lucide-react'
import './styles.css'

type Subject = 'Physics' | 'Chemistry' | 'Mathematics'

const subjects: { name: Subject; accent: string; completed: number; total: number; chapters: string[] }[] = [
  { name: 'Physics', accent: 'cyan', completed: 18, total: 24, chapters: ['Electrostatics', 'Current Electricity', 'Ray Optics'] },
  { name: 'Chemistry', accent: 'mint', completed: 21, total: 28, chapters: ['Solutions', 'Chemical Kinetics', 'Coordination Compounds'] },
  { name: 'Mathematics', accent: 'violet', completed: 15, total: 26, chapters: ['Limits & Continuity', 'Matrices', 'Probability'] },
]

function App() {
  const [activeTab, setActiveTab] = useState('Overview')
  const [query, setQuery] = useState('')
  const [focusMinutes, setFocusMinutes] = useState(25)
  const [isRunning, setIsRunning] = useState(false)
  const filteredSubjects = useMemo(() => subjects.map(subject => ({ ...subject, chapters: subject.chapters.filter(chapter => chapter.toLowerCase().includes(query.toLowerCase())) })), [query])

  return <div className="app-shell">
    <div className="aurora aurora-one" /><div className="aurora aurora-two" /><div className="grid-overlay" />
    <header className="topbar">
      <div className="brand"><div className="brand-mark"><Zap size={19} /></div><div><strong>JEE<span>OS</span></strong><small>STUDY COMMAND CENTER</small></div></div>
      <div className="top-actions"><div className="streak"><Flame size={15} /> 12 day streak</div><button className="avatar">MG</button></div>
    </header>

    <main className="content">
      <section className="welcome-row"><div><p className="eyebrow"><span className="status-dot" /> SATURDAY, 23 SEPTEMBER 2026</p><h1>Build your <em>momentum.</em></h1><p className="subcopy">Your next breakthrough is one focused session away.</p></div><button className="primary-button" onClick={() => { setActiveTab('Focus'); setIsRunning(true) }}><Play size={16} fill="currentColor" /> Start focus session</button></section>

      <section className="mission-card"><div className="mission-copy"><p className="eyebrow purple">CURRENT MISSION</p><h2>Conquer Electrodynamics</h2><p>Finish the remaining PYQs and lock in your strongest Physics unit this week.</p><div className="mission-meta"><span><Target size={15} /> 42 of 60 questions</span><span><Clock3 size={15} /> 3h 40m projected</span></div></div><div className="ring-wrap"><div className="progress-ring"><strong>70<span>%</span></strong><small>complete</small></div></div></section>

      <section className="stats-grid"><Stat icon={<Target />} label="Weekly progress" value="68%" detail="+12% from last week" /><Stat icon={<Clock3 />} label="Focused time" value="14h 25m" detail="2h 10m today" /><Stat icon={<Trophy />} label="Mock percentile" value="94.8" detail="Top 6% this month" /><Stat icon={<CheckCircle2 />} label="Accuracy" value="82%" detail="+4.6% improvement" /></section>

      <div className="section-heading"><div><p className="eyebrow">YOUR PREPARATION MAP</p><h2>Keep the streak alive</h2></div><div className="search-box"><Search size={16} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search chapters" /></div></div>
      <section className="subject-grid">{filteredSubjects.map(subject => <article className="subject-card" key={subject.name}><div className="subject-top"><div className={`subject-icon ${subject.accent}`}><BookOpen size={19} /></div><span className="arrow"><ChevronRight size={17} /></span></div><h3>{subject.name}</h3><p>{subject.completed} of {subject.total} chapters mastered</p><div className="bar"><span className={subject.accent} style={{ width: `${subject.completed / subject.total * 100}%` }} /></div><div className="chapter-list">{subject.chapters.map(chapter => <div key={chapter}><span>{chapter}</span><CheckCircle2 size={14} /></div>)}</div></article>)}</section>

      <section className="bottom-grid"><article className="panel schedule"><div className="panel-heading"><div><p className="eyebrow">UP NEXT</p><h2>Today&apos;s schedule</h2></div><CalendarDays size={20} /></div>{['Electrostatics PYQs', 'Organic reaction drill', 'Mathematics mock analysis'].map((item, index) => <div className="schedule-item" key={item}><div className={`time ${index === 0 ? 'active' : ''}`}>{['09:30', '12:00', '16:30'][index]}</div><div><strong>{item}</strong><small>{['Physics · 60 min', 'Chemistry · 45 min', 'Mathematics · 90 min'][index]}</small></div><span className={index === 0 ? 'live-pill' : 'type-pill'}>{index === 0 ? 'NOW' : 'PLANNED'}</span></div>)}</article><article className="panel focus-panel"><div className="panel-heading"><div><p className="eyebrow">TACTICAL FOCUS LOUNGE</p><h2>Deep work timer</h2></div><TimerReset size={20} /></div><div className="timer-display"><strong>{String(focusMinutes).padStart(2, '0')}:00</strong><span>minutes</span></div><div className="timer-controls"><button onClick={() => setFocusMinutes(Math.max(5, focusMinutes - 5))}>−</button><button className="timer-start" onClick={() => setIsRunning(!isRunning)}>{isRunning ? 'Pause session' : 'Begin session'}</button><button onClick={() => setFocusMinutes(focusMinutes + 5)}>+</button></div><p className="timer-note">{isRunning ? 'Focus mode is active. Keep going.' : 'Choose your duration and protect your attention.'}</p></article></section>
    </main>
    <nav className="dock">{[['Overview', LayoutDashboard], ['Subjects', BookOpen], ['Roadmap', BarChart3], ['Leaderboard', Medal], ['Focus', TimerReset]].map(([label, Icon]) => <button className={activeTab === label ? 'active' : ''} key={label as string} onClick={() => setActiveTab(label as string)}><Icon size={17} /><span>{label as string}</span></button>)}</nav>
  </div>
}

function Stat({ icon, label, value, detail }: { icon: React.ReactNode; label: string; value: string; detail: string }) { return <article className="stat-card"><div className="stat-icon">{icon}</div><p>{label}</p><strong>{value}</strong><small>{detail}</small></article> }

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)

export {}

