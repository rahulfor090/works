'use client'

import React, { useState } from 'react'
import { motion } from 'motion/react'
import { Mail, Send } from 'lucide-react'

const NewsletterNew: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{
        background: 'var(--alternate-gradient-hero-warm)'
      }}
    >
      {/* Floating envelope animation */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0, -5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-10 right-10 opacity-20"
      >
        <Mail size={80} />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="heading-1 mb-4">Stay Updated</h2>
          <p className="body-large mb-8" style={{ color: 'var(--text-secondary)' }}>
            Get the latest medical research, resources, and educational content delivered to your inbox.
          </p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
          >
            <div className="flex-1 relative">
              <motion.input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                required
                animate={{
                  scale: isFocused ? 1.02 : 1
                }}
                transition={{ duration: 0.2 }}
                className="w-full px-6 py-4 rounded-full border-2 focus:outline-none transition-all duration-300"
                style={{
                  borderColor: isFocused ? 'var(--border-input-focus)' : 'var(--border-input)',
                  background: 'white',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="btn-primary px-8 py-4 flex items-center justify-center gap-2"
            >
              Subscribe
              <Send size={18} />
            </motion.button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="caption mt-4"
            style={{ color: 'var(--text-muted)' }}
          >
            No spam. Unsubscribe anytime.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

export default NewsletterNew


