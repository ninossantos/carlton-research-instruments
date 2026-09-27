import { createRootRoute, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import appCss from "../styles.css?url";

const APP_NAME = "Coercive Control Observatory";

const SCHEMA_GRAPH = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://carltonresearch.com/#organization",
      "name": "Carlton Research, LLC",
      "legalName": "Carlton Research, LLC",
      "url": "https://carltonresearch.com/",
      "logo": "https://carltonresearch.com/wp-content/uploads/2026/09/seed-of-life-512.png",
      "image": "https://carltonresearch.com/wp-content/uploads/2026/09/seed-of-life-512.png",
      "description": "Carlton Research, LLC provides coercive control forensic services for attorneys, courts, and evaluators. Founded in October 2020 in Laguna Beach, California. CEO and founder Carisa Carlton.",
      "email": "carisa@carltonresearch.com",
      "foundingDate": "2020-10",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1968 South Coast Highway #2461",
        "addressLocality": "Laguna Beach",
        "addressRegion": "CA",
        "postalCode": "92651",
        "addressCountry": "US"
      },
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      },
      "founder": {
        "@id": "https://carltonresearch.com/about/#person"
      },
      "employee": {
        "@id": "https://carltonresearch.com/about/#person"
      },
      "knowsAbout": [
        "Coercive control",
        "Coercive control forensic analysis",
        "Expert witness testimony on coercive control",
        "Pattern analysis of longitudinal communication records",
        "Technology-facilitated coercive control",
        "Family law evidence"
      ],
      "makesOffer": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "@id": "https://carltonresearch.com/#service-coercive-control-forensics",
            "name": "Coercive Control Forensic Services",
            "serviceType": "Coercive control forensic analysis and expert witness services",
            "provider": {
              "@id": "https://carltonresearch.com/#organization"
            },
            "url": "https://carltonresearch.com/services/",
            "areaServed": {
              "@type": "Country",
              "name": "United States"
            }
          }
        }
      ],
      "sameAs": [
        "https://www.linkedin.com/company/carlton-research"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://carltonresearch.com/about/#person",
      "name": "Carisa Carlton",
      "honorificSuffix": "M.A.",
      "url": "https://carltonresearch.com/about/",
      "image": "https://carltonresearch.com/wp-content/uploads/2026/09/carisa-carlton-headshot.jpg",
      "jobTitle": [
        "CEO",
        "Founder"
      ],
      "description": "Carisa Carlton is an anthropologist and sociologist with 10 years of coercive control research, including courtroom research. She is the author of the codebook for identifying coercive control in longitudinal artifacts. CEO and founder of Carlton Research, LLC.",
      "worksFor": {
        "@id": "https://carltonresearch.com/#organization"
      },
      "knowsAbout": [
        "Coercive control",
        "Coercive control research",
        "Courtroom research on coercive control",
        "Pattern analysis of longitudinal communication records"
      ],
      "sameAs": [
        "https://www.linkedin.com/in/carisacarlton",
        "https://carltonresearch.com/about/"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://observatory.carltonresearch.com/#website",
      "url": "https://observatory.carltonresearch.com/",
      "name": "Coercive Control Observatory",
      "description": "Coercive Control Observatory: Coercive Control Statute Map, Coercive Control Law Atlas, Coercive Control Appeals Landscape, Coercive Control Literature Map, Coercive Control Field Check, and Coercive Control Drill.",
      "publisher": {
        "@id": "https://carltonresearch.com/#organization"
      },
      "inLanguage": "en-US"
    }
  ]
} as const;

function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <h1 className="font-display text-3xl">Not in this instrument</h1>
      <p className="mt-3 text-muted">That page is not part of Coercive Control Observatory.</p>
      <Link to="/" className="mt-6 inline-block text-primary hover:underline">
        Home
      </Link>
    </main>
  );
}

export const Route = createRootRoute({
  notFoundComponent: NotFound,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Coercive Control Observatory: Coercive Control Statute Map, Coercive Control Law Atlas, Coercive Control Appeals Landscape, Coercive Control Literature Map, Coercive Control Field Check, and Coercive Control Drill.",
      },
      { property: "og:title", content: APP_NAME },
      { property: "og:url", content: "https://observatory.carltonresearch.com/" },
      {
        property: "og:image",
        content: "https://observatory.carltonresearch.com/og.jpg",
      },
      {
        property: "og:description",
        content:
          "Coercive Control Observatory: Coercive Control Statute Map, Coercive Control Law Atlas, Coercive Control Appeals Landscape, Coercive Control Literature Map, Coercive Control Field Check, and Coercive Control Drill.",
      },
      { name: "theme-color", content: "#f3efe6" },
    ],
    links: [
      { rel: "canonical", href: "https://observatory.carltonresearch.com/" },
      { rel: "icon", type: "image/png", href: "/favicon.png?v=20260901d" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;1,400&display=swap",
      },
    ],
    scripts: [
      {
        type: "text/javascript",
        children: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "vo79yxbwn3");`,
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(SCHEMA_GRAPH),
      },
    ],
  }),
  component: () => (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-bg text-fg">
        <PreviewHostBridge />
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <Outlet />
            <SiteFooter />
          </div>
        </AuthProvider>
                <Scripts />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `/* <![CDATA[ */
var SlimStatParams = {
 transport: "ajax",
 ajaxurl: "https://carltonresearch.com/wp-admin/admin-ajax.php",
 ajaxurl_ajax: "https://carltonresearch.com/wp-admin/admin-ajax.php"
};
/* ]]> */`,
          }}
        />
        <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/wp/wp-slimstat/tags/5.5.0/wp-slimstat.min.js"
        />
      </body>
    </html>
  ),
});
