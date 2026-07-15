import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowLeft, Check, MessageCircle, Search, Send, Sparkles, TrendingUp, UserPlus, Users } from 'lucide-react'
import { categories, influencers } from './data'
import './style.css'

const formatFollowers = (value) => {
  if (value >= 10000) return `${(value / 10000).toFixed(value >= 1000000 ? 0 : 1)}万`
  return value.toLocaleString('zh-CN')
}

function Navbar({ onHome }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button onClick={onHome} className="flex items-center gap-3 text-left">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-pink-500 to-violet-600 text-white shadow-glow">
            <Sparkles size={22} />
          </span>
          <span>
            <strong className="block text-lg text-slate-950">人人网红平台</strong>
            <small className="text-slate-500">Influencer Discovery Hub</small>
          </span>
        </button>
        <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <a href="#discover" className="hover:text-pink-600">发现达人</a>
          <a href="#categories" className="hover:text-pink-600">分类筛选</a>
          <a href="#works" className="hover:text-pink-600">作品展示</a>
        </div>
      </nav>
    </header>
  )
}

function FollowButton({ isFollowing, onToggle, compact = false }) {
  return (
    <button
      onClick={onToggle}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl font-bold transition ${compact ? 'px-3 py-2 text-xs' : 'px-4 py-3 text-sm'} ${isFollowing ? 'bg-pink-50 text-pink-600 ring-1 ring-pink-100 hover:bg-pink-100' : 'bg-slate-950 text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-violet-600'}`}
    >
      {isFollowing ? <Check size={16} /> : <UserPlus size={16} />}
      {isFollowing ? '已关注' : '关注'}
    </button>
  )
}

function InfluencerCard({ influencer, onSelect, isFollowing, onToggleFollow }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-5 shadow-xl shadow-slate-200/60 transition hover:-translate-y-1 hover:shadow-glow">
      <div className="flex items-start gap-4">
        <img className="h-20 w-20 rounded-3xl object-cover ring-4 ring-pink-100" src={influencer.avatar} alt={`${influencer.name} 头像`} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate text-xl font-bold text-slate-950">{influencer.name}</h3>
            <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-600">{influencer.category}</span>
          </div>
          <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-700"><Users size={16} />{formatFollowers(influencer.followers)} 粉丝</p>
        </div>
      </div>
      <p className="mt-5 min-h-16 text-sm leading-7 text-slate-600">{influencer.bio}</p>
      <div className="mt-5 grid grid-cols-[1fr_auto] gap-3">
        <button onClick={() => onSelect(influencer)} className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-violet-600">
          查看个人主页
        </button>
        <FollowButton isFollowing={isFollowing} onToggle={onToggleFollow} compact />
      </div>
    </article>
  )
}

function HomePage({ onSelect, followingIds, onToggleFollow }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('全部')
  const filtered = useMemo(() => influencers.filter((item) => {
    const matchesQuery = [item.name, item.bio, item.category].join(' ').toLowerCase().includes(query.trim().toLowerCase())
    const matchesCategory = category === '全部' || item.category === category
    return matchesQuery && matchesCategory
  }), [query, category])

  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
        <div>
          <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-pink-600 shadow">品牌合作 · 达人筛选 · 数据洞察</span>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">发现最适合品牌的优质网红达人</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">通过搜索、分类与数据卡片快速了解达人定位，进入个人主页查看介绍、粉丝表现和代表作品。</p>
        </div>
        <div className="rounded-[2rem] bg-gradient-to-br from-pink-500 to-violet-700 p-8 text-white shadow-glow">
          <p className="text-sm uppercase tracking-[0.3em] text-white/70">Platform Insights</p>
          <strong className="mt-6 block text-6xl">1,420+</strong>
          <p className="mt-3 text-white/80">精选合作达人覆盖美妆、美食、旅行、科技与健身等主流赛道。</p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/15 p-4"><TrendingUp /> <p className="mt-3 font-bold">高互动人群</p></div>
            <div className="rounded-2xl bg-white/15 p-4"><Users /> <p className="mt-3 font-bold">真实粉丝数据</p></div>
          </div>
        </div>
      </section>

      <section id="discover" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-xl shadow-slate-200/70 md:flex md:items-center md:justify-between md:gap-6">
          <label className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-100 px-4 py-3 text-slate-500">
            <Search size={20} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索昵称、简介或分类" className="w-full bg-transparent text-slate-900 outline-none" />
          </label>
          <div id="categories" className="mt-4 flex flex-wrap gap-2 md:mt-0">
            {categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${category === item ? 'bg-pink-500 text-white shadow-lg shadow-pink-200' : 'bg-slate-100 text-slate-600 hover:bg-pink-50 hover:text-pink-600'}`}>{item}</button>)}
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => <InfluencerCard key={item.id} influencer={item} onSelect={onSelect} isFollowing={followingIds.includes(item.id)} onToggleFollow={() => onToggleFollow(item.id)} />)}
        </div>
      </section>
    </main>
  )
}

