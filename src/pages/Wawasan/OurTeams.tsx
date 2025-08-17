import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, GraduationCap, Award, Filter } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Section, SectionHeader, SectionTitle, SectionDescription } from '@/components/sections/Section';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { leadership, coordinators, teachers, staff, TeamMember } from '@/data/teams';

const teamCategories = [
  { key: 'all', label: 'Semua', data: [...leadership, ...coordinators, ...teachers, ...staff] },
  { key: 'leadership', label: 'Pimpinan', data: leadership },
  { key: 'coordinators', label: 'Koordinator', data: coordinators },
  { key: 'teachers', label: 'Guru', data: teachers },
  { key: 'staff', label: 'Staf', data: staff },
];

export function OurTeams() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const currentTeam = teamCategories.find(cat => cat.key === selectedCategory)?.data || [];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        ease: "easeOut",
      },
    }),
  };

  return (
    <>
      <SEO 
        title="Tim Kami - SMA Katolik St. Louis 1 Surabaya"
        description="Kenali tim pendidik dan staff berpengalaman di SMA Katolik St. Louis 1 Surabaya. Kepala sekolah, wakil, koordinator, guru, dan staff pendukung."
        keywords="guru SMA St. Louis 1, kepala sekolah, wakil kepala sekolah, staff pendidik, tim pengajar"
      />

      <div className="min-h-screen pt-20">
        <Section>
          <SectionHeader>
            <SectionTitle>
              Tim 
              <span className="gradient-text">Kami</span>
            </SectionTitle>
            <SectionDescription>
              Para pendidik dan staff berpengalaman yang berdedikasi mengembangkan 
              potensi setiap siswa dengan nilai-nilai Vinsensian.
            </SectionDescription>
          </SectionHeader>

          {/* Team Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-center p-4 bg-school-secondary/30 rounded-xl">
              <div className="text-2xl font-bold text-school-accent">{leadership.length}</div>
              <div className="text-sm text-school-text-muted">Pimpinan</div>
            </div>
            <div className="text-center p-4 bg-school-secondary/30 rounded-xl">
              <div className="text-2xl font-bold text-school-accent">{coordinators.length}</div>
              <div className="text-sm text-school-text-muted">Koordinator</div>
            </div>
            <div className="text-center p-4 bg-school-secondary/30 rounded-xl">
              <div className="text-2xl font-bold text-school-accent">{teachers.length}+</div>
              <div className="text-sm text-school-text-muted">Guru</div>
            </div>
            <div className="text-center p-4 bg-school-secondary/30 rounded-xl">
              <div className="text-2xl font-bold text-school-accent">{staff.length}+</div>
              <div className="text-sm text-school-text-muted">Staf</div>
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {teamCategories.map((category) => (
              <Button
                key={category.key}
                variant={selectedCategory === category.key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.key)}
                className={`transition-all duration-200 ${
                  selectedCategory === category.key 
                    ? 'bg-school-accent text-school-primary' 
                    : 'border-school-accent/20 text-school-text-muted hover:text-school-accent'
                }`}
              >
                <Filter className="w-4 h-4 mr-1" />
                {category.label} ({category.data.length})
              </Button>
            ))}
          </motion.div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTeam.map((member, index) => (
              <motion.div
                key={member.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <Card className="h-full bg-school-secondary/50 border-school-accent/20 card-hover group">
                  <CardContent className="p-6">
                    {/* Avatar Placeholder */}
                    <div className="w-24 h-24 bg-school-accent/10 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-school-accent/20 transition-colors">
                      <Users className="w-12 h-12 text-school-accent" />
                    </div>

                    {/* Name */}
                    <h3 className="text-lg font-bold text-school-text text-center mb-2 group-hover:text-school-accent transition-colors">
                      {member.name}
                    </h3>

                    {/* Position */}
                    <p className="text-school-accent text-center font-medium mb-1">
                      {member.position}
                    </p>

                    {/* Department */}
                    {member.department && (
                      <p className="text-school-text-muted text-center text-sm mb-4">
                        {member.department}
                      </p>
                    )}

                    {/* Education */}
                    {member.education && (
                      <div className="flex items-start mb-3">
                        <GraduationCap className="w-4 h-4 text-school-accent mt-1 mr-2 flex-shrink-0" />
                        <p className="text-school-text-muted text-sm leading-relaxed">
                          {member.education}
                        </p>
                      </div>
                    )}

                    {/* Experience */}
                    {member.experience && (
                      <div className="flex items-start mb-3">
                        <Award className="w-4 h-4 text-school-accent mt-1 mr-2 flex-shrink-0" />
                        <p className="text-school-text-muted text-sm">
                          Pengalaman: {member.experience}
                        </p>
                      </div>
                    )}

                    {/* Specialization */}
                    {member.specialization && member.specialization.length > 0 && (
                      <div className="mb-4">
                        <p className="text-school-text text-sm font-medium mb-2">Keahlian:</p>
                        <div className="flex flex-wrap gap-1">
                          {member.specialization.slice(0, 3).map((spec, specIndex) => (
                            <span 
                              key={specIndex}
                              className="inline-block px-2 py-1 bg-school-accent/10 text-school-accent text-xs rounded-full"
                            >
                              {spec}
                            </span>
                          ))}
                          {member.specialization.length > 3 && (
                            <span className="text-xs text-school-text-muted px-2 py-1">
                              +{member.specialization.length - 3} lainnya
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Email */}
                    {member.email && (
                      <div className="pt-3 border-t border-school-accent/10">
                        <a 
                          href={`mailto:${member.email}`}
                          className="flex items-center justify-center text-school-accent hover:text-school-accent-dark text-sm transition-colors"
                        >
                          <Mail className="w-4 h-4 mr-1" />
                          Kontak
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {currentTeam.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-school-accent/10 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-school-accent" />
              </div>
              <h3 className="text-xl font-semibold text-school-text mb-2">
                Tidak ada data tim
              </h3>
              <p className="text-school-text-muted">
                Pilih kategori lain untuk melihat anggota tim
              </p>
            </motion.div>
          )}

          {/* Join Our Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="bg-school-secondary/50 rounded-2xl p-8 border border-school-accent/20">
              <Users className="w-12 h-12 text-school-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-school-text mb-4">
                Bergabung dengan Tim Kami
              </h3>
              <p className="text-school-text-muted mb-6 max-w-2xl mx-auto">
                Kami selalu mencari pendidik dan tenaga profesional yang berdedikasi 
                untuk bergabung dalam misi pendidikan berkarakter Vinsensian.
              </p>
              <Button className="bg-school-accent hover:bg-school-accent-dark text-school-primary">
                Lihat Lowongan Kerja
              </Button>
            </div>
          </motion.div>
        </Section>
      </div>
    </>
  );
}