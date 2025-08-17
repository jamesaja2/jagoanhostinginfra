import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, User, Tag } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Section, SectionHeader, SectionTitle, SectionDescription } from '@/components/sections/Section';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { articles } from '@/data/articles';

export function Galeri() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Get unique categories
  const categories = ['Semua', ...Array.from(new Set(articles.map(article => article.category)))];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'Semua' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const categoryColors: Record<string, string> = {
    "Kegiatan Sekolah": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Prestasi": "bg-green-500/10 text-green-400 border-green-500/20",
    "Artikel": "bg-purple-500/10 text-purple-400 border-purple-500/20",
    "Berita": "bg-orange-500/10 text-orange-400 border-orange-500/20",
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
        title="Galeri - SMA Katolik St. Louis 1 Surabaya"
        description="Dokumentasi kegiatan, prestasi, dan artikel terbaru dari SMA St. Louis 1 Surabaya. Lihat momen-momen berkesan dan pencapaian siswa-siswi kami."
        keywords="galeri, kegiatan sekolah, prestasi siswa, artikel pendidikan, dokumentasi SMA St. Louis 1"
      />

      <div className="min-h-screen pt-20">
        <Section>
          <SectionHeader>
            <SectionTitle>
              Galeri 
              <span className="gradient-text">St. Louis 1</span>
            </SectionTitle>
            <SectionDescription>
              Dokumentasi perjalanan, prestasi, dan momen berkesan dalam kehidupan 
              sekolah SMA Katolik St. Louis 1 Surabaya.
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
                placeholder="Cari artikel atau kegiatan..."
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
            Menampilkan {filteredArticles.length} dari {articles.length} artikel
          </motion.p>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <Card className="h-full bg-school-secondary/50 border-school-accent/20 card-hover group">
                  <CardContent className="p-6">
                    {/* Image Placeholder */}
                    <div className="w-full h-48 bg-school-accent/10 rounded-xl mb-4 flex items-center justify-center group-hover:bg-school-accent/20 transition-colors">
                      <span className="text-school-accent text-sm">
                        📷 {article.category}
                      </span>
                    </div>

                    {/* Category and Date */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
                        categoryColors[article.category]
                      }`}>
                        {article.category}
                      </span>
                      <div className="flex items-center text-school-text-muted text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(article.date)}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-school-text mb-3 leading-tight group-hover:text-school-accent transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-school-text-muted text-sm leading-relaxed mb-4 line-clamp-3">
                      {article.summary}
                    </p>

                    {/* Author */}
                    {article.author && (
                      <div className="flex items-center text-school-text-muted text-sm mb-4">
                        <User className="w-4 h-4 mr-2" />
                        {article.author}
                      </div>
                    )}

                    {/* Tags */}
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {article.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="inline-flex items-center px-2 py-1 bg-school-accent/10 text-school-accent text-xs rounded-full"
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                        {article.tags.length > 3 && (
                          <span className="text-xs text-school-text-muted">
                            +{article.tags.length - 3} lainnya
                          </span>
                        )}
                      </div>
                    )}

                    {/* Read More */}
                    <div className="pt-3 border-t border-school-accent/10">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-school-accent hover:text-school-accent-dark w-full"
                      >
                        Baca Selengkapnya
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredArticles.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-school-accent/10 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-school-accent" />
              </div>
              <h3 className="text-xl font-semibold text-school-text mb-2">
                Tidak ada artikel ditemukan
              </h3>
              <p className="text-school-text-muted">
                Coba ubah kata kunci pencarian atau filter kategori
              </p>
            </motion.div>
          )}
        </Section>
      </div>
    </>
  );
}