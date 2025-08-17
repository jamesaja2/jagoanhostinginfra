import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, Users, Star } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Section, SectionHeader, SectionTitle, SectionDescription } from '@/components/sections/Section';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { extracurriculars, kategoriekstrakurikuler, Extracurricular } from '@/data/extracurriculars';

export function Ekstrakulikuler() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedEkskul, setSelectedEkskul] = useState<Extracurricular | null>(null);

  const filteredEkskul = extracurriculars.filter((ekskul) => {
    const matchesSearch = ekskul.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ekskul.deskripsi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || ekskul.kategori === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  const categoryColors: Record<string, string> = {
    "Akademik": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Seni": "bg-pink-500/10 text-pink-400 border-pink-500/20",
    "Olahraga": "bg-green-500/10 text-green-400 border-green-500/20",
    "Sains & Teknologi": "bg-purple-500/10 text-purple-400 border-purple-500/20",
    "Rohani & Sosial": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    "Komunitas": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  };

  return (
    <>
      <SEO 
        title="Ekstrakurikuler - SMA Katolik St. Louis 1 Surabaya"
        description="Jelajahi beragam ekstrakurikuler di SMA St. Louis 1: Robotik, Physics Science Club, Seni Lukis, Tae Kwon Do, SSV, dan banyak lagi. Kembangkan bakat dan minat Anda."
        keywords="ekstrakurikuler, robotik, physics science club, seni lukis, taekwondo, SSV, sosial rohani, esports mobile legends"
      />

      <div className="min-h-screen pt-20">
        <Section>
          <SectionHeader>
            <SectionTitle>
              Ekstrakurikuler 
              <span className="gradient-text">St. Louis 1</span>
            </SectionTitle>
            <SectionDescription>
              Kembangkan bakat dan minat Anda melalui berbagai pilihan ekstrakurikuler 
              yang menggabungkan prestasi, karakter, dan kegembiraan dalam belajar.
            </SectionDescription>
          </SectionHeader>

          {/* Search and Filter */}
          <motion.div 
            className="mb-8 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-school-text-muted w-5 h-5" />
              <Input
                type="text"
                placeholder="Cari ekstrakurikuler..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-school-secondary/50 border-school-accent/20"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {kategoriekstrakurikuler.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`transition-all duration-200 ${
                    selectedCategory === category 
                      ? 'bg-school-accent text-school-primary' 
                      : 'border-school-accent/20 text-school-text-muted hover:text-school-accent'
                  }`}
                >
                  <Filter className="w-4 h-4 mr-1" />
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.p 
            className="text-center text-school-text-muted mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Menampilkan {filteredEkskul.length} dari {extracurriculars.length} ekstrakurikuler
          </motion.p>

          {/* Ekstrakurikuler Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEkskul.map((ekskul, index) => (
              <motion.div
                key={ekskul.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <Card 
                  className="h-full bg-school-secondary/50 border-school-accent/20 card-hover group cursor-pointer"
                  onClick={() => setSelectedEkskul(ekskul)}
                >
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-school-text group-hover:text-school-accent transition-colors">
                            {ekskul.name}
                          </h3>
                          {ekskul.baru && (
                            <span className="px-2 py-1 bg-school-accent/20 text-school-accent text-xs font-medium rounded-full">
                              BARU
                            </span>
                          )}
                        </div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
                          categoryColors[ekskul.kategori]
                        }`}>
                          {ekskul.kategori}
                        </span>
                      </div>
                    </div>

                    {/* Schedule */}
                    <div className="flex items-center text-school-text-muted mb-4">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{ekskul.jadwal}</span>
                    </div>

                    {/* Description */}
                    <p className="text-school-text-muted text-sm leading-relaxed mb-4 line-clamp-3">
                      {ekskul.deskripsi}
                    </p>

                    {/* Footer */}
                    <div className="pt-3 border-t border-school-accent/10">
                      <div className="flex items-center justify-between">
                        {ekskul.prestasi && ekskul.prestasi.length > 0 && (
                          <div className="flex items-center text-school-accent">
                            <Star className="w-4 h-4 mr-1" />
                            <span className="text-xs">{ekskul.prestasi.length} Prestasi</span>
                          </div>
                        )}
                        <Button variant="ghost" size="sm" className="text-school-accent hover:text-school-accent-dark">
                          Lihat Detail
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredEkskul.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-school-accent/10 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-school-accent" />
              </div>
              <h3 className="text-xl font-semibold text-school-text mb-2">
                Tidak ada hasil ditemukan
              </h3>
              <p className="text-school-text-muted">
                Coba ubah kata kunci pencarian atau filter kategori
              </p>
            </motion.div>
          )}
        </Section>

        {/* Detail Modal */}
        <Dialog open={!!selectedEkskul} onOpenChange={() => setSelectedEkskul(null)}>
          <DialogContent className="max-w-2xl bg-school-secondary border-school-accent/20">
            {selectedEkskul && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <DialogTitle className="text-2xl text-school-text">
                      {selectedEkskul.name}
                    </DialogTitle>
                    {selectedEkskul.baru && (
                      <span className="px-3 py-1 bg-school-accent/20 text-school-accent text-sm font-medium rounded-full">
                        PROGRAM BARU
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-school-text-muted">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${
                      categoryColors[selectedEkskul.kategori]
                    }`}>
                      {selectedEkskul.kategori}
                    </span>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">{selectedEkskul.jadwal}</span>
                    </div>
                  </div>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h4 className="font-semibold text-school-text mb-2">Deskripsi</h4>
                    <p className="text-school-text-muted leading-relaxed">
                      {selectedEkskul.deskripsi}
                    </p>
                  </div>

                  {/* Pembina */}
                  {selectedEkskul.pembina && (
                    <div>
                      <h4 className="font-semibold text-school-text mb-2">Pembina</h4>
                      <p className="text-school-text-muted">{selectedEkskul.pembina}</p>
                    </div>
                  )}

                  {/* Prestasi */}
                  {selectedEkskul.prestasi && selectedEkskul.prestasi.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-school-text mb-2">Prestasi</h4>
                      <ul className="space-y-1">
                        {selectedEkskul.prestasi.map((prestasi, index) => (
                          <li key={index} className="flex items-center text-school-text-muted">
                            <Star className="w-4 h-4 mr-2 text-school-accent" />
                            {prestasi}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Special Note for New Programs */}
                  {selectedEkskul.baru && (
                    <div className="bg-school-accent/10 border border-school-accent/20 rounded-xl p-4">
                      <h4 className="font-semibold text-school-accent mb-2">Program Baru</h4>
                      <p className="text-school-text-muted text-sm">
                        Ini adalah program ekstrakurikuler baru di tahun ajaran 2024/2025. 
                        Jadwal dan kegiatan masih dalam tahap penyesuaian.
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}