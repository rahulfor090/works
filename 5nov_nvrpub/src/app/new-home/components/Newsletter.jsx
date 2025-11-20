'use client';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Mail, Bell, Check } from 'lucide-react';
import { toast } from '../../../hooks/use-toast.js';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      toast({
        title: 'Successfully Subscribed!',
        description: 'You will receive our latest updates.',
      });
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 3000);
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A2540] via-[#1E3A8A] to-[#0A2540]"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-[#FF6B6B]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#3B82F6]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center">
              <Mail size={36} className="text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] rounded-full flex items-center justify-center animate-bounce">
              <Bell size={18} className="text-white" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Stay Updated with Our Newsletter
        </h2>
        <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          Get the latest updates on our courses, exclusive content, and special offers delivered straight to your inbox. Join 50,000+ learners who trust us for quality education.
        </p>

        {/* Subscription Form */}
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-14 px-6 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/40 transition-all duration-300 rounded-xl"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={isSubscribed}
              className={`h-14 px-8 font-semibold rounded-xl transition-all duration-300 ${
                isSubscribed
                  ? 'bg-[#10B981] hover:bg-[#059669]'
                  : 'bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] hover:from-[#FF5252] hover:to-[#FF7043] shadow-xl shadow-[#FF6B6B]/25'
              }`}
            >
              {isSubscribed ? (
                <span className="flex items-center gap-2">
                  <Check size={20} />
                  Subscribed
                </span>
              ) : (
                'Subscribe'
              )}
            </Button>
          </div>
        </form>

        {/* Trust Indicators */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-white/60 text-sm">
          <div className="flex items-center gap-2">
            <Check size={16} className="text-[#10B981]" />
            <span>No spam, ever</span>
          </div>
          <div className="flex items-center gap-2">
            <Check size={16} className="text-[#10B981]" />
            <span>Unsubscribe anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <Check size={16} className="text-[#10B981]" />
            <span>Weekly updates</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
