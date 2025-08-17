import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function SEO({
  title = "SMA Katolik St. Louis 1 Surabaya - Beriman, Berbudi, Berprestasi",
  description = "Sekolah Katolik berkarakter Vinsensian terdepan di Surabaya. Mengembangkan pribadi beriman, berbudi pekerti luhur, dan berprestasi dengan pendidikan holistik berkualitas tinggi.",
  keywords = "SMA Katolik, St. Louis 1 Surabaya, sekolah Vinsensian, pendidikan Katolik, SMA terbaik Surabaya, ekstrakurikuler, PCPDB",
  image = "/images/logo-stlouis.jpg",
  url = "https://smakstlouis1sby.sch.id",
  type = "website"
}: SEOProps) {
  const fullTitle = title.includes("SMA Katolik St. Louis 1") ? title : `${title} | SMA Katolik St. Louis 1 Surabaya`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="SMA Katolik St. Louis 1 Surabaya" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={url} />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "SMA Katolik St. Louis 1 Surabaya",
          "alternateName": "SMA St. Louis 1",
          "description": description,
          "url": "https://smakstlouis1sby.sch.id",
          "logo": image,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Jl. Polisi Istimewa No.7, Keputran",
            "addressLocality": "Surabaya",
            "addressRegion": "Jawa Timur",
            "postalCode": "60265",
            "addressCountry": "ID"
          },
          "telephone": "(031) 5676522",
          "email": "info@smakstlouis1sby.sch.id",
          "foundingDate": "1862",
          "sameAs": [
            "https://instagram.com/stlouis1sby",
            "https://youtube.com/@stlouis1sby",
            "https://facebook.com/stlouis1sby"
          ]
        })}
      </script>
    </Helmet>
  );
}