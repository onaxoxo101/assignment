import Button from '../components/Button'
import Eyebrow from '../components/Eyebrow'
import ProjectCard from '../components/ProjectCard'
import { Reveal } from '../components/motion'
import { PROJECTS } from '../data/projects'
import './LiveProjects.css'

/** Figma: "Section / Live Projects" (1:66). */
export default function LiveProjects() {
  return (
    <section className="projects" id="projects">
      <Reveal className="projects__header">
        <div className="projects__titleBlock">
          <Eyebrow>SELECTED WORK</Eyebrow>
          <h2 className="projects__title">Live projects</h2>
        </div>
        <Button variant="seeAll" as="a" href="#projects">
          <span>See all work</span>
          <span aria-hidden="true">↗</span>
        </Button>
      </Reveal>

      <div className="projects__list">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
