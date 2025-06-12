'use client'

export default function Footer() {
  return (
    <footer className="py-12 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-xl font-bold">A</span>
              </div>
              <span className="text-2xl font-bold text-premium-50">Alstha</span>
            </div>
            <p className="text-premium-300 text-sm leading-relaxed">
              AI/ML enthusiast and tech startup founder from Nepal, focused on innovation and positive impact.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-premium-50 font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a 
                href="#about" 
                className="block text-premium-300 hover:text-accent-300 transition-colors text-sm"
              >
                About
              </a>
              <a 
                href="#projects" 
                className="block text-premium-300 hover:text-accent-300 transition-colors text-sm"
              >
                Projects
              </a>
              <a 
                href="#contact" 
                className="block text-premium-300 hover:text-accent-300 transition-colors text-sm"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h3 className="text-premium-50 font-semibold mb-4">Connect</h3>
            <div className="space-y-2 text-sm">
              <p className="text-premium-300">📍 Kathmandu, Nepal</p>
              <p className="text-premium-300">🎓 Islington College</p>
              <p className="text-premium-300">🚀 AI/ML & Innovation</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-premium-600/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-premium-400 text-sm mb-4 md:mb-0">
            © 2025 Alson Shrestha. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a 
              href="https://github.com/Alstha" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-premium-400 hover:text-accent-300 transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/alson-shrestha-46803b346/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-premium-400 hover:text-accent-300 transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="mailto:alsthadotcom@gmail.com"
              className="text-premium-400 hover:text-accent-300 transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 