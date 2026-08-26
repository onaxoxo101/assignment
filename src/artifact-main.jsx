import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './styles/global.css'

/**
 * Entry point for the single-file preview build.
 *
 * Two differences from src/main.jsx, both about the viewing surface rather
 * than the design:
 *   - HashRouter, because the preview is served as one static document with
 *     no server to rewrite deep paths.
 *   - The 1440px artboard is scaled to fit narrower viewports, the way Figma
 *     presents a frame. Proportions are untouched and at >= 1440px it renders
 *     1:1; this only avoids a sideways scrollbar on smaller screens.
 */
function FitToWidth({ children }) {
  useEffect(() => {
    const root = document.getElementById('root')
    if (!root) return

    const fit = () => {
      const scale = Math.min(1, window.innerWidth / 1440)
      root.style.transform = scale < 1 ? `scale(${scale})` : ''
      root.style.transformOrigin = 'top center'
      // Reclaim the vertical space the transform leaves behind.
      document.body.style.height = scale < 1 ? `${root.scrollHeight * scale}px` : ''
    }

    fit()
    window.addEventListener('resize', fit)
    const observer = new ResizeObserver(fit)
    observer.observe(root)
    return () => {
      window.removeEventListener('resize', fit)
      observer.disconnect()
    }
  }, [])

  return children
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <FitToWidth>
        <App />
      </FitToWidth>
    </HashRouter>
  </React.StrictMode>
)
