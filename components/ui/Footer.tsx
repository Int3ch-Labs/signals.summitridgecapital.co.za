import Link from "next/link";

const legalLinks = [
  {
    label: "Refund Policy",
    href: "/legal/refund-policy",
  },
  {
    label: "Privacy Policy",
    href: "/legal/privacy-policy",
  },
  {
    label: "Risk Disclaimer",
    href: "/legal/disclaimer",
  },
  {
    label: "Terms & Conditions",
    href: "/legal/terms-and-conditions",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              {/* Logo */}
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-white/10">
                <img
                  src="/logo.jpg"
                  alt="Summit Ridge Capital"
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <p className="text-sm font-bold">
                  Summit Ridge Capital
                </p>

                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-400">
                  Signals
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              Model-generated trading signals designed to help traders
              structure and evaluate market opportunities.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
              Product
            </h3>

            <nav className="mt-4 flex flex-col gap-3">
              <Link
                href="/"
                className="text-sm text-slate-300 transition hover:text-white"
              >
                Home
              </Link>

              <Link
                href="/pricing"
                className="text-sm text-slate-300 transition hover:text-white"
              >
                Pricing
              </Link>

              <Link
                href="/about"
                className="text-sm text-slate-300 transition hover:text-white"
              >
                About
              </Link>

              <Link
                href="/contact"
                className="text-sm text-slate-300 transition hover:text-white"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
              Legal
            </h3>

            <nav className="mt-4 flex flex-col gap-3">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-300 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Company information */}
        <div className="mt-10 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-3 text-xs leading-5 text-slate-500">
            <p className="font-semibold text-slate-300">
              Summit Ridge Capital (Pty) Ltd
            </p>

            <p>
              Registered South African Company · Registration No.
              2025/960992/07
            </p>

            <p>
              Summit Ridge Capital Signals is a product and service operated
              by Summit Ridge Capital.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Summit Ridge Capital. All rights
            reserved.
          </p>

          <p className="text-xs text-slate-600">
            Trading involves risk. Capital can be lost.
          </p>
        </div>
      </div>
    </footer>
  );
}