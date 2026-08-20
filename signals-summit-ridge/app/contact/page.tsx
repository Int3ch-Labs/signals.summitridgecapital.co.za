import Link from "next/link";

export const metadata = {
  title: "Contact | Summit Ridge Capital Signals",
  description:
    "Contact Summit Ridge Capital regarding Signals, subscriptions, accounts and general enquiries.",
};

export default function ContactPage() {
  return (
    <main className="bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              We&apos;re here to
              <span className="block text-blue-600">
                help.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
              Have a question about your account, subscription or Summit Ridge
              Capital Signals? Get in touch with our team.
            </p>
          </div>
        </div>
      </section>

      {/* Contact content */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Email */}
          <ContactCard
            icon="✉"
            title="Email"
            description="For general enquiries, account support and platform questions."
          >
            <a
              href="mailto:support@summitridgecapital.co.za"
              className="text-sm font-bold text-blue-600 hover:underline"
            >
              support@summitridgecapital.co.za
            </a>
          </ContactCard>

          {/* Account */}
          <ContactCard
            icon="◎"
            title="Account support"
            description="Need help with your account, subscription or signals?"
          >
            <Link
              href="/login"
              className="text-sm font-bold text-blue-600 hover:underline"
            >
              Sign in to your account →
            </Link>
          </ContactCard>

          {/* Company */}
          <ContactCard
            icon="▣"
            title="Company"
            description="Summit Ridge Capital is a registered South African company."
          >
            <p className="text-sm font-bold text-slate-800">
              2025/960992/07
            </p>
          </ContactCard>
        </div>
      </section>

      {/* Contact form */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
                Send a message
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
                How can we help?
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-500">
                Send us your enquiry and we&apos;ll get back to you using the
                contact details you provide.
              </p>

              <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <p className="text-sm font-bold text-slate-900">
                  Before contacting us
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  For account-specific issues, please include the email
                  address associated with your Summit Ridge Capital account.
                  Never send us your password or authentication codes.
                </p>
              </div>
            </div>

            <form
              action="mailto:support@summitridgecapital.co.za"
              method="post"
              encType="text/plain"
              className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="text-sm font-semibold text-slate-700"
                  >
                    First name
                  </label>

                  <input
                    id="firstName"
                    name="First name"
                    required
                    className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Last name
                  </label>

                  <input
                    id="lastName"
                    name="Last name"
                    required
                    className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="Email"
                  type="email"
                  required
                  className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  placeholder="you@example.com"
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="subject"
                  className="text-sm font-semibold text-slate-700"
                >
                  Subject
                </label>

                <select
                  id="subject"
                  name="Subject"
                  className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  defaultValue="General enquiry"
                >
                  <option>General enquiry</option>
                  <option>Account support</option>
                  <option>Subscription & billing</option>
                  <option>Signals</option>
                  <option>Technical issue</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-slate-700"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="Message"
                  required
                  rows={6}
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button
                type="submit"
                className="mt-6 flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-6 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
              >
                Send enquiry
              </button>

              <p className="mt-4 text-center text-[11px] leading-5 text-slate-400">
                Please do not include passwords, authentication codes or other
                sensitive security credentials.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-6">
        <h2 className="text-2xl font-bold text-slate-950">
          Ready to explore Signals?
        </h2>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">
          Create an account and choose the Summit Ridge Capital Signals plan
          that works for you.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/signup"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-7 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            Create an account
          </Link>

          <Link
            href="/pricing"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-7 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50"
          >
            View pricing
          </Link>
        </div>
      </section>
    </main>
  );
}

function ContactCard({
  icon,
  title,
  description,
  children,
}: {
  icon: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-lg text-blue-600">
        {icon}
      </div>

      <h2 className="mt-5 font-bold text-slate-950">
        {title}
      </h2>

      <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500">
        {description}
      </p>

      <div className="mt-5 border-t border-slate-100 pt-4">
        {children}
      </div>
    </div>
  );
}