import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import { FAQ_ITEMS } from "@/lib/faq-data";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jayesh-portfolio-vert.vercel.app"),
  title: "Jayesh Vijay Nimse | Founder & CEO at ScaleRise MediaTech & Full-Stack Developer",
  description:
    "Founder & CEO at ScaleRise MediaTech & Full-Stack Developer. Architecting AI-driven digital growth and robust web systems with ScaleRise, MedNova, and ARISE.",
  keywords: [
    "Jayesh Vijay Nimse",
    "Jayesh Nimse",
    "Founder & CEO at ScaleRise MediaTech",
    "ScaleRise MediaTech",
    "Full-Stack Developer",
    "AI Automation Developer",
    "MedNova",
    "ARISE",
    "AI-driven digital growth",
    "KIT's College of Engineering Kolhapur",
    "CSBS Technologist",
    "Python Developer",
    "Next.js Developer",
  ],
  authors: [{ name: "Jayesh Vijay Nimse", url: "https://jayesh-portfolio-vert.vercel.app" }],
  creator: "Jayesh Vijay Nimse",
  publisher: "Jayesh Vijay Nimse",
  alternates: {
    canonical: "https://jayesh-portfolio-vert.vercel.app",
  },
  openGraph: {
    title: "Jayesh Vijay Nimse | Founder & CEO at ScaleRise MediaTech & Full-Stack Developer",
    description:
      "Founder & CEO at ScaleRise MediaTech & Full-Stack Developer. Architecting AI-driven digital growth and robust web systems with ScaleRise, MedNova, and ARISE.",
    url: "https://jayesh-portfolio-vert.vercel.app",
    siteName: "Jayesh Vijay Nimse Portfolio",
    images: [
      {
        url: "https://jayesh-portfolio-vert.vercel.app/images/jayesh_hero_portrait.png",
        width: 654,
        height: 1212,
        alt: "Jayesh Vijay Nimse — Founder & CEO at ScaleRise MediaTech & Full-Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jayesh Vijay Nimse | Founder & CEO at ScaleRise MediaTech & Full-Stack Developer",
    description:
      "Founder & CEO at ScaleRise MediaTech & Full-Stack Developer. Architecting AI-driven digital growth and robust web systems with ScaleRise, MedNova, and ARISE.",
    images: ["https://jayesh-portfolio-vert.vercel.app/images/jayesh_hero_portrait.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // =========================================================================
    // GOOGLE SEARCH CONSOLE VERIFICATION:
    // When you get your Google verification string, uncomment and paste below:
    // google: "PASTE_YOUR_GOOGLE_SEARCH_CONSOLE_CODE_HERE",
    // =========================================================================
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data Schema Graph (JSON-LD) for Rich Google Search Indexing
  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://jayesh-portfolio-vert.vercel.app/#person",
        name: "Jayesh Vijay Nimse",
        alternateName: ["Jayesh Nimse", "Jayesh V. Nimse"],
        url: "https://jayesh-portfolio-vert.vercel.app",
        image: "https://jayesh-portfolio-vert.vercel.app/images/jayesh_hero_portrait.png",
        jobTitle: "Founder & CEO at ScaleRise MediaTech",
        affiliation: [
          {
            "@type": "CollegeOrUniversity",
            name: "KIT's College of Engineering, Kolhapur",
            url: "https://www.kitcoek.in",
          },
          {
            "@type": "Organization",
            name: "ScaleRise MediaTech",
            url: "https://scalerisemediatech.com",
          },
        ],
        worksFor: {
          "@type": "Organization",
          name: "ScaleRise MediaTech",
          url: "https://scalerisemediatech.com",
        },
        alumniOf: [
          {
            "@type": "CollegeOrUniversity",
            name: "KIT's College of Engineering, Kolhapur (Autonomous)",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Kolhapur",
              addressRegion: "Maharashtra",
              addressCountry: "India",
            },
          },
          {
            "@type": "EducationalOrganization",
            name: "Matoshri Rukminibai Damodar Malpani Vidyalaya, Sangamner",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Sangamner",
              addressRegion: "Maharashtra",
              addressCountry: "India",
            },
          },
        ],
        parent: [
          {
            "@type": "Person",
            name: "Vijay Chimaji Nimse",
          },
          {
            "@type": "Person",
            name: "Kanchan Vijay Nimse",
          },
        ],
        sibling: [
          {
            "@type": "Person",
            name: "Namrata Vijay Nimse",
          },
        ],
        homeLocation: [
          {
            "@type": "Place",
            name: "Home Residence",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Sangamner",
              addressRegion: "Maharashtra",
              addressCountry: "India",
            },
            hasMap: "https://maps.app.goo.gl/LnmBTW9vCKij6p2x6",
          },
          {
            "@type": "Place",
            name: "Native Village Home",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Kolwadi / Santwadi",
              addressRegion: "Maharashtra",
              addressCountry: "India",
            },
            hasMap: "https://maps.app.goo.gl/Yo4tedpvr9NsA8Vq7",
          },
        ],
        sameAs: [
          "https://www.linkedin.com/in/jayesh-nimse-5578b526b",
          "https://github.com/nimsek90-ops",
          "https://scalerisemediatech.com",
          "https://www.instagram.com/jayesh_v_nimse",
        ],
        email: "jayeshnimse3@gmail.com",
        knowsAbout: [
          "Artificial Intelligence",
          "Machine Learning",
          "Python Development",
          "Full-Stack Web Development",
          "Next.js and React",
          "Autonomous Agentic Workflows",
          "Business Strategy",
          "Growth Architecture",
          "Media Technology",
          "ScaleRise MediaTech",
          "MedNova Smart Hospital",
          "ARISE Systems",
          "Karate Martial Arts",
        ],
        award: [
          "Shito-Ryu 1st Dan Karate Black Belt",
          "National Martial Arts Championship Silver Medalist",
          "10th Standard SSC Distinction (87.4%)",
        ],
      },
      {
        "@type": "ProfilePage",
        "@id": "https://jayesh-portfolio-vert.vercel.app/#webpage",
        url: "https://jayesh-portfolio-vert.vercel.app",
        name: "Jayesh Vijay Nimse | Founder & CEO at ScaleRise MediaTech & Full-Stack Developer",
        mainEntity: { "@id": "https://jayesh-portfolio-vert.vercel.app/#person" },
        description:
          "Founder & CEO at ScaleRise MediaTech & Full-Stack Developer. Architecting AI-driven digital growth and robust web systems with ScaleRise, MedNova, and ARISE.",
      },
      {
        "@type": "WebSite",
        "@id": "https://jayesh-portfolio-vert.vercel.app/#website",
        url: "https://jayesh-portfolio-vert.vercel.app",
        name: "Jayesh Vijay Nimse Portfolio",
        publisher: { "@id": "https://jayesh-portfolio-vert.vercel.app/#person" },
      },
      {
        "@type": "FAQPage",
        "@id": "https://jayesh-portfolio-vert.vercel.app/#faq",
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* ========================================================================= */}
        {/* GOOGLE SEARCH CONSOLE VERIFICATION META TAG:                              */}
        {/* You can also paste your meta tag directly here:                           */}
        {/* <meta name="google-site-verification" content="PASTE_YOUR_CODE_HERE" /> */}
        {/* ========================================================================= */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-[#faf7f4] text-[#0f172a] selection:bg-rose-500/20 selection:text-rose-900 min-h-screen relative`}
      >
        <SmoothScrollProvider>
          <ScrollProgressBar />
          {children}
          <FloatingWhatsApp />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
