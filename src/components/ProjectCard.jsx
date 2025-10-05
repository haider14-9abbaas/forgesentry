import { motion } from 'framer-motion';
import { PlayCircle, Github, ExternalLink, Pin } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  const { title, description, badge, technologies, liveUrl, githubUrl } = project;
  const liveIsLinkedIn = (liveUrl || '').includes('linkedin.com');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="card-hover card rounded-2xl bg-white border border-slate-200 p-6 h-full flex flex-col"
    >
      {/* Header with title and action buttons */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-display font-semibold text-slate-900 flex-1">{title}</h3>
        <div className="flex items-center space-x-1 ml-4">
          <div className="tooltip" data-tip="Pin Project">
            <button className="btn btn-ghost btn-sm p-1 hover:bg-slate-100">
              <Pin size={16} className="text-slate-500" />
            </button>
          </div>
          <div className="tooltip" data-tip="Open External">
            <button className="btn btn-ghost btn-sm p-1 hover:bg-slate-100">
              <ExternalLink size={16} className="text-slate-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Badge */}
      {badge && (
        <div className="mb-4">
          <span
            className="inline-block px-3 py-1 text-xs font-medium rounded-full"
            style={{ backgroundColor: 'rgba(163,230,53,0.12)', color: 'var(--cn-lime, #A3E635)' }}
          >
            {badge}
          </span>
        </div>
      )}

      {/* Description */}
      <p className="text-slate-600 mb-6 line-clamp-2 flex-1">{description}</p>

      {/* Tech Stack */}
      {technologies && technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="tech-pill px-2 py-1 text-xs font-medium rounded-md ring-1"
              style={{
                backgroundColor: 'rgba(34,211,238,0.06)',
                color: 'rgb(30,41,59)',
                borderColor: 'rgba(203,213,225,0.6)',
              }}
            >
              {tech}
            </span>
          ))}
          {technologies.length > 4 && (
            <span
              className="tech-pill px-2 py-1 text-xs font-medium rounded-md ring-1"
              style={{
                backgroundColor: 'rgba(34,211,238,0.06)',
                color: 'rgb(30,41,59)',
                borderColor: 'rgba(203,213,225,0.6)',
              }}
            >
              +{technologies.length - 4} more
            </span>
          )}
        </div>
      )}

      {/* CTA Buttons */}
      <div className="flex items-center space-x-3 mt-auto">
        {liveUrl ? (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm flex-1 font-medium hover:scale-105 transition-transform duration-200 rounded-lg"
            style={{
              backgroundColor: 'var(--cn-cyan, #22D3EE)',
              borderColor: 'var(--cn-cyan, #22D3EE)',
              color: '#0B0F19',
            }}
          >
            <PlayCircle size={16} />
            {liveIsLinkedIn ? 'LinkedIn' : 'Live Demo'}
          </a>
        ) : null}

        {/* Only render GitHub when provided */}
        {githubUrl ? (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-sm flex-1 rounded-lg hover:scale-105 transition-all duration-200"
            style={{ borderColor: 'rgba(203,213,225,0.8)', color: 'rgb(30,41,59)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--cn-cyan, #22D3EE)';
              e.currentTarget.style.color = 'var(--cn-cyan, #22D3EE)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(203,213,225,0.8)';
              e.currentTarget.style.color = 'rgb(30,41,59)';
            }}
          >
            <Github size={16} />
            GitHub
          </a>
        ) : null}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
