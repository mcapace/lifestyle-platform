import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-stone-800 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-serif text-amber-200 mb-4">
              [Brand]
            </div>
            <p className="text-stone-500 text-sm">
              The lifestyle community, elevated with sophistication and security.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Platform</h4>
            <ul className="space-y-2 text-stone-400 text-sm">
              <li>
                <Link href="#" className="hover:text-amber-200 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-200 transition-colors">
                  Verification
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-200 transition-colors">
                  Safety
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-200 transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-stone-400 text-sm">
              <li>
                <Link href="#" className="hover:text-amber-200 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-200 transition-colors">
                  Guidelines
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-200 transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-200 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-stone-400 text-sm">
              <li>
                <Link href="#" className="hover:text-amber-200 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-200 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-200 transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-200 transition-colors">
                  Trust & Safety
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-stone-500 text-sm">
          <p>© 2025 [Brand]. All rights reserved.</p>
          <p>18+ Only • Verified Community • Privacy Guaranteed</p>
        </div>
      </div>
    </footer>
  );
}

