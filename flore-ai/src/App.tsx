import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from './components/layout/Navbar'
import { Shell } from './components/layout/Shell'
import { Footer } from './components/layout/Footer'
import { Landing } from './pages/Landing'
import { AiDoctor } from './pages/AiDoctor'
import { Marketplace } from './pages/Marketplace'
import { AiGardener } from './pages/AiGardener'
import { LmsCommunity } from './pages/LmsCommunity'
import { PlantSwap } from './pages/PlantSwap'
import { Auth } from './pages/Auth'
import { About } from './pages/About'

function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/ai-doctor" element={<Shell><AiDoctor /></Shell>} />
            <Route path="/marketplace" element={<Shell><Marketplace /></Shell>} />
            <Route path="/ai-gardener" element={<Shell><AiGardener /></Shell>} />
            <Route path="/lms" element={<Shell><LmsCommunity /></Shell>} />
            <Route path="/plant-swap" element={<Shell><PlantSwap /></Shell>} />
            <Route path="/auth" element={<Shell><Auth /></Shell>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default App
