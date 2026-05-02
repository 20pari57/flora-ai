import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { FiExternalLink, FiMapPin, FiShoppingBag, FiSend, FiArrowRight, FiStar, FiHeart, FiFilter } from 'react-icons/fi'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type OnlineProduct = {
  id: string
  name: string
  platform: string
  price: string
  tag: string
  link: string
  image: string
  rating: string
  reviews: string
  badge?: string
}

type Nursery = {
  id: string
  name: string
  city: string
  coords: [number, number]
  specialties: string[]
  whatsapp: string
  image: string
  rating: string
  plants: string
  googleMaps: string
}

type TabKey = 'online' | 'local'

const categories = [
  { label: 'All',             tag: null },
  { label: 'Soil & Nutrition', tag: 'Soil & Nutrition' },
  { label: 'Pots & Planters', tag: 'Pots & Planters' },
  { label: 'Water & Irrigation', tag: 'Water Automation' },
  { label: 'Indoor Lighting', tag: 'Indoor Lighting' },
  { label: 'Live Plants',     tag: 'Live Plants' },
  { label: 'Smart Gadgets',   tag: 'Smart Gadgets' },
  { label: 'Plant Protection', tag: 'Plant Protection' },
]

const shopByCategory = [
  { label: 'Fertilizers & Soil', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80', link: 'https://www.amazon.in/s?k=organic+fertilizer+plants' },
  { label: 'Pots & Planters',    image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=400&q=80', link: 'https://www.amazon.in/s?k=plant+pots+planters' },
  { label: 'Seeds & Bulbs',      image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=400&q=80', link: 'https://www.amazon.in/s?k=seeds+for+planting' },
  { label: 'Grow Lights',        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80', link: 'https://www.flipkart.com/search?q=grow+light+led' },
  { label: 'Irrigation Kits',    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=400&q=80', link: 'https://www.amazon.in/s?k=drip+irrigation+kit' },
  { label: 'Indoor Plants',      image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80', link: 'https://www.amazon.in/s?k=indoor+plants+india' },
  { label: 'Garden Tools',       image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80', link: 'https://www.amazon.in/s?k=garden+tools+set' },
  { label: 'Plant Protection',   image: 'https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?auto=format&fit=crop&w=400&q=80', link: 'https://www.amazon.in/s?k=neem+oil+plant+protection' },
]

const featuredPhotos = [
  { label: 'Monstera', image: 'https://images.unsplash.com/photo-1614594895256-b7dd12fbf6ec?auto=format&fit=crop&w=400&q=80', link: 'https://www.amazon.in/s?k=monstera+plant' },
  { label: 'Peace Lily', image: 'https://images.unsplash.com/photo-1603574670812-d24560880210?auto=format&fit=crop&w=400&q=80', link: 'https://www.amazon.in/s?k=peace+lily+plant' },
  { label: 'Fiddle Leaf', image: 'https://images.unsplash.com/photo-1585764885547-7a25ae9a68a0?auto=format&fit=crop&w=400&q=80', link: 'https://www.amazon.in/s?k=fiddle+leaf+fig' },
  { label: 'Snake Plant', image: 'https://images.unsplash.com/photo-1572688484438-313a6a50be7c?auto=format&fit=crop&w=400&q=80', link: 'https://www.amazon.in/s?k=snake+plant+india' },
  { label: 'Pothos', image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=400&q=80', link: 'https://www.amazon.in/s?k=pothos+plant' },
  { label: 'Aloe Vera', image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=400&q=80', link: 'https://www.amazon.in/s?k=aloe+vera+plant' },
  { label: 'Succulents', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=400&q=80', link: 'https://www.amazon.in/s?k=succulent+plants+india' },
  { label: 'Bougainvillea', image: 'https://images.unsplash.com/photo-1503435980610-a51f3ddfee50?auto=format&fit=crop&w=400&q=80', link: 'https://www.amazon.in/s?k=bougainvillea+plant' },
]

const onlineProducts: OnlineProduct[] = [
  {
    id: 'p1',
    name: 'Organic Neem Cake Fertiliser · 5 kg',
    platform: 'Amazon India',
    price: '₹349',
    tag: 'Soil & Nutrition',
    link: 'https://www.amazon.in/s?k=neem+cake+fertilizer',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80',
    rating: '4.8',
    reviews: '2.1k',
    badge: 'Best Seller',
  },
  {
    id: 'p2',
    name: 'Self-watering Balcony Planter Set · 4 pcs',
    platform: 'Flipkart',
    price: '₹899',
    tag: 'Pots & Planters',
    link: 'https://www.flipkart.com/search?q=self+watering+planter',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80',
    rating: '4.6',
    reviews: '874',
  },
  {
    id: 'p3',
    name: 'Drip Irrigation Starter Kit · 25 pots',
    platform: 'Amazon India',
    price: '₹1,499',
    tag: 'Water Automation',
    link: 'https://www.amazon.in/s?k=drip+irrigation+kit',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80',
    rating: '4.7',
    reviews: '1.3k',
    badge: 'FLORE Pick',
  },
  {
    id: 'p4',
    name: 'Premium Cocopeat Block · 5 kg',
    platform: 'Amazon India',
    price: '₹249',
    tag: 'Soil & Nutrition',
    link: 'https://www.amazon.in/s?k=cocopeat+block',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80',
    rating: '4.9',
    reviews: '3.4k',
    badge: 'Top Rated',
  },
  {
    id: 'p5',
    name: 'Grow Light Panel · Full Spectrum LED',
    platform: 'Flipkart',
    price: '₹2,199',
    tag: 'Indoor Lighting',
    link: 'https://www.flipkart.com/search?q=grow+light+led',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
    rating: '4.5',
    reviews: '512',
  },
  {
    id: 'p6',
    name: 'Terracotta Pot Set · Handmade · 6 pcs',
    platform: 'Amazon India',
    price: '₹649',
    tag: 'Pots & Planters',
    link: 'https://www.amazon.in/s?k=terracotta+pots',
    image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=600&q=80',
    rating: '4.7',
    reviews: '988',
  },
  {
    id: 'p7',
    name: 'Organic Vermicompost · Premium · 10 kg',
    platform: 'Amazon India',
    price: '₹399',
    tag: 'Soil & Nutrition',
    link: 'https://www.amazon.in/s?k=vermicompost+organic',
    image: 'https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?auto=format&fit=crop&w=600&q=80',
    rating: '4.8',
    reviews: '1.7k',
    badge: 'FLORE Pick',
  },
  {
    id: 'p8',
    name: 'Ceramic Hanging Planter · Set of 3',
    platform: 'Flipkart',
    price: '₹799',
    tag: 'Pots & Planters',
    link: 'https://www.flipkart.com/search?q=ceramic+hanging+planter',
    image: 'https://images.unsplash.com/photo-1614594895256-b7dd12fbf6ec?auto=format&fit=crop&w=600&q=80',
    rating: '4.6',
    reviews: '634',
  },
  {
    id: 'p9',
    name: 'Smart Soil Moisture Sensor Kit',
    platform: 'Amazon India',
    price: '₹1,249',
    tag: 'Smart Gadgets',
    link: 'https://www.amazon.in/s?k=soil+moisture+sensor+plant',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80',
    rating: '4.4',
    reviews: '328',
    badge: 'New',
  },
  {
    id: 'p10',
    name: 'Cold-pressed Neem Oil Spray · 500 ml',
    platform: 'Amazon India',
    price: '₹199',
    tag: 'Plant Protection',
    link: 'https://www.amazon.in/s?k=neem+oil+spray+plants',
    image: 'https://images.unsplash.com/photo-1503435980610-a51f3ddfee50?auto=format&fit=crop&w=600&q=80',
    rating: '4.7',
    reviews: '2.8k',
    badge: 'Best Seller',
  },
  {
    id: 'p11',
    name: 'Indoor Plant Bundle · Pothos + Snake + ZZ',
    platform: 'Ugaoo',
    price: '₹1,099',
    tag: 'Live Plants',
    link: 'https://www.ugaoo.com/collections/indoor-plants',
    image: 'https://images.unsplash.com/photo-1572688484438-313a6a50be7c?auto=format&fit=crop&w=600&q=80',
    rating: '4.9',
    reviews: '4.2k',
    badge: 'Top Rated',
  },
  {
    id: 'p12',
    name: 'Bamboo Garden Trellis · Expandable · Pack 4',
    platform: 'Flipkart',
    price: '₹549',
    tag: 'Plant Protection',
    link: 'https://www.flipkart.com/search?q=bamboo+garden+trellis',
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80',
    rating: '4.5',
    reviews: '419',
  },
]

const nurseries: Nursery[] = [
  {
    id: 'n1',
    name: 'GreenNest Nursery',
    city: 'Mumbai',
    coords: [19.076, 72.8777],
    specialties: ['Indoor plants', 'Succulents', 'Balcony setups'],
    whatsapp: '919900112233',
    image: 'https://images.unsplash.com/photo-1470058869958-2a77ade41c02?auto=format&fit=crop&w=600&q=80',
    rating: '4.9',
    plants: '200+ varieties',
    googleMaps: 'https://www.google.com/maps/search/nursery+mumbai',
  },
  {
    id: 'n2',
    name: 'Lalbagh Plant Hub',
    city: 'Bengaluru',
    coords: [12.9716, 77.5946],
    specialties: ['Flowering plants', 'Fruit saplings', 'Bonsai'],
    whatsapp: '919988776655',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80',
    rating: '4.8',
    plants: '350+ varieties',
    googleMaps: 'https://www.google.com/maps/search/nursery+bangalore',
  },
  {
    id: 'n3',
    name: 'Delhi Native Greens',
    city: 'New Delhi',
    coords: [28.6139, 77.209],
    specialties: ['Native species', 'Shade trees', 'Hedges'],
    whatsapp: '919955443322',
    image: 'https://images.unsplash.com/photo-1441930474823-6d72ead87b71?auto=format&fit=crop&w=600&q=80',
    rating: '4.7',
    plants: '150+ varieties',
    googleMaps: 'https://www.google.com/maps/search/nursery+delhi',
  },
  {
    id: 'n4',
    name: 'Pune Green World',
    city: 'Pune',
    coords: [18.5204, 73.8567],
    specialties: ['Terrace gardens', 'Herbs', 'Medicinal plants'],
    whatsapp: '919922334455',
    image: 'https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?auto=format&fit=crop&w=600&q=80',
    rating: '4.8',
    plants: '180+ varieties',
    googleMaps: 'https://www.google.com/maps/search/nursery+pune',
  },
  {
    id: 'n5',
    name: 'Chennai Botanical Corner',
    city: 'Chennai',
    coords: [13.0827, 80.2707],
    specialties: ['Tropical plants', 'Palms', 'Flowering trees'],
    whatsapp: '919944332211',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80',
    rating: '4.6',
    plants: '220+ varieties',
    googleMaps: 'https://www.google.com/maps/search/nursery+chennai',
  },
  {
    id: 'n6',
    name: 'Hyderabad Plantopia',
    city: 'Hyderabad',
    coords: [17.385, 78.4867],
    specialties: ['Cacti', 'Succulents', 'Rare tropicals'],
    whatsapp: '919966778899',
    image: 'https://images.unsplash.com/photo-1614594895256-b7dd12fbf6ec?auto=format&fit=crop&w=600&q=80',
    rating: '4.9',
    plants: '300+ varieties',
    googleMaps: 'https://www.google.com/maps/search/nursery+hyderabad',
  },
  {
    id: 'n7',
    name: 'Kolkata Flower Garden',
    city: 'Kolkata',
    coords: [22.5726, 88.3639],
    specialties: ['Seasonal flowers', 'Orchids', 'Ferns'],
    whatsapp: '919877665544',
    image: 'https://images.unsplash.com/photo-1503435980610-a51f3ddfee50?auto=format&fit=crop&w=600&q=80',
    rating: '4.7',
    plants: '250+ varieties',
    googleMaps: 'https://www.google.com/maps/search/nursery+kolkata',
  },
]

const AnyMapContainer = MapContainer as unknown as React.ComponentType<any>
const AnyTileLayer    = TileLayer    as unknown as React.ComponentType<any>

const platformColors: Record<string, string> = {
  'Amazon India': '#ff9900',
  'Flipkart':     '#2874f0',
  'Ugaoo':        '#34d399',
  'Local Marketplace': '#a3e635',
}

export function Marketplace() {
  const [activeTab,      setActiveTab]      = useState<TabKey>('online')
  const [activeCat,      setActiveCat]      = useState<string | null>(null)
  const [userCoords,     setUserCoords]     = useState<[number, number] | null>(null)
  const [isLocating,     setIsLocating]     = useState(false)
  const [locationError,  setLocationError]  = useState<string | null>(null)
  const [wishlist,       setWishlist]       = useState<Set<string>>(new Set())

  const heroRef       = useRef<HTMLDivElement>(null)
  const catRef        = useRef<HTMLDivElement>(null)
  const photoStripRef = useRef<HTMLDivElement>(null)
  const productsRef   = useRef<HTMLDivElement>(null)
  const nurseriesRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.from(heroRef.current.querySelectorAll('.hero-item'), {
          opacity: 0, y: 30, stagger: 0.1, duration: 0.75, ease: 'power3.out',
        })
      }
      if (catRef.current) {
        gsap.from(catRef.current.querySelectorAll('.cat-tile'), {
          opacity: 0, y: 30, scale: 0.95, stagger: 0.06, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: catRef.current, start: 'top 88%' },
        })
      }
      if (photoStripRef.current) {
        gsap.from(photoStripRef.current.querySelectorAll('.photo-chip'), {
          opacity: 0, x: 30, stagger: 0.05, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: photoStripRef.current, start: 'top 90%' },
        })
      }
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (activeTab === 'online' && productsRef.current) {
        gsap.from(productsRef.current.querySelectorAll('.product-card'), {
          opacity: 0, y: 40, scale: 0.96, stagger: 0.06, duration: 0.55, ease: 'power3.out',
        })
        productsRef.current.querySelectorAll('.product-card').forEach((card) => {
          const img = card.querySelector('.prod-img') as HTMLElement
          card.addEventListener('mouseenter', () => { if (img) gsap.to(img, { scale: 1.08, duration: 0.5, ease: 'power2.out' }) })
          card.addEventListener('mouseleave', () => { if (img) gsap.to(img, { scale: 1,    duration: 0.5, ease: 'power2.inOut' }) })
        })
      }
      if (activeTab === 'local' && nurseriesRef.current) {
        gsap.from(nurseriesRef.current.querySelectorAll('.nursery-card'), {
          opacity: 0, y: 40, stagger: 0.08, duration: 0.55, ease: 'power3.out',
        })
      }
    })
    return () => ctx.revert()
  }, [activeTab, activeCat])

  function handleUseMyLocation() {
    if (!navigator.geolocation) { setLocationError('Location access not available.'); return }
    setIsLocating(true)
    setLocationError(null)
    navigator.geolocation.getCurrentPosition(
      (pos) => { setUserCoords([pos.coords.latitude, pos.coords.longitude]); setIsLocating(false) },
      ()    => { setLocationError('Unable to read your location. Browse nurseries manually.'); setIsLocating(false) },
      { enableHighAccuracy: true, timeout: 8000 },
    )
  }

  function buildWhatsApp(nursery: Nursery) {
    const text = 'Hi, I discovered your nursery on FLORE AI. I would like to know about available plants and delivery options.'
    return `https://wa.me/${nursery.whatsapp}?text=${encodeURIComponent(text)}`
  }

  function toggleWishlist(id: string) {
    setWishlist((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }

  const filteredProducts = activeCat
    ? onlineProducts.filter((p) => p.tag === activeCat)
    : onlineProducts

  return (
    <div className="min-h-screen bg-slate-950 pb-24">

      {/* ══════════════════════════════════════
          HERO BANNER
      ══════════════════════════════════════ */}
      <div
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0c1a14 60%, #0f172a 100%)' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441930474823-6d72ead87b71?auto=format&fit=crop&w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 to-slate-950" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full opacity-20 blur-[80px]"
          style={{ background: 'radial-gradient(circle, #34d399, transparent)' }} />

        <div className="relative mx-auto max-w-7xl px-5 py-12 md:px-10 md:py-16">
          <div className="hero-item mb-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              FLORE Marketplace · India
            </span>
          </div>
          <h1 className="hero-item mb-3 text-3xl font-black tracking-[-0.03em] text-white md:text-5xl">
            Buy smarter — online or
            <span className="bg-gradient-to-r from-emerald-300 to-lime-200 bg-clip-text text-transparent"> right around you.</span>
          </h1>
          <p className="hero-item mb-8 max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
            Curated plant products from Amazon, Flipkart & local shops — plus a live nursery map to connect with nearby vendors via WhatsApp.
          </p>
          <div className="hero-item flex flex-wrap gap-6">
            {[
              { val: '500+', label: 'Nurseries listed' },
              { val: '6K+',  label: 'Products curated' },
              { val: '1-tap', label: 'WhatsApp connect' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-xl font-black text-emerald-300">{s.val}</p>
                <p className="text-xs text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pt-10 md:px-10">

        {/* ══════════════════════════════════════
            SHOP BY CATEGORY — image tiles
        ══════════════════════════════════════ */}
        <section ref={catRef} className="mb-12">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-black text-white">Shop by Category</h2>
            <a href="https://www.amazon.in/s?k=plant+care" target="_blank" rel="noreferrer"
              className="flex items-center gap-1 text-xs font-semibold text-emerald-400 transition hover:text-emerald-300">
              See all <FiArrowRight className="h-3 w-3" />
            </a>
          </div>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-4 md:grid-cols-8">
            {shopByCategory.map((cat) => (
              <a
                key={cat.label}
                href={cat.link}
                target="_blank"
                rel="noreferrer"
                className="cat-tile group relative flex flex-col items-center gap-2 overflow-hidden rounded-2xl border border-white/8 bg-slate-900 transition-all hover:-translate-y-1 hover:border-emerald-400/30 hover:shadow-lg hover:shadow-emerald-900/30"
              >
                <div className="relative h-20 w-full overflow-hidden sm:h-24">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${cat.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                </div>
                <p className="pb-2.5 px-1 text-center text-[10px] font-bold text-slate-300 group-hover:text-white leading-tight">{cat.label}</p>
                {/* hover arrow */}
                <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  <FiExternalLink className="h-2.5 w-2.5 text-white" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            FEATURED PLANT PHOTO STRIP
        ══════════════════════════════════════ */}
        <section ref={photoStripRef} className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-black text-white">Popular Plants to Buy</h2>
            <a href="https://www.amazon.in/s?k=indoor+plants+india" target="_blank" rel="noreferrer"
              className="flex items-center gap-1 text-xs font-semibold text-emerald-400 transition hover:text-emerald-300">
              View all <FiArrowRight className="h-3 w-3" />
            </a>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {featuredPhotos.map((p) => (
              <a
                key={p.label}
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="photo-chip group relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-white/8 transition-all hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-lg sm:h-32 sm:w-32"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${p.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-2">
                  <p className="text-center text-[10px] font-bold text-white">{p.label}</p>
                </div>
                <div className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  <FiExternalLink className="h-2.5 w-2.5 text-white" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            TAB SWITCHER
        ══════════════════════════════════════ */}
        <div className="mb-6 flex items-center gap-2">
          {(['online', 'local'] as TabKey[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                activeTab === tab
                  ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/30'
                  : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {tab === 'online' ? <FiShoppingBag className="h-4 w-4" /> : <FiMapPin className="h-4 w-4" />}
              {tab === 'online' ? 'Online Products' : 'Local Nurseries'}
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════
            ONLINE PRODUCTS
        ══════════════════════════════════════ */}
        {activeTab === 'online' && (
          <>
            {/* Category filter pills */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <FiFilter className="h-3.5 w-3.5" /> Filter:
              </span>
              {categories.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => setActiveCat(c.tag)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    activeCat === c.tag
                      ? 'bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/25'
                      : 'border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div ref={productsRef} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <a
                  key={product.id}
                  href={product.link}
                  target="_blank"
                  rel="noreferrer"
                  className="product-card group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/25 hover:shadow-2xl hover:shadow-emerald-900/20"
                >
                  {/* Product image */}
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className="prod-img absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${product.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

                    {/* Badges */}
                    <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                      <span className="rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[10px] font-bold text-white/80 backdrop-blur-sm">
                        {product.tag}
                      </span>
                      {product.badge && (
                        <span className="rounded-full bg-emerald-400 px-2.5 py-1 text-[10px] font-black text-slate-950">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Wishlist */}
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); toggleWishlist(product.id) }}
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-sm transition hover:bg-white/20"
                    >
                      <FiHeart
                        className="h-4 w-4 transition-colors"
                        style={{ color: wishlist.has(product.id) ? '#f87171' : '#94a3b8', fill: wishlist.has(product.id) ? '#f87171' : 'none' }}
                      />
                    </button>

                    {/* Platform badge bottom */}
                    <div className="absolute bottom-2 left-3">
                      <span
                        className="rounded-full px-2 py-0.5 text-[9px] font-black"
                        style={{ background: `${platformColors[product.platform] ?? '#34d399'}22`, color: platformColors[product.platform] ?? '#34d399' }}
                      >
                        {product.platform}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="mb-2 flex-1 text-sm font-bold leading-snug text-white group-hover:text-emerald-100">
                      {product.name}
                    </h3>

                    {/* Stars */}
                    <div className="mb-3 flex items-center gap-1.5">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className="h-3 w-3"
                            style={{ color: '#fbbf24', fill: i < Math.floor(parseFloat(product.rating)) ? '#fbbf24' : 'none' }}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-white">{product.rating}</span>
                      <span className="text-[10px] text-slate-500">({product.reviews})</span>
                    </div>

                    {/* Price + arrow */}
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-black text-emerald-300">{product.price}</span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-3 py-1.5 text-[11px] font-bold text-emerald-300 transition-colors group-hover:bg-emerald-400 group-hover:text-slate-950">
                        Buy Now <FiExternalLink className="h-3 w-3" />
                      </span>
                    </div>
                  </div>

                  {/* Bottom glow */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </a>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-20 text-center text-slate-500">
                No products in this category yet. <button type="button" className="text-emerald-400 underline" onClick={() => setActiveCat(null)}>Clear filter</button>
              </div>
            )}
          </>
        )}

        {/* ══════════════════════════════════════
            LOCAL NURSERIES
        ══════════════════════════════════════ */}
        {activeTab === 'local' && (
          <div ref={nurseriesRef} className="grid gap-6 lg:grid-cols-[1fr_360px]">

            <div className="space-y-4">
              {/* Location bar */}
              <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-3">
                <p className="text-sm font-semibold text-slate-200">
                  {userCoords ? 'Showing nurseries near you' : 'Browse nurseries across India'}
                </p>
                <button
                  type="button"
                  onClick={handleUseMyLocation}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-4 py-2 text-xs font-bold text-emerald-300 transition hover:bg-emerald-400/20"
                >
                  {isLocating
                    ? <><span className="h-3 w-3 animate-spin rounded-full border-2 border-emerald-300 border-t-transparent" />Locating…</>
                    : <><FiMapPin className="h-3.5 w-3.5" />Use my location</>
                  }
                </button>
              </div>
              {locationError && <p className="text-xs text-amber-300">{locationError}</p>}

              {nurseries.map((nursery) => (
                <div
                  key={nursery.id}
                  className="nursery-card group overflow-hidden rounded-3xl border border-white/10 bg-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:shadow-2xl hover:shadow-emerald-900/20"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="relative h-44 w-full overflow-hidden md:h-auto md:w-56 md:shrink-0">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url('${nursery.image}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/60 md:block hidden" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/70 md:hidden" />
                      <div className="absolute left-3 top-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/55 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                          <FiMapPin className="h-3 w-3 text-emerald-400" />
                          {nursery.city}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col justify-between p-5">
                      <div>
                        <div className="mb-1 flex items-start justify-between gap-3">
                          <h3 className="text-base font-black text-white">{nursery.name}</h3>
                          <div className="flex shrink-0 items-center gap-1 rounded-full bg-yellow-400/10 px-2.5 py-1">
                            <FiStar className="h-3 w-3 text-yellow-400" style={{ fill: '#facc15' }} />
                            <span className="text-xs font-bold text-white">{nursery.rating}</span>
                          </div>
                        </div>
                        <p className="mb-3 text-xs font-semibold text-emerald-400">{nursery.plants}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {nursery.specialties.map((s) => (
                            <span key={s} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-300">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <a
                          href={buildWhatsApp(nursery)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-300"
                        >
                          <FiSend className="h-3.5 w-3.5" />
                          WhatsApp Vendor
                        </a>
                        <a
                          href={nursery.googleMaps}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-5 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-white/10"
                        >
                          <FiMapPin className="h-3.5 w-3.5" />
                          View on Maps
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="sticky top-24 h-fit overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
              <div className="border-b border-white/8 px-5 py-4">
                <p className="text-sm font-bold text-white">Nursery Map</p>
                <p className="text-xs text-slate-400">Tap a marker for WhatsApp or Maps link</p>
              </div>
              <div className="h-[540px] w-full overflow-hidden">
                <AnyMapContainer
                  center={userCoords ?? [22.9734, 78.6569]}
                  zoom={5}
                  scrollWheelZoom={false}
                  className="h-full w-full"
                >
                  <AnyTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {nurseries.map((nursery) => (
                    <Marker key={nursery.id} position={nursery.coords}>
                      <Popup>
                        <div className="space-y-1.5 text-xs">
                          <p className="font-bold">{nursery.name}</p>
                          <p className="text-slate-500">{nursery.city} · {nursery.plants}</p>
                          <a href={buildWhatsApp(nursery)} target="_blank" rel="noreferrer"
                            className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-3 py-1.5 text-[11px] font-semibold text-emerald-700">
                            <FiSend className="h-3 w-3" /> WhatsApp vendor
                          </a>
                          <a href={nursery.googleMaps} target="_blank" rel="noreferrer"
                            className="ml-2 inline-flex items-center gap-1 rounded-full bg-sky-500/10 px-3 py-1.5 text-[11px] font-semibold text-sky-600">
                            <FiMapPin className="h-3 w-3" /> Google Maps
                          </a>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </AnyMapContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
