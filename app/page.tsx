import { Audience, WhyVls } from "@/components/AudienceAndVls";
import { Faq, FinalCta, SiteFooter } from "@/components/FaqAndFooter";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Jurisdiction } from "@/components/Jurisdiction";
import { Matters } from "@/components/Matters";
import { Problem } from "@/components/Problem";
import { SiteHeader } from "@/components/SiteHeader";
import { StickyEnquiryBar } from "@/components/StickyEnquiryBar";
import { Takeaways } from "@/components/Takeaways";
import { Topics } from "@/components/Topics";

export default function Page() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Matters />
        <Problem />
        <Topics />
        <Jurisdiction />
        <Takeaways />
        <Audience />
        <WhyVls />
        <HowItWorks />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <StickyEnquiryBar />
    </>
  );
}
