import Link from "next/link";
import { Instagram, Twitter, Mail } from "lucide-react";

export function FooterRefined() {
  return (
    <footer className="py-20 px-6 bg-black border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer */}
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="text-2xl font-light text-white mb-4 tracking-tight">
              The Lifestyle.
              <br />
              <span className="text-brand-500 italic">Elevated.</span>
            </div>
            <p className="text-sm text-neutral-500 font-light leading-relaxed mb-6">
              A private community for those who seek more. Launching Q1 2025.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <Link
                href="https://instagram.com/lifestyle.elevated"
                target="_blank"
                className="w-10 h-10 bg-neutral-900 hover:bg-brand-500/20 border border-neutral-800 hover:border-brand-500/30 flex items-center justify-center transition-all group"
              >
                <Instagram className="w-4 h-4 text-neutral-500 group-hover:text-brand-500 transition-colors" />
              </Link>
              <Link
                href="https://twitter.com/lifestyleapp"
                target="_blank"
                className="w-10 h-10 bg-neutral-900 hover:bg-brand-500/20 border border-neutral-800 hover:border-brand-500/30 flex items-center justify-center transition-all group"
              >
                <Twitter className="w-4 h-4 text-neutral-500 group-hover:text-brand-500 transition-colors" />
              </Link>
              <Link
                href="mailto:hello@lifestyle.app"
                className="w-10 h-10 bg-neutral-900 hover:bg-brand-500/20 border border-neutral-800 hover:border-brand-500/30 flex items-center justify-center transition-all group"
              >
                <Mail className="w-4 h-4 text-neutral-500 group-hover:text-brand-500 transition-colors" />
              </Link>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs text-neutral-600 uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-3 text-sm text-neutral-500 font-light">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
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
                  Membership
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-xs text-neutral-600 uppercase tracking-wider mb-4">Community</h4>
            <ul className="space-y-3 text-sm text-neutral-500 font-light">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Guidelines
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Safety
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs text-neutral-600 uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-neutral-500 font-light">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-600 font-light">
            © 2025 Lifestyle Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-neutral-600 font-light">
            <span>18+ Only</span>
            <span>·</span>
            <span>Verified Community</span>
            <span>·</span>
            <span>Privacy First</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
