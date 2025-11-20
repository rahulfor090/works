import React from 'react';
import { Button } from './ui/button';
import { Play, Stethoscope, Pill, HeartPulse } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0F9FF] via-white to-[#FFF5F5]"></div>
      
      {/* Floating Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#3B82F6]/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-40 right-20 w-48 h-48 bg-[#FF6B6B]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-[#10B981]/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fadeIn">
            <div className="inline-block">
              <span className="px-4 py-2 bg-[#3B82F6]/10 text-[#3B82F6] rounded-full text-sm font-medium backdrop-blur-sm">
                Trusted by 50,000+ Medical Professionals
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-[#0A2540] leading-tight">
              Empowering
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] mt-2">
                Medical Minds
              </span>
            </h1>

            <p className="text-lg text-[#64748B] leading-relaxed max-w-xl">
              Jaypee products are being distributed globally by renowned distributors in the USA, Central and South America, UK, Canada, Europe, Africa, Middle East, South East Asia, North Asia.
            </p>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'Medicine', icon: Stethoscope },
                { name: 'Dentistry', icon: Pill },
                { name: 'Nursing', icon: HeartPulse }
              ].map((category, index) => (
                <button
                  key={category.name}
                  className="group px-6 py-3 bg-white hover:bg-gradient-to-r hover:from-[#3B82F6] hover:to-[#2563EB] text-[#0A2540] hover:text-white rounded-xl shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 flex items-center gap-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <category.icon size={18} />
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] hover:from-[#FF5252] hover:to-[#FF7043] text-white px-8 py-6 text-base shadow-xl shadow-[#FF6B6B]/25 hover:shadow-2xl hover:shadow-[#FF6B6B]/40 transition-all duration-300 transform hover:-translate-y-1"
              >
                Explore Resources
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white px-6 py-6 text-base transition-all duration-300 flex items-center gap-2 group"
              >
                <Play size={18} className="group-hover:scale-110 transition-transform" />
                Watch Video
              </Button>
            </div>
          </div>

          {/* Right Visual - Medical Journals Display */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Main Journal Stack */}
              <div className="relative transform hover:scale-105 transition-transform duration-500">
                {/* Journal 1 */}
                <div
                  className="absolute top-0 left-0 w-56 h-80 rounded-lg shadow-2xl transform -rotate-6 hover:rotate-0 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    zIndex: 1
                  }}
                >
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div>
                      <div className="text-white/80 text-xs font-semibold mb-2">JOURNAL</div>
                      <h3 className="text-white font-bold text-lg mb-2">Advanced Science</h3>
                      <p className="text-white/70 text-xs">Open Access</p>
                    </div>
                    <div className="text-white/60 text-xs">Vol. 12, Issue 4</div>
                  </div>
                </div>

                {/* Journal 2 */}
                <div
                  className="absolute top-8 left-12 w-56 h-80 rounded-lg shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    zIndex: 2
                  }}
                >
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div>
                      <div className="text-white/80 text-xs font-semibold mb-2">RESEARCH</div>
                      <h3 className="text-white font-bold text-lg mb-2">Clinical Medicine</h3>
                      <p className="text-white/70 text-xs">Peer Reviewed</p>
                    </div>
                    <div className="text-white/60 text-xs">Vol. 8, Issue 2</div>
                  </div>
                </div>

                {/* Journal 3 */}
                <div
                  className="absolute top-16 left-24 w-56 h-80 rounded-lg shadow-2xl transform rotate-6 hover:rotate-0 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    zIndex: 3
                  }}
                >
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div>
                      <div className="text-white/80 text-xs font-semibold mb-2">JOURNAL</div>
                      <h3 className="text-white font-bold text-lg mb-2">Medical Innovation</h3>
                      <p className="text-white/70 text-xs">Monthly Edition</p>
                    </div>
                    <div className="text-white/60 text-xs">Vol. 15, Issue 7</div>
                  </div>
                </div>
              </div>

              {/* Decorative Circles */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#CBD5E1] rounded-full flex justify-center">
          <div className="w-1.5 h-2 bg-[#CBD5E1] rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
