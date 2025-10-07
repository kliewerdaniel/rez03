'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import GlitchBackground from '../../components/GlitchBackground';
import ArtGrid from '../../components/ArtGrid';

// Simulated art data for homepage mosaic - in real app, fetch from API
const sampleArtPieces = [
  { id: '1', title: 'Abstract Neon', src: '/art/FB_IMG_1686089299754.jpg', alt: 'Abstract neon art' },
  { id: '2', title: 'Digital Pattern', src: '/art/20221003_170829.jpg', alt: 'Digital pattern artwork' },
  { id: '3', title: 'Geometric Form', src: '/art/IMG_0010.JPG', alt: 'Geometric art piece' },
  { id: '4', title: 'Color Splash', src: '/art/AfterlightImage1.jpg', alt: 'Colorful abstract art' },
  { id: '5', title: 'Light Study', src: '/art/C8C6DEF8-4239-4B16-ADF3-4EAF62D4795A.jpg', alt: 'Light experiment' },
  { id: '6', title: 'Texture Dance', src: '/art/DA2C3455-82BB-4293-B62A-44D470647DFE.jpg', alt: 'Textured artwork' },
  { id: '7', title: 'Urban Sketch', src: '/art/EBC7DCC4-332E-48AD-A2D1-8561AA1104F2.jpg', alt: 'Urban inspired art' },
  { id: '8', title: 'Symmetry Play', src: '/art/FB_IMG_1686089783737.jpg', alt: 'Symmetric composition' },
];

const roles = [
  'AI Developer',
  'Full-Stack Technologist',
  'System Designer',
  'Data Annotation Specialist'
];



export default function Home() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredPiece, setHoveredPiece] = useState<string | null>(null);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const shouldDelete = displayText === currentRole && !isDeleting;

    if (shouldDelete) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }

    const shouldReset = displayText === '' && isDeleting;
    if (shouldReset) {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
      } else {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex]);



  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Glitch Background */}
      <GlitchBackground />

      {/* Matrix Rain Background */}
      <div className="matrix-bg" />

      {/* Scan Line Effect */}
      <div className="scan-line" />

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 glitch-bg" />
      </div>

      {/* Artistic Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Art Mosaic Background */}
        <div className="fixed inset-0 -z-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 p-4">
          {sampleArtPieces.map((piece, index) => (
            <motion.div
              key={piece.id}
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 0.3, scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.1, duration: 1, type: "spring" }}
              className={`relative aspect-square overflow-hidden rounded-lg cursor-pointer group ${
                hoveredPiece === piece.id ? 'z-10' : ''
              }`}
              onMouseEnter={() => setHoveredPiece(piece.id)}
              onMouseLeave={() => setHoveredPiece(null)}
              whileHover={{
                scale: 1.2,
                rotate: Math.random() * 10 - 5,
                zIndex: 10
              }}
              style={{
                filter: `hue-rotate(${typeof window !== 'undefined' ? (mousePosition.x / window.innerWidth) * 60 - 30 : 0}deg) saturate(${hoveredPiece === piece.id ? 2 : 1})`,
                transform: hoveredPiece === piece.id ? 'translateZ(20px)' : 'translateZ(0px)',
              }}
            >
              <motion.div
                className="w-full h-full"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={piece.src}
                  alt={piece.alt}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 filter blur-sm group-hover:blur-none group-hover:brightness-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/30 transition-all duration-500" />
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${
                  hoveredPiece === piece.id
                    ? 'opacity-100'
                    : 'opacity-0 group-hover:opacity-50'
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-secondary/20 to-accent/20 rounded-lg blur-xl" />
                </div>
              </motion.div>
              {/* Floating text on hover */}
              {hoveredPiece === piece.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-2 left-2 text-white text-sm font-medium glass px-2 py-1 rounded"
                >
                  {piece.title}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Floating Art Elements */}
        <div className="absolute inset-0 -z-3">
          {sampleArtPieces.slice(0, 3).map((piece, index) => (
            <motion.div
              key={`floating-${piece.id}`}
              className="absolute opacity-10"
              animate={{
                x: [0, Math.random() * 100, -Math.random() * 100, 0],
                y: [0, -Math.random() * 50, Math.random() * 50, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 20 + index * 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                top: `${20 + index * 25}%`,
                left: `${10 + index * 30}%`,
                width: '200px',
                height: '200px',
              }}
            >
              <Image
                src={piece.src}
                alt=""
                fill
                className="object-cover rounded-full"
              />
            </motion.div>
          ))}
        </div>

        {/* Central Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          {/* Artistic Name */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 tracking-wide"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2.5, type: "spring", stiffness: 100 }}
          >
            <span className="glitch-text" data-text="Daniel Kliewer">
              Daniel Kliewer
            </span>
          </motion.h1>

          {/* Artistic Role */}
          <motion.div
            className="text-2xl md:text-3xl text-muted-foreground mb-8 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
          >
            {displayText}
            <span className="animate-pulse text-accent ml-1">|</span>
          </motion.div>

          {/* Artistic Description */}
          <motion.p
            className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground/90 leading-relaxed mb-12 glass p-6 rounded-lg border border-white/10 backdrop-blur-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5 }}
          >
            <span className="text-accent font-semibold block mb-2">AI Developer • Visual Artist • Tech Innovator</span>
            Exploring the intersection of artificial intelligence, creative coding, and digital art.
            Building systems that blend technology with artistic expression, creating immersive experiences
            that challenge our perceptions of what code can become.
          </motion.p>

          {/* Interactive CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/art" className="glitch-button px-8 py-4">
                <span className="relative z-10 flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Enter Gallery
                </span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/projects" className="btn glass border-2 border-secondary text-secondary hover:bg-secondary hover:text-black px-8 py-4 transition-all duration-300">
                <span className="flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Tech Projects
                </span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/blog" className="btn glass border-2 border-accent text-accent hover:bg-accent hover:text-black px-8 py-4 transition-all duration-300">
                <span className="flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Digital Journal
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Artistic Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-accent rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-accent rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Artistic Gallery Preview */}
      <section className="py-20 bg-black/20 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="glitch-text" data-text="Visual Expressions">Visual Expressions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Art that challenges boundaries. Code that creates beauty. Technology as a canvas for human creativity.
            </p>
          </motion.div>

          {/* Interactive Art Grid Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-16"
          >
            <ArtGrid artPieces={sampleArtPieces} />
          </motion.div>

          {/* Navigation Cards with Artistic Elements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tech Projects Card */}
            <motion.div
              className="group relative overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Link href="/projects" className="block">
                <div className="glass p-8 rounded-lg border border-accent/20 hover:border-accent/50 transition-all duration-300 bg-gradient-to-br from-card to-card/50">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 20% 80%, #00fff7 0%, transparent 50%),
                                      radial-gradient(circle at 80% 20%, #ff00ff 0%, transparent 50%),
                                      radial-gradient(circle at 40% 40%, #39ff14 0%, transparent 50%)`,
                    }} />
                  </div>

                  <div className="relative z-10 text-center">
                    {/* Animated Icon */}
                    <motion.div
                      className="mx-auto h-20 w-20 mb-6 relative"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full text-accent">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl animate-pulse" />
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-accent transition-colors">Tech Innovations</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      AI systems, machine learning frameworks, and data annotation tools built for human autonomy and creativity.
                    </p>
                    <div className="inline-flex items-center text-accent font-semibold group-hover:text-secondary transition-colors">
                      Explore Code Base
                      <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Blog Card with Art Elements */}
            <motion.div
              className="group relative overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link href="/blog" className="block">
                <div className="glass p-8 rounded-lg border border-secondary/20 hover:border-secondary/50 transition-all duration-300 bg-gradient-to-br from-card to-card/50">
                  {/* Geometric Pattern */}
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `conic-gradient(from 0deg at 50% 50%, #ff00ff, transparent, #00fff7, transparent, #39ff14, transparent)`,
                      backgroundSize: '60px 60px',
                      backgroundPosition: '0 0, 30px 30px',
                    }} />
                  </div>

                  <div className="relative z-10 text-center">
                    {/* Animated Icon */}
                    <motion.div
                      className="mx-auto h-20 w-20 mb-6 relative"
                      whileHover={{ rotate: -360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full text-secondary">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      <div className="absolute inset-0 bg-secondary/20 rounded-full blur-xl animate-pulse" />
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-secondary transition-colors">Digital Thoughts</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      Deep dives into AI philosophy, coding patterns, system architecture, and the future of human-AI collaboration.
                    </p>
                    <div className="inline-flex items-center text-secondary font-semibold group-hover:text-accent transition-colors">
                      Read Journeys
                      <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Full Art Gallery Card */}
            <motion.div
              className="group relative overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/art" className="block">
                <div className="glass p-8 rounded-lg border border-accent/20 hover:border-accent/50 transition-all duration-300 bg-gradient-to-br from-card to-card/50">
                  {/* Artistic Background */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                      <div className="absolute inset-0 rotate-45 scale-150 transform origin-center">
                        <div className="w-full h-full border border-accent/30 rotate-45 animate-spin" style={{ animationDuration: '20s' }} />
                        <div className="w-full h-full border border-secondary/30 -rotate-45 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 text-center">
                    {/* Animated Icon */}
                    <motion.div
                      className="mx-auto h-20 w-20 mb-6 relative"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full text-accent">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl animate-pulse" />
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-accent transition-colors">Art Gallery</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      A curated collection exploring the intersection of digital technology, visual art, and creative expression.
                    </p>
                    <div className="inline-flex items-center text-accent font-semibold group-hover:text-secondary transition-colors">
                      View Collection
                      <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
