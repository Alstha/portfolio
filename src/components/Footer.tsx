'use client'

export default function Footer() {
  return (
    <footer className="py-12 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start mb-4">
              <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-xl font-bold">A</span>
              </div>
              <span className="text-2xl font-bold text-white">Alstha</span>
            </div>
            <p className="text-white text-sm leading-relaxed">
              AI/ML enthusiast and tech startup founder from Nepal, focused on innovation and positive impact.
            </p>
          </div>

          {/* Quick Links & Connect - Side by Side on Mobile */}
          <div className="flex flex-row justify-center items-start gap-8 col-span-1 sm:col-span-2">
            {/* Quick Links */}
            <div className="text-center">
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a 
                  href="#about" 
                  className="block text-white hover:text-accent-300 transition-colors text-sm"
                >
                  About
                </a>
                <a 
                  href="#projects" 
                  className="block text-white hover:text-accent-300 transition-colors text-sm"
                >
                  Projects
                </a>
                <a 
                  href="#contact" 
                  className="block text-white hover:text-accent-300 transition-colors text-sm"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Connect */}
            <div className="text-center">
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <div className="space-y-2 text-sm">
                <p className="text-white">📍 Kathmandu, Nepal</p>
                <p className="text-white">🎓 Islington College</p>
                <p className="text-white">🚀 AI/ML & Innovation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-premium-600/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white text-sm mb-4 md:mb-0">
            © 2025 Alson Shrestha. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a 
              href="https://github.com/Alstha" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-accent-300 transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.579.688.481C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/alson-shrestha-46803b346/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-accent-300 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.966 0-1.75-.79-1.75-1.76s.784-1.76 1.75-1.76 1.75.79 1.75 1.76-.784 1.76-1.75 1.76zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z"/></svg>
            </a>
            <a 
              href="mailto:alsthadotcom@gmail.com"
              className="text-white hover:text-accent-300 transition-colors"
              aria-label="Email"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zm0 12H4V8.99l8 6.99 8-6.99V18z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 