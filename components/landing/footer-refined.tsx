import Link from "next/link";

export function FooterRefined() {
  return (
    <footer className="py-12 px-6 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="text-lg font-medium text-white mb-4">[Brand]</div>
            <p className="text-sm text-neutral-600">
              The lifestyle community, elevated.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-white mb-3">Platform</h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Verification
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-white mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Guidelines
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-white mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Trust & Safety
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-600">
          <p>© 2025 [Brand]. All rights reserved.</p>
          <p>18+ Only • Verified Community • Privacy Guaranteed</p>
        </div>
      </div>
    </footer>
  );
}
