import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Pin, Search, Filter } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Section, SectionHeader, SectionTitle, SectionDescription } from '@/components/sections/Section';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { announcements } from '@/data/announcements';

export function Pengumuman() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Get unique categories
  const categories = ['Semua', ...Array.from(new Set(announcements.map(ann => ann.category)))];

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || announcement.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort by date (newest first) and separate pinned
  const sortedAnnouncements = filteredAnnouncements.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const categoryColors: Record<string, string> = {
    "Akademik": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Kegiatan": "bg-green-500/10 text-green-400 border-green-500/20",
    "Administrasi": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    "Pengumuman Penting": "bg-red-500/10 text-red-400 border-red-500/20",
  };

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
        title="Pengumuman - SMA Katolik St. Louis 1 Surabaya"
        description="Pengumuman terbaru dari SMA Katolik St. Louis 1 Surabaya. Informasi kegiatan, prestasi, administrasi, dan pengumuman penting lainnya."
        keywords="pengumuman sekolah, kegiatan SMA St. Louis 1, prestasi siswa, administrasi sekolah, informasi terbaru"
      />

      <div className="min-h-screen pt-20">
        <Section>
          <SectionHeader>
            <SectionTitle>
              Pengumuman 
              <span className="gradient-text">Terbaru</span>
            </SectionTitle>
            <SectionDescription>
              Tetap update dengan informasi terkini seputar kegiatan, prestasi, 
              dan pengumuman penting dari SMA Katolik St. Louis 1 Surabaya.
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
                placeholder="Cari pengumuman..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-school-secondary/50 border-school-accent/20"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
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
            Menampilkan {filteredAnnouncements.length} dari {announcements.length} pengumuman
          </motion.p>

          {/* Announcements List */}
          {sortedAnnouncements.length > 0 ? (
            <div className="space-y-6">
              {sortedAnnouncements.map((announcement, index) => (
                <motion.div
                  key={announcement.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  id={announcement.id}
                >
                  <Card className={`bg-school-secondary/50 border-school-accent/20 card-hover ${
                    announcement.pinned ? 'ring-2 ring-school-accent/30' : ''
                  }`}>
                    <CardContent className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center text-school-text-muted text-sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDate(announcement.date)}
                        </div>
                        <div className="flex items-center gap-2">
                          {announcement.pinned && (
                            <div className="flex items-center text-school-accent">
                              <Pin className="w-4 h-4 mr-1" />
                              <span className="text-xs font-medium">Penting</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Category */}
                      <div className="mb-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
                          categoryColors[announcement.category as keyof typeof categoryColors]
                        }`}>
                          {announcement.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-school-text mb-4 leading-tight hover:text-school-accent transition-colors">
                        {announcement.title}
                      </h3>

                      {/* Summary */}
                      <p className="text-school-text-muted mb-4 leading-relaxed">
                        {announcement.summary}
                      </p>

                      {/* Content (if available) */}
                      {announcement.content && (
                        <div className="bg-school-primary/30 rounded-xl p-4 mb-4">
                          <p className="text-school-text-muted text-sm leading-relaxed">
                            {announcement.content}
                          </p>
                        </div>
                      )}

                      {/* Image Placeholder */}
                      {announcement.imageUrl && (
                        <div className="w-full h-48 bg-school-accent/10 rounded-xl mb-4 flex items-center justify-center">
                          <span className="text-school-accent text-sm">
                            📷 {announcement.category}
                          </span>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="pt-4 border-t border-school-accent/10">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-school-text-muted">
                            ID: {announcement.id}
                          </span>
                          <Button variant="ghost" size="sm" className="text-school-accent hover:text-school-accent-dark">
                            Bagikan
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            /* No Results */
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-school-accent/10 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-school-accent" />
              </div>
              <h3 className="text-xl font-semibold text-school-text mb-2">
                Tidak ada pengumuman ditemukan
              </h3>
              <p className="text-school-text-muted">
                Coba ubah kata kunci pencarian atau filter kategori
              </p>
            </motion.div>
          )}

          {/* Subscribe to Updates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="bg-school-secondary/50 rounded-2xl p-8 border border-school-accent/20">
              <Calendar className="w-12 h-12 text-school-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-school-text mb-4">
                Jangan Lewatkan Update Terbaru
              </h3>
              <p className="text-school-text-muted mb-6 max-w-2xl mx-auto">
                Ikuti media sosial kami atau hubungi langsung untuk mendapatkan 
                informasi pengumuman terbaru secara real-time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-school-accent hover:bg-school-accent-dark text-school-primary">
                  Follow Instagram
                </Button>
                <Button variant="outline" className="border-school-accent text-school-accent hover:bg-school-accent hover:text-school-primary">
                  Subscribe Email
                </Button>
              </div>
            </div>
          </motion.div>
        </Section>
      </div>
    </>
  );
}