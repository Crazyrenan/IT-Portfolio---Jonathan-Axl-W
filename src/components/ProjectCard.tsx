import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Props {
  title: string;
  tagline: string;
  image: string;
  slug: string;
  techStack: string[];
}

export default function ProjectCard({ title, tagline, image, slug, techStack }: Props) {
  // FIX 1: Change HTMLDivElement -> HTMLAnchorElement (Because we are using an <a> tag)
  const ref = useRef<HTMLAnchorElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  // FIX 2: Update the event type here as well
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={`/projects/${slug}`}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="block relative w-full h-[400px] bg-surface rounded-sm border border-white/5 overflow-hidden group perspective-1000"
    >
      {/* IMAGE LAYER */}
      <div className="absolute inset-0 z-0">
        <img 
          src={image || "/images/Dashboard.png"} 
          alt={title}
          className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,19,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,6px_100%] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent z-10" />
      </div>

      {/* CONTENT LAYER */}
      <div className="absolute bottom-0 left-0 w-full p-6 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          <span className="text-[10px] font-mono text-primary tracking-widest uppercase">
            Classified // Access Granted
          </span>
        </div>

        <h3 className="text-3xl font-bold font-sans text-white mb-1 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm font-mono text-text/70 mb-4 line-clamp-2">
          {tagline}
        </p>

        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span key={tech} className="text-[10px] font-mono px-2 py-1 border border-white/10 bg-black/50 text-text/50 rounded-sm">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* BORDER GLOW */}
      <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 transition-colors duration-300 rounded-sm pointer-events-none z-30" />
    </motion.a>
  );
}