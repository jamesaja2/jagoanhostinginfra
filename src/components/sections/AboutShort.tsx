import React from 'react';
import { motion } from 'framer-motion';
import { Heart, BookOpen, Trophy, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Section, SectionHeader, SectionTitle, SectionDescription } from './Section';
import { Button } from '@/components/ui/button';
import { schoolInfo } from '@/data/school';

const values = [
  {
    icon: Heart,
    title: "Beriman",
    description: "Mengembangkan spiritualitas dan kerohanian yang mendalam"
  },
  {
    icon: BookOpen,
    title: "Berbudi",
    description: "Memiliki akhlak mulia dan karakter yang terpuji"
  },
  {
    icon: Trophy,
    title: "Berprestasi",
    description: "Unggul dalam akademik dan non-akademik"
  },
  {
    icon: Users,
    title: "Peduli Sesama",
    description: "Mengutamakan pelayanan kepada yang membutuhkan"
  }
];

export function AboutShort() {
  return (
    <Section variant="dark">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SectionHeader className="text-left mb-8">
            <SectionTitle className="text-left">
              Tentang 
              <span className="gradient-text">St. Louis 1</span>
            </SectionTitle>
            <SectionDescription className="text-left max-w-none">
              Sejak 1862, SMA Katolik St. Louis 1 Surabaya telah menjadi institusi pendidikan 
              terkemuka yang mengintegrasikan nilai-nilai Vinsensian dalam setiap aspek pembelajaran.
            </SectionDescription>
          </SectionHeader>

          <motion.div
            className="space-y-6 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-school-text-muted leading-relaxed">
              Kami berkomitmen mengembangkan potensi setiap siswa melalui pendidikan holistik 
              yang menggabungkan keunggulan akademik, pembinaan karakter, dan pengembangan bakat. 
              Dengan motto <span className="text-school-accent font-semibold">"Beriman, Berbudi, Berprestasi"</span>, 
              kami mempersiapkan generasi muda yang siap menghadapi tantangan masa depan.
            </p>
            
            <p className="text-school-text-muted leading-relaxed">
              Tradisi keunggulan selama lebih dari 160 tahun menjadi fondasi kuat dalam 
              menciptakan lingkungan belajar yang kondusif, inovatif, dan berbasis nilai-nilai kasih, 
              kerendahan hati, dan pelayanan kepada sesama.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
              asChild 
              className="bg-school-accent hover:bg-school-accent-dark text-school-primary font-semibold"
            >
              <Link to="/wawasan">
                Pelajari Lebih Lanjut
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="bg-school-primary/50 rounded-2xl p-6 border border-school-accent/20 card-hover"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-xl bg-school-accent/10">
                  <value.icon className="w-6 h-6 text-school-accent" />
                </div>
              </div>
              <h3 className="font-bold text-school-text mb-2">{value.title}</h3>
              <p className="text-sm text-school-text-muted leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}