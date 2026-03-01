import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="flex justify-center">
      <main className="container mx-auto max-w-[700px] px-6 py-10">
        {/* Profile Section */}
        <div className="flex flex-nowrap items-center justify-center space-x-6">
          {/* ID Image */}
          <div className="w-[250px]">
            <img src="/assets/img/imgs_cofounders/alex_logo_japan.JPG" alt="Alex Martí Guiu" className="w-full h-auto" />
          </div>
          {/* Content */}
          <div className="w-[250px] text-left">
            <h1 className="text-2xl ml-6 font-semibold">Alex Martí Guiu</h1>
            <p className="text-md ml-6 mt-2 font-medium">💻 Data Scientist and Engineer </p>
            <p className="text-md ml-6 mt-1 font-medium">📍 Zürich (Switzerland)</p>

            {/* Navigation Buttons */}
            <div className="mt-4 ml-5 flex flex-col space-y-2">
              <Link to="/research" className="linkedin-link">
                <span className="logo research"></span> Research & Projects
              </Link>
              <Link to="/timeline" className="linkedin-link">
                <span className="logo research"></span> Timeline
              </Link>
              <a href="/assets/cv/cv_alexmartiguiu.pdf" className="linkedin-link" target="_blank" rel="noreferrer">
                <span className="logo cv"></span> CV
              </a>
              <Link to="/hobbies" className="linkedin-link">
                <span className="logo hobbies"></span> Hobbies
              </Link>
            </div>
          </div>
        </div>

        {/* About Section */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold">About me!</h2>
          <p className="mt-2">
            Currently studying <span className="text-gray-600 font-semibold">MSc Management, Technology and Economics</span> at
            <span className="logo eth"></span>. Previously: <span className="text-gray-600 font-semibold">Data Scientist</span> at Gieni AI (Zurich)
            <span className="logo gieni"></span>, <span className="text-gray-600 font-semibold">Deep Learning Engineer</span> for two years at Mediapro
            <span className="logo mediapro"></span>, <span className="text-gray-600 font-semibold">Research Assistant</span> at the LTS2 lab in École Polytechnique Fédérale de Lausanne
            <span className="logo epfl"></span>, 4-year <span className="text-gray-600 font-semibold">BSc Data Science and Engineering</span> at Universitat Politècnica de Catalunya 
            <span className="logo upc"></span>.
          </p>
        </section>

        <section className="mt-3">
          I am very interested in the intersection of AI, 
          data science, and business. My ongoing research involves sustainability, deep learning and ethical regulation of
          AI. Strong technical skills in machine learning (particularly computer vision and NLP), data analytics and
          strategic understanding of business and policy implications.
        </section>

        {/* Technical expertise section */}
        <section className="mt-4">
          <h2 className="text-lg font-semibold">Technical expertise:</h2>
          <ul className="list-disc mt-2 ml-5 space-y-1">
            <li><span className="text-gray-600 font-semibold">Programming languages:</span> Python, R, SQL, C++, HTML, LaTeX, SPSS, STATA.</li>
            <li><span className="text-gray-600 font-semibold">Libraries:</span> PyTorch, TensorFlow, LangChain, OpenCV, Pandas, Matplotlib, SciPy.</li>
            <li><span className="text-gray-600 font-semibold">Data Science:</span> Statistics, Regression (LMs, GLMs), Clustering, Graphs, Trees.</li>
            <li><span className="text-gray-600 font-semibold">Deep Learning:</span> Computer Vision, NLP, RAG, Agents, custom models.</li>
            <li><span className="text-gray-600 font-semibold">Software Engineering:</span> Git, Jira, Agile, Docker, Flask, Kubernetes, AWS, Azure.</li>
          </ul>
        </section>

        {/* Contact Section */}
        <section className="container mx-auto px-6 py-6 text-center hidden sm:block">
          <h2 className="text-lg font-medium">Contact:</h2>
          <div className="flex justify-center items-center space-x-4 py-3">
            <a href="mailto:alexmartiguiu@gmail.com" className="linkedin-link" target="_blank" rel="noreferrer">
              <img src="/assets/img/logos/email.png" alt="Email" className="linkedin-icon" />
              alexmartiguiu@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/alexmartiguiu/" className="linkedin-link" target="_blank" rel="noreferrer">
              <img src="/assets/img/logos/linkedin.png" alt="Linkedin" className="linkedin-icon" />
              Linkedin
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
