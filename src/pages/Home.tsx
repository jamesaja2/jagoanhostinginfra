import React from 'react';
import { SEO } from '@/components/SEO';
import { Hero } from '@/components/sections/Hero';
import { Section } from '@/components/sections/Section';
import { VirtualTour360 } from '@/components/VirtualTour360';
import { Highlights } from '@/components/sections/Highlights';
import { Announcements } from '@/components/sections/Announcements';
import { QuickLinks } from '@/components/sections/QuickLinks';
import { AboutShort } from '@/components/sections/AboutShort';

export function Home() {
  return (
    <>
      <SEO 
        title="SMA Katolik St. Louis 1 Surabaya - Beriman, Berbudi, Berprestasi"
        description="Sekolah Katolik berkarakter Vinsensian terdepan di Surabaya. Mengembangkan pribadi beriman, berbudi pekerti luhur, dan berprestasi dengan pendidikan holistik berkualitas tinggi sejak 1862."
        keywords="SMA Katolik, St. Louis 1 Surabaya, sekolah Vinsensian, pendidikan Katolik, SMA terbaik Surabaya, beriman berbudi berprestasi, PCPDB"
      />
      
      <Hero />
      
      <Section id="virtual-tour">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-school-text mb-4">
            Virtual Tour 
            <span className="gradient-text"> 360°</span>
          </h2>
          <p className="text-lg text-school-text-muted max-w-3xl mx-auto">
            Jelajahi fasilitas sekolah dengan tur virtual 360° yang interaktif. 
            Rasakan pengalaman mengunjungi sekolah dari rumah Anda.
          </p>
        </div>
        
        <VirtualTour360 
          imageUrl="/images/school-360-sample.jpg"
          autoLoad={true}
          autoRotate={2}
        />
        
        <div className="text-center mt-8">
          <p className="text-sm text-school-text-muted">
            💡 <strong>Tips:</strong> Gunakan mouse atau touch untuk melihat sekeliling, scroll untuk zoom, 
            dan klik tombol fullscreen untuk pengalaman optimal.
          </p>
        </div>
      </Section>
      
      <Highlights />
      <Announcements />
      <QuickLinks />
      <AboutShort />
    </>
  );
}