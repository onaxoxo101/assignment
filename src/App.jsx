import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CaseStudyPage from './pages/CaseStudyPage'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case-study/:slug" element={<CaseStudyPage />} />
      </Routes>
    </>
  )
}
