import type { Metadata, Viewport } from "next";
import SiteChrome from "@/components/ui/SiteChrome";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://signals.summitridgecapital.co.za";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Summit Ridge Capital ",
    template: "%s | Summit Ridge Capital",
  },

  description:
    "Model-generated trading signals and market intelligence from Summit Ridge Capital.",

  applicationName: "Summit Ridge Capital ",

  keywords: [
    "Summit Ridge Capital",
    "trading signals",
    "market signals",
    "trading intelligence",
    "market intelligence",
    "financial signals",
    "model-generated signals",
    "trading analysis",
  ],

  authors: [
    {
      name: "Summit Ridge Capital",
      url: siteUrl,
    },
  ],

  creator: "Summit Ridge Capital",
  publisher: "Summit Ridge Capital",

  category: "finance",

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
      {
        url: "/logo.jpg",
        type: "image/jpeg",
      },
    ],
    shortcut: [
      {
        url: "/logo.jpg",
        type: "image/jpeg",
      },
    ],
    apple: [
      {
        url: "/logo.jpg",
        type: "image/jpeg",
      },
    ],
  },

  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: siteUrl,
    siteName: "Summit Ridge Capital Signals",
    title: "Summit Ridge Capital Signals",
    description:
      "Model-generated trading signals and market intelligence from Summit Ridge Capital.",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Summit Ridge Capital Signals",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Summit Ridge Capital Signals",
    description:
      "Model-generated trading signals and market intelligence from Summit Ridge Capital.",
    images: ["/logo.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  referrer: "strict-origin-when-cross-origin",

  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#2563eb",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <UserProvider>
        <SiteChrome>{children}</SiteChrome>
        </UserProvider>
      </body>
    </html>
  );
}