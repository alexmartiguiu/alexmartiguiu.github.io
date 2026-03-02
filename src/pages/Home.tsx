import { Link } from 'react-router-dom'
import { Laptop, MapPin, Microscope, FileText, Mountain } from 'lucide-react'
import { Timeline } from './Timeline'

export default function Home() {
  return (
    <div className="flex justify-center">
      <main className="container mx-auto max-w-[900px] px-6 py-10">
        {/* Top Profile & Bio Row */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* 1. Left Container: Image + Links */}
          <div className="flex-1 flex flex-row gap-4">
            {/* Profile Image */}
            <div className="w-[180px] flex-shrink-0">
              <img src="/assets/img/imgs_cofounders/alex_logo_japan.JPG" alt="Alex Martí Guiu" className="w-full h-auto rounded-lg shadow-sm" />
            </div>

            {/* Basic Info & Links */}
            <div className="flex flex-col pt-1">
              <div className="text-left mb-6">
                <h1 className="text-xl font-semibold whitespace-nowrap">Alex Martí Guiu</h1>
              <p className="text-sm mt-1 font-medium italic text-gray-600"><Laptop className="inline mr-1" size={16} /> Data Scientist & Engineer</p>
              <p className="text-sm mt-0.5 font-medium italic text-gray-600"><MapPin className="inline mr-1" size={16} /> Zürich (Switzerland)</p>
              </div>
              
              <div className="flex flex-col space-y-2">
                <Link to="/research" className="linkedin-link text-sm">
                  <Microscope className="inline mr-1" size={16} /> Research
                </Link>
                <a href="/assets/cv/cv_alexmarti_2026.pdf" className="linkedin-link text-sm" target="_blank" rel="noreferrer">
                  <FileText className="inline mr-1" size={16} /> CV
                </a>
                <Link to="/hobbies" className="linkedin-link text-sm">
                  <Mountain className="inline mr-1" size={16} /> Hobbies
                </Link>
              </div>
            </div>
          </div>

          {/* 2. About Me (Far Right) */}
          <div className="flex-1 pt-1 border-l pl-8 border-gray-200">
            <h2 className="text-lg font-semibold mb-2">About me!</h2>
            <p className="text-md leading-relaxed">
              Currently studying <span className="text-gray-600 font-semibold">MSc Management, Technology and Economics</span> at
              <span className="logo eth"></span>. Previously: <span className="text-gray-600 font-semibold">Data Scientist</span> at Gieni AI (Zürich)
              <span className="logo gieni"></span>, <span className="text-gray-600 font-semibold">Deep Learning Engineer</span> for two years at Mediapro
              <span className="logo mediapro"></span>, <span className="text-gray-600 font-semibold">Research Assistant</span> at the LTS2 lab in École Polytechnique Fédérale de Lausanne
              <span className="logo epfl"></span>, 4-year <span className="text-gray-600 font-semibold">BSc Data Science and Engineering</span> at Universitat Politècnica de Catalunya 
              <span className="logo upc"></span>.
            </p>
          </div>
        </div>

        {/* Full-width Bio Block */}
        <section className="mt-6">
          <p className="text-md leading-relaxed">
            I am very interested in the intersection of AI, data science, and business. My ongoing research involves multimodality, deep learning and agents for Neuroscience, Human Rights and Climate. Strong technical skills in machine learning (particularly computer vision and NLP), agents,  data analytics and strategic understanding of business and product.
          </p>
        </section>

        {/* Timeline Section */}
        <div className="mt-8 px-4">
          <Timeline />
        </div>

        {/* Technical expertise section */}
        <section className="mt-12">
          <div>
            <h2 className="text-lg font-semibold border-b border-gray-100 pb-2">Technical expertise:</h2>
            <ul className="list-disc mt-4 ml-5 space-y-1 text-md">
              <li><span className="text-gray-600 font-semibold">Languages:</span> English (C2), Spanish (Native), French (B1), Catalan (Native).</li>
              <li><span className="text-gray-600 font-semibold">Programming:</span> Python, R, C++, SQL, MATLAB, TypeScript, JavaScript, React, NextJS, SPSS, Stata, LaTeX.</li>
              <li><span className="text-gray-600 font-semibold">ML & Libraries:</span> PyTorch, TensorFlow, NumPy, Pandas, SciPy, OpenCV, Hugging Face, W&B, LangChain, Langraph.</li>
              <li><span className="text-gray-600 font-semibold">Data Science:</span> Statistics, Regression (LMs, GLMs), Clustering, Graphs, Trees, A/B Testing, ETL, Data Visualization, Time Series, Hypothesis Testing.</li>
              <li><span className="text-gray-600 font-semibold">Deep Learning:</span> Computer Vision, NLP, RAG, Multi-Agent Systems, Contrastive Learning, GANs, custom models.</li>
              <li><span className="text-gray-600 font-semibold">Software Engineering:</span> Git, Jira, Agile, Docker, FastAPI, Flask, Kubernetes, APIs, OOP, Unit Testing, AWS, Azure.</li>
              <li><span className="text-gray-600 font-semibold">Agentic AI:</span> Cursor, Claude Code, Codex (over 1 year of daily experience in SWE roles).</li>
            </ul>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mt-12 pt-8 border-t border-gray-200 text-center">
          <div className="flex justify-center items-center space-x-8">
            <a href="mailto:alexmartiguiu@gmail.com" className="linkedin-link text-sm" target="_blank" rel="noreferrer">
              <img src="/assets/img/logos/email.png" alt="Email" className="linkedin-icon" />
              alexmartiguiu@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/alexmartiguiu/" className="linkedin-link text-sm" target="_blank" rel="noreferrer">
              <img src="/assets/img/logos/linkedin.png" alt="Linkedin" className="linkedin-icon" />
              Linkedin
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