function ChatBox({ influencer }) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { from: influencer.name, text: `你好，我是${influencer.name}，欢迎聊聊合作方向～` },
    { from: '平台助手', text: '你可以发送预算、档期或内容需求，达人会尽快回复。' },
  ])

  const handleSend = (event) => {
    event.preventDefault()
    const trimmed = message.trim()
    if (!trimmed) return
    setMessages((current) => [...current, { from: '我', text: trimmed }])
    setMessage('')
  }

  return (
    <aside className="rounded-3xl border border-pink-100 bg-white p-5 shadow-xl shadow-slate-200/70">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-pink-50 text-pink-600"><MessageCircle size={20} /></span>
        <div>
          <h2 className="font-black text-slate-950">私信沟通</h2>
          <p className="text-sm text-slate-500">在线咨询合作、报价与档期</p>
        </div>
      </div>
      <div className="mt-4 max-h-72 space-y-3 overflow-y-auto pr-1">
        {messages.map((item, index) => (
          <div key={`${item.from}-${index}`} className={`rounded-2xl p-3 text-sm leading-6 ${item.from === '我' ? 'ml-8 bg-gradient-to-r from-pink-500 to-violet-600 text-white' : 'mr-8 bg-slate-100 text-slate-600'}`}>
            <strong className="mb-1 block text-xs opacity-80">{item.from}</strong>
            {item.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="mt-4 flex gap-2">
        <input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="输入你的合作需求..." className="min-w-0 flex-1 rounded-2xl bg-slate-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-pink-200" />
        <button className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-white transition hover:bg-pink-500" aria-label="发送消息"><Send size={18} /></button>
      </form>
    </aside>
  )
}

function ProfilePage({ influencer, onBack, isFollowing, onToggleFollow }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <button onClick={onBack} className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-semibold text-slate-700 shadow hover:text-pink-600"><ArrowLeft size={18} />返回列表</button>
      <section className="overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-slate-200">
        <div className="h-36 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-violet-700" />
        <div className="px-6 pb-8 sm:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <img className="-mt-16 h-32 w-32 rounded-[2rem] border-4 border-white object-cover shadow-xl" src={influencer.avatar} alt={`${influencer.name} 头像`} />
            <FollowButton isFollowing={isFollowing} onToggle={onToggleFollow} />
          </div>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
            <div>
              <span className="rounded-full bg-pink-50 px-3 py-1 text-sm font-bold text-pink-600">{influencer.category}</span>
              <h1 className="mt-4 text-4xl font-black text-slate-950">{influencer.name}</h1>
              <p className="mt-5 text-lg leading-9 text-slate-600">{influencer.intro}</p>
            </div>
            <div className="grid gap-4 rounded-3xl bg-slate-50 p-5">
              <Data label="粉丝数量" value={`${formatFollowers(influencer.followers)}`} />
              <Data label="互动率" value={influencer.stats.engagement} />
              <Data label="粉丝增长" value={influencer.growth} />
            </div>
          </div>
        </div>
      </section>
      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div id="works">
          <h2 className="text-2xl font-black text-slate-950">代表作品</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {influencer.works.map((work, index) => <div key={work} className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/70"><span className="text-sm font-bold text-pink-500">作品 0{index + 1}</span><h3 className="mt-4 text-xl font-black text-slate-900">{work}</h3><p className="mt-3 text-sm leading-6 text-slate-500">短视频、图文与直播片段组合展示，适合品牌快速评估内容风格。</p></div>)}
          </div>
        </div>
        <ChatBox influencer={influencer} />
      </section>
    </main>
  )
}

function Data({ label, value }) {
  return <div className="rounded-2xl bg-white p-4"><p className="text-sm text-slate-500">{label}</p><strong className="mt-1 block text-2xl text-slate-950">{value}</strong></div>
}

function App() {
  const [selected, setSelected] = useState(null)
  const [followingIds, setFollowingIds] = useState([])
  const toggleFollow = (id) => {
    setFollowingIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  return <><Navbar onHome={() => setSelected(null)} />{selected ? <ProfilePage influencer={selected} onBack={() => setSelected(null)} isFollowing={followingIds.includes(selected.id)} onToggleFollow={() => toggleFollow(selected.id)} /> : <HomePage onSelect={setSelected} followingIds={followingIds} onToggleFollow={toggleFollow} />}<footer className="px-4 py-10 text-center text-sm text-slate-500">© 2026 人人网红平台 · 连接品牌与优质创作者</footer></>
}

createRoot(document.getElementById('root')).render(<App />)
