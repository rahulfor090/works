import React from 'react';
import { BookOpen, Video, FileText, Briefcase } from 'lucide-react';
import { mockData } from '../mock';

const iconMap = {
  BookOpen: BookOpen,
  Video: Video,
  FileText: FileText,
  Briefcase: Briefcase
};

const StatsSection = () => {
  return (
    <section className="relative py-16 -mt-20 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0A2540] via-[#1E3A8A] to-[#0A2540] rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {mockData.stats.map((stat, index) => {
              const Icon = iconMap[stat.icon];
              return (
                <div
                  key={stat.id}
                  className="bg-gradient-to-br from-[#0A2540] to-[#1E3A8A] p-8 text-center group hover:from-[#1E3A8A] hover:to-[#3B82F6] transition-all duration-300 cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                      <Icon size={32} className="text-white" />
                    </div>
                    <div className="text-4xl lg:text-5xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                      {stat.count}
                    </div>
                    <div className="text-lg text-white/80 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
