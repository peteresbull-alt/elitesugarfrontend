import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AccessModal from "@/components/AccessModal";
import LiveChat from "@/components/major/LiveChat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://smsureconnect.com"),
  title: {
    default:
      "SMSureConnect - Premium Sugar Mommy Dating Platform | Australia, Singapore, NZ & Canada",
    template: "%s | SMSureConnect",
  },
  description:
    "Connect with verified, successful sugar mommies in Australia, Singapore, New Zealand, and Canada. Premium dating platform featuring accomplished women aged 40-80 seeking genuine relationships.",
  keywords: [
    "sugar mommy dating",
    "premium dating Australia",
    "wealthy women Singapore",
    "mature dating New Zealand",
    "sugar mommy Canada",
    "luxury dating platform",
    "verified sugar mommies",
    "successful women dating",
    "affluent women relationships",
    "exclusive dating service",
  ],
  authors: [{ name: "SMSureConnect" }],
  creator: "SMSureConnect",
  publisher: "SMSureConnect",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["en_AU", "en_SG", "en_NZ", "en_CA"],
    url: "https://smsureconnect.com",
    siteName: "SMSureConnect",
    title: "SMSureConnect - Meet Successful Sugar Mommies | Premium Dating",
    description:
      "Premium dating platform connecting you with verified, accomplished women in Australia, Singapore, New Zealand, and Canada. Real connections, verified profiles.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SMSureConnect - Premium Dating Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SMSureConnect - Premium Sugar Mommy Dating",
    description:
      "Connect with verified, successful women in Australia, Singapore, NZ & Canada",
    images: ["/twitter-image.jpg"],
    creator: "@smsureconnect",
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://smsureconnect.com",
    languages: {
      "en-AU": "https://smsureconnect.com/au",
      "en-SG": "https://smsureconnect.com/sg",
      "en-NZ": "https://smsureconnect.com/nz",
      "en-CA": "https://smsureconnect.com/ca",
    },
  },
  category: "Dating & Relationships",
};

// Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SMSureConnect",
  url: "https://smsureconnect.com",
  logo: "https://smsureconnect.com/logo.png",
  description:
    "Premium dating platform connecting successful sugar mommies with confident partners",
  address: [
    {
      "@type": "PostalAddress",
      addressCountry: "AU",
      addressRegion: "Multiple Regions",
    },
    {
      "@type": "PostalAddress",
      addressCountry: "SG",
    },
    {
      "@type": "PostalAddress",
      addressCountry: "NZ",
    },
    {
      "@type": "PostalAddress",
      addressCountry: "CA",
    },
  ],
  sameAs: [
    "https://facebook.com/smsureconnect",
    "https://instagram.com/smsureconnect",
    "https://twitter.com/smsureconnect",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    availableLanguage: ["English"],
    areaServed: ["AU", "SG", "NZ", "CA"],
  },
};

// Website Schema
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SMSureConnect",
  url: "https://smsureconnect.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://smsureconnect.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#E94057" />
        <meta name="msapplication-TileColor" content="#E94057" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />

        {/* Geo targeting */}
        <meta name="geo.region" content="AU;SG;NZ;CA" />
        <meta
          name="geo.placename"
          content="Australia;Singapore;New Zealand;Canada"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <AccessModal />

        <LiveChat />
      </body>
    </html>
  );
}
