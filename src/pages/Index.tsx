import { Helmet } from "react-helmet-async";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Services } from "@/components/sections/services";
import { Booking } from "@/components/sections/booking";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Navbar } from "@/components/navbar";

const Index = () => {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <Helmet>
        <link rel="canonical" href="/" />
        <meta property="og:url" content="/" />
      </Helmet>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Services />
      <Booking />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
