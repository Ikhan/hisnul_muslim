import { Globe, Info, ExternalLink, ChevronRight } from 'lucide-react';

export function SettingsView() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-dark-200/50 dark:border-dark-200/50 border-gray-200">
        <h1 className="text-lg font-semibold text-gray-800 dark:text-white">Settings</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Language Section */}
        <section>
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Language
          </h2>
          <div className="space-y-2">
            <div className="w-full flex items-center justify-between p-4 rounded-xl
              bg-dark-100/50 dark:bg-dark-100/50 bg-gray-50
              border border-dark-200/50 dark:border-dark-200/50 border-gray-200"
            >
              <div className="flex items-center gap-3">
                <Globe size={20} className="text-primary" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">Translation Language</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">English</p>
                </div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 italic">
                More coming soon
              </span>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section>
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            About
          </h2>
          <div className="space-y-2">
            <div className="p-4 rounded-xl bg-dark-100/50 dark:bg-dark-100/50 bg-gray-50
              border border-dark-200/50 dark:border-dark-200/50 border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <Info size={20} className="text-primary" />
                <p className="text-sm font-medium text-gray-800 dark:text-white">Daily Duas</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Authentic Islamic supplications from Hisnul Muslim (Fortress of the Muslim).
                All duas are sourced from authenticated hadith collections.
              </p>
              <div className="mt-3 pt-3 border-t border-dark-200/50 dark:border-dark-200/50 border-gray-200">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Version 1.0.0
                </p>
              </div>
            </div>

            <a
              href="https://github.com/Ikhan/hisnul_muslim"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between p-4 rounded-xl
                bg-dark-100/50 dark:bg-dark-100/50 bg-gray-50
                border border-dark-200/50 dark:border-dark-200/50 border-gray-200
                hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <ExternalLink size={20} className="text-gray-400" />
                <p className="text-sm font-medium text-gray-800 dark:text-white">Send Feedback</p>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </a>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-dark-200/50 dark:border-dark-200/50 border-gray-200 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Made with love for the Ummah
        </p>
      </div>
    </div>
  );
}
