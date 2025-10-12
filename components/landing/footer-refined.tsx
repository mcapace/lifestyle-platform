import Link from "next/link";

export function FooterRefined() {
  return (
    <footer className="bg-stone-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="text-2xl font-serif text-zinc-900 dark:text-white mb-4">
              Lifestyle
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-sm">
              A verified community where sophistication meets authentic connection.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-white mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <Link href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-white mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <Link href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Safety
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500 dark:text-zinc-600">
          <p>© 2025 Lifestyle Platform. All rights reserved.</p>
          <p>18+ Only • Verified Community • Privacy First</p>
        </div>
      </div>
    </footer>
  );
}

