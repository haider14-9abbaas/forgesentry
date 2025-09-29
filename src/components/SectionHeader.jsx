import { motion } from 'framer-motion';

const SectionHeader = ({
  icon: Icon,
  title,
  subtitle,
  badge,
  className = '',
  center = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`${center ? 'text-center' : ''} ${className}`}
    >
      <div
        className={`flex items-center ${
          center ? 'justify-center' : 'justify-between'
        } mb-4`}
      >
        <div className="flex items-center space-x-4">
          {Icon && (
            <div
              className="flex items-center justify-center w-12 h-12 rounded-xl"
              style={{ backgroundColor: 'rgba(34,211,238,0.12)' }} // cyan/10
            >
              <Icon className="h-6 w-6" style={{ color: 'var(--cn-cyan, #22D3EE)' }} />
            </div>
          )}
          <div>
            <h2 className="text-2xl lg:text-3xl font-display font-bold text-slate-900">
              {title}
            </h2>
            {subtitle && <p className="text-slate-600 mt-2">{subtitle}</p>}
          </div>
        </div>

        {badge && !center && (
          <div
            className="badge badge-lg font-medium"
            style={{
              backgroundColor: 'var(--cn-cyan, #22D3EE)',
              color: '#0B0F19',
              borderColor: 'transparent',
            }}
          >
            {badge}
          </div>
        )}
      </div>

      {badge && center && (
        <div className="flex justify-center mt-4">
          <div
            className="badge badge-lg font-medium"
            style={{
              backgroundColor: 'var(--cn-cyan, #22D3EE)',
              color: '#0B0F19',
              borderColor: 'transparent',
            }}
          >
            {badge}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SectionHeader;
