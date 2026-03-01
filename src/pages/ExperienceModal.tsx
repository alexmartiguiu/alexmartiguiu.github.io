import { motion, AnimatePresence } from 'motion/react'

export type TimelineItem = {
  id: string
  type: string
  title: string
  subtitle: string
  startRaw: string
  endRaw: string
  ongoing: boolean
  color: string
  link: string
  logoClass: string
  detailed_experience?: string
  achievements?: string
  links?: string
}

interface ExperienceModalProps {
  item: TimelineItem | null
  onClose: () => void
}

export function ExperienceModal({ item, onClose }: ExperienceModalProps) {
  // Parse achievements (separated by semicolon in CSV)
  const achievementsList = item?.achievements 
    ? item.achievements.split(';').filter(a => a.trim() !== '') 
    : [];
  
  // Parse links (format Name:URL separated by semicolon)
  const linksList = item?.links 
    ? item.links.split(';').filter(l => l.trim() !== '').map(l => {
        const [name, ...urlParts] = l.split(':');
        const url = urlParts.join(':');
        return { name: name.trim(), url: url ? url.trim() : '#' };
      })
    : [];

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 relative">
              <button
                onClick={onClose}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors p-2 bg-gray-50 dark:bg-gray-800 rounded-full"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div className="flex justify-between items-start mb-6 pr-10">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">{item.title}</h3>
                  <p className="text-base text-gray-600 dark:text-gray-400 font-medium">{item.subtitle}</p>
                </div>
                {item.logoClass && (
                  <div className={`logo ${item.logoClass} scale-150 transform origin-top-right ml-4 shrink-0`} />
                )}
              </div>

              <div className="text-sm font-medium mb-8 flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full capitalize ${
                  item.type === 'education' ? 'bg-blue-100 text-blue-700' :
                  item.type === 'work' ? 'bg-green-100 text-green-700' :
                  item.type === 'research' ? 'bg-cyan-100 text-cyan-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {item.type}
                </span>
                <span className="text-gray-300 dark:text-gray-700">|</span>
                <span className="text-gray-500 dark:text-gray-400">{item.startRaw} — {item.ongoing ? 'Present' : item.endRaw}</span>
              </div>

              <div className="space-y-8">
                {item.detailed_experience && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase">Overview</h4>
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed font-light">
                      {item.detailed_experience}
                    </p>
                  </div>
                )}

                {achievementsList.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase">Key Achievements</h4>
                    <ul className="space-y-4">
                      {achievementsList.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-4 text-gray-700 dark:text-gray-300">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                          <span className="text-[15px] leading-snug">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap gap-3 pt-6 mt-4 border-t border-gray-100 dark:border-gray-800">
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:opacity-90 transition-all text-sm"
                    >
                      Official Website
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  )}
                  {linksList.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-750 transition-all text-sm"
                    >
                      {link.name}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
