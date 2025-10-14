"use client";

import { motion } from "framer-motion";
import { AppleLogo, GooglePlayLogo, ArrowRight, CheckCircle, Users, Calendar, Globe, Sparkle } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkle weight="fill" size={24} className="text-brand-500" />
              <span className="text-xl font-semibold text-white">ELOURA</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="#features" className="text-neutral-400 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#download" className="text-neutral-400 hover:text-white transition-colors">
                Download
              </Link>
              <Link href="/waitlist" className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors">
                Join Waitlist
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
                Explore Life.<br />
                Build <span className="text-brand-500">Community</span>.<br />
                Live Authentically.
              </h1>
              <p className="text-xl text-neutral-400 mb-8 leading-relaxed">
                ELOURA is a premium lifestyle exploration platform where authentic connections 
                and curated experiences await. Go beyond dating—discover your lifestyle.
              </p>

              {/* Download Buttons */}
              <div id="download" className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href="#"
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-white text-black rounded-2xl hover:bg-neutral-100 transition-colors group"
                >
                  <AppleLogo weight="fill" size={32} />
                  <div className="text-left">
                    <div className="text-xs text-neutral-600">Download on the</div>
                    <div className="text-lg font-semibold">App Store</div>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-white text-black rounded-2xl hover:bg-neutral-100 transition-colors group"
                >
                  <GooglePlayLogo weight="fill" size={32} />
                  <div className="text-left">
                    <div className="text-xs text-neutral-600">Get it on</div>
                    <div className="text-lg font-semibold">Google Play</div>
                  </div>
                </a>
              </div>

              <div className="flex items-center gap-6 text-sm text-neutral-500">
                <div className="flex items-center gap-2">
                  <CheckCircle weight="fill" size={16} className="text-green-500" />
                  <span>Free to download</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle weight="fill" size={16} className="text-green-500" />
                  <span>Premium features available</span>
                </div>
              </div>
            </motion.div>

            {/* App Screenshot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[9/16] max-w-sm mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-purple-500/20 rounded-[3rem] blur-3xl" />
                <div className="relative bg-neutral-900 border border-neutral-800 rounded-[3rem] p-3 shadow-2xl">
                  <div className="bg-black rounded-[2.5rem] overflow-hidden aspect-[9/16]">
                    <div className="p-6 text-center">
                      <div className="text-6xl mb-4">📱</div>
                      <div className="text-white text-sm">App Screenshot</div>
                      <div className="text-neutral-500 text-xs mt-2">Coming Soon</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-4">Everything You Need</h2>
            <p className="text-xl text-neutral-400">Premium features for authentic lifestyle exploration</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users weight="fill" size={32} />,
                title: 'Communities',
                description: 'Join interest-based communities and connect with like-minded explorers.'
              },
              {
                icon: <Calendar weight="fill" size={32} />,
                title: 'Events',
                description: 'RSVP to exclusive events and create memorable experiences together.'
              },
              {
                icon: <Globe weight="fill" size={32} />,
                title: 'Discovery',
                description: 'Explore people, places, and experiences through an intelligent map interface.'
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-neutral-800/50 border border-neutral-700 rounded-2xl p-8"
              >
                <div className="w-16 h-16 bg-brand-500/10 border border-brand-500/20 rounded-2xl flex items-center justify-center mb-6 text-brand-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-brand-500/10 to-purple-500/10 border border-brand-500/20 rounded-3xl p-12"
          >
            <h2 className="text-4xl font-light text-white mb-4">
              Ready to Start Exploring?
            </h2>
            <p className="text-xl text-neutral-300 mb-8">
              Download ELOURA today and join thousands discovering authentic lifestyle connections.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-2xl hover:bg-neutral-100 transition-colors font-semibold"
              >
                <AppleLogo weight="fill" size={24} />
                Download for iOS
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-2xl hover:bg-neutral-100 transition-colors font-semibold"
              >
                <GooglePlayLogo weight="fill" size={24} />
                Download for Android
              </a>
            </div>

            <div className="mt-8">
              <Link 
                href="/waitlist"
                className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 transition-colors"
              >
                Or join the waitlist for early access
                <ArrowRight weight="bold" size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkle weight="fill" size={20} className="text-brand-500" />
                <span className="text-lg font-semibold text-white">ELOURA</span>
              </div>
              <p className="text-neutral-400 text-sm">
                Premium lifestyle exploration platform
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#download" className="hover:text-white transition-colors">Download</a></li>
                <li><Link href="/waitlist" className="hover:text-white transition-colors">Waitlist</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guidelines</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-800 pt-8 text-center text-neutral-500 text-sm">
            © 2024 ELOURA. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
