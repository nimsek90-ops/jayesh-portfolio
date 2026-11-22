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
  metadataBase: new URL("https://jayeshnimse.com"),
  title: "Jayesh Nimse | AI + Technology + Business | Founder & Technologist",
  description:
    "Official portfolio of Jayesh Nimse — Founder of ScaleRise MediaTech and CSBS Technologist. Building intelligent solutions at the intersection of AI, Technology, and Business.",
  keywords: [
    "Jayesh Nimse",
    "Jayesh Nimse AI",
    "Jayesh Nimse Portfolio",
    "AI and Technology Professional",
    "AI Automation Developer",
    "Tech Business Strategist",
    "ScaleRise MediaTech",
    "MedNova Smart Hospital",
    "KIT College of Engineering Kolhapur",
    "Computer Science and Business Systems",
    "Autonomous AI Agents",
    "Python Developer",
    "Full-Stack Engineer",
  ],
  authors: [{ name: "Jayesh Nimse", url: "https://jayeshnimse.com" }],
  creator: "Jayesh Nimse",
  publisher: "Jayesh Nimse",
  alternates: {
    canonical: "https://jayeshnimse.com",
  },
  openGraph: {
    title: "Jayesh Nimse | AI + Technology + Business",
    description:
      "Building intelligent solutions at the intersection of AI, Technology and Business. Founder of ScaleRise MediaTech, AI Developer & Strategist.",
    url: "https://jayeshnimse.com",
    siteName: "Jayesh Nimse Portfolio",
    images: [
      {
        url: "/images/jayesh_hero_portrait.png",
        width: 654,
        height: 1212,
        alt: "Jayesh Nimse — AI + Technology + Business",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jayesh Nimse | AI + Technology + Business",
    description:
      "Building intelligent solutions at the intersection of AI, Technology and Business. Founder of ScaleRise MediaTech.",
    images: ["/images/jayesh_hero_portrait.png"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data Schema Graph
  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://jayeshnimse.com/#person",
        name: "Jayesh Nimse",
        alternateName: "Jayesh V. Nimse",
        url: "https://jayeshnimse.com",
        image: "https://jayeshnimse.com/images/jayesh_hero_portrait.png",
        jobTitle: "Founder & AI Technologist",
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
          "Karate Martial Arts",
        ],
        award: [
          "Shito-Ryu 1st Dan Karate Black Belt",
          "National Martial Arts Championship Silver Medalist",
        ],
      },
      {
        "@type": "ProfilePage",
        "@id": "https://jayeshnimse.com/#webpage",
        url: "https://jayeshnimse.com",
        name: "Jayesh Nimse | AI + Technology + Business",
        mainEntity: { "@id": "https://jayeshnimse.com/#person" },
        description:
          "Official personal portfolio of Jayesh Nimse — Founder of ScaleRise MediaTech, AI Developer, and CSBS Technologist.",
      },
      {
        "@type": "WebSite",
        "@id": "https://jayeshnimse.com/#website",
        url: "https://jayeshnimse.com",
        name: "Jayesh Nimse Portfolio",
        publisher: { "@id": "https://jayeshnimse.com/#person" },
      },
      {
        "@type": "FAQPage",
        "@id": "https://jayeshnimse.com/#faq",
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
