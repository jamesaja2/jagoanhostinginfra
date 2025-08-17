import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Ekstrakulikuler } from '@/pages/Ekstrakulikuler';
import { Galeri } from '@/pages/Galeri';
import { WawasanIndex } from '@/pages/Wawasan/Index';
import { Sejarah } from '@/pages/Wawasan/Sejarah';
import { VisiMisi } from '@/pages/Wawasan/VisiMisi';
import { Struktur } from '@/pages/Wawasan/Struktur';
import { OurTeams } from '@/pages/Wawasan/OurTeams';
import { FAQ } from '@/pages/FAQ';
import { PCPDB } from '@/pages/PCPDB';
import { Pengumuman } from '@/pages/Pengumuman';
import { Login } from '@/pages/Login';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ekstrakulikuler" element={<Ekstrakulikuler />} />
      <Route path="/galeri" element={<Galeri />} />
      <Route path="/wawasan" element={<WawasanIndex />} />
      <Route path="/wawasan/sejarah" element={<Sejarah />} />
      <Route path="/wawasan/visi-misi" element={<VisiMisi />} />
      <Route path="/wawasan/struktur" element={<Struktur />} />
      <Route path="/wawasan/our-teams" element={<OurTeams />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/pcpdb" element={<PCPDB />} />
      <Route path="/pengumuman" element={<Pengumuman />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}