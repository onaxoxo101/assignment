import { useState } from 'react'
import { asset } from '../data/figmaAssets'

/**
 * Renders an image from the Figma asset manifest.
 *
 * The PNGs are produced by `npm run fetch:assets`. Until that has been run the
 * file is absent, so the element removes itself and the container's own fill
 * shows through — the designed box keeps its exact dimensions either way.
 */
export default function AssetImage({ name, alt = '', className }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null

  return (
    <img
      className={className}
      src={asset(name)}
      alt={alt}
      onError={() => setFailed(true)}
      draggable={false}
    />
  )
}
