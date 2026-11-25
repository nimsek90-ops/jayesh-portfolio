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
  title: "Jayesh Nimse Portfolio | Jayesh Vijay Nimse — Founder & CEO at ScaleRise MediaTech",
  description:
    "Official portfolio of Jayesh Nimse (Jayesh Vijay Nimse) — Founder & CEO at ScaleRise MediaTech & Full-Stack Developer. AI systems, MedNova, and ARISE.",
  keywords: [
    "Jayesh Nimse",
    "Jayesh Nimse Portfolio",
    "Jayesh Vijay Nimse",
    "Jayesh Vijay Nimse Portfolio",
    "Jayesh Nimse Website",
    "Jayesh Nimse Official Website",
    "Founder & CEO at ScaleRise MediaTech",
    "ScaleRise MediaTech",
    "Full-Stack Developer",
    "AI Automation Developer",
    "MedNova",
    "ARISE",
    "KIT's College of Engineering Kolhapur",
    "CSBS Technologist",
    "Jayesh Nimse Sangamner",
  ],
  authors: [{ name: "Jayesh Vijay Nimse", url: "https://jayesh-portfolio-vert.vercel.app" }],
  creator: "Jayesh Vijay Nimse",
  publisher: "Jayesh Vijay Nimse",
  alternates: {
    canonical: "https://jayesh-portfolio-vert.vercel.app",
  },
  openGraph: {
    title: "Jayesh Nimse Portfolio | Jayesh Vijay Nimse — Founder & CEO at ScaleRise MediaTech",
    description:
      "Official portfolio of Jayesh Nimse (Jayesh Vijay Nimse) — Founder & CEO at ScaleRise MediaTech & Full-Stack Developer. AI systems, MedNova, and ARISE.",
    url: "https://jayesh-portfolio-vert.vercel.app",
    siteName: "Jayesh Nimse Portfolio",
    images: [
      {
        url: "https://jayesh-portfolio-vert.vercel.app/images/jayesh_hero_portrait.png",
        width: 654,
        height: 1212,
        alt: "Jayesh Nimse Portfolio — Founder & CEO at ScaleRise MediaTech",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jayesh Nimse Portfolio | Jayesh Vijay Nimse — Founder & CEO at ScaleRise MediaTech",
    description:
      "Official portfolio of Jayesh Nimse (Jayesh Vijay Nimse) — Founder & CEO at ScaleRise MediaTech & Full-Stack Developer.",
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
    google: "1KLDiGQU2nBYtxei9FX6UuiotemY2r8vZPbU8DiqeJg",
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
        name: "Jayesh Nimse Portfolio | Jayesh Vijay Nimse",
        mainEntity: { "@id": "https://jayesh-portfolio-vert.vercel.app/#person" },
        description:
          "Official portfolio of Jayesh Nimse (Jayesh Vijay Nimse) — Founder & CEO at ScaleRise MediaTech & Full-Stack Developer.",
        datePublished: "2024-01-01",
        dateModified: new Date().toISOString().split("T")[0],
        inLanguage: "en-US",
      },
      {
        "@type": "WebSite",
        "@id": "https://jayesh-portfolio-vert.vercel.app/#website",
        url: "https://jayesh-portfolio-vert.vercel.app",
        name: "Jayesh Nimse Portfolio",
        alternateName: ["Jayesh Vijay Nimse Portfolio", "Official Portfolio of Jayesh Nimse"],
        publisher: { "@id": "https://jayesh-portfolio-vert.vercel.app/#person" },
        inLanguage: "en-US",
      },
      {
        "@type": "Organization",
        "@id": "https://scalerisemediatech.com/#organization",
        name: "ScaleRise MediaTech",
        url: "https://scalerisemediatech.com",
        founder: { "@id": "https://jayesh-portfolio-vert.vercel.app/#person" },
        description:
          "Forward-thinking digital growth and media technology venture designed to help modern brands scale audience distribution.",
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://jayesh-portfolio-vert.vercel.app/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://jayesh-portfolio-vert.vercel.app",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "About Jayesh Nimse",
            item: "https://jayesh-portfolio-vert.vercel.app/#about",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Projects",
            item: "https://jayesh-portfolio-vert.vercel.app/#projects",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Education & Rigor",
            item: "https://jayesh-portfolio-vert.vercel.app/#education",
          },
          {
            "@type": "ListItem",
            position: 5,
            name: "Contact",
            item: "https://jayesh-portfolio-vert.vercel.app/#contact",
          },
        ],
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
        <meta name="google-site-verification" content="1KLDiGQU2nBYtxei9FX6UuiotemY2r8vZPbU8DiqeJg" />
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
