import { Hero } from './sections/Hero';
import { Philosophy } from './sections/Philosophy';
import { SkinConcerns } from './sections/SkinConcerns';
import { FeaturedProducts } from './sections/FeaturedProducts';
import { Benefits } from './sections/Benefits';

/**
 * Figma node 41:2 — "Landing Page — Marbella Skin", 1440 x 4099.
 *   01 / Hero               y=0     h=1024
 *   02 / Philosophy         y=1024  h=643
 *   03 / Skin Concerns      y=1667  h=972
 *   04 / Featured Products  y=2639  h=765
 *   05 / Benefits           y=3404  h=695
 */
export default function App() {
  return (
    <main className="canvas">
      <Hero />
      <Philosophy />
      <SkinConcerns />
      <FeaturedProducts />
      <Benefits />
    </main>
  );
}
