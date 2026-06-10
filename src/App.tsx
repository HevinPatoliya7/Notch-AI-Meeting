import Nav from './sections/Nav';
import Hero from './sections/Hero';
import LogoStrip from './sections/LogoStrip';
import TrialDemo from './sections/TrialDemo';
import Features from './sections/Features';
import HowItWorks from './sections/HowItWorks';
import Pricing from './sections/Pricing';
import Testimonials from './sections/Testimonials';
import FinalCTA from './sections/FinalCTA';
import Footer from './sections/Footer';

const App = () => {
  return (
    <>
      <Nav />
      <main className="relative">
        <Hero />
        <LogoStrip />
        <TrialDemo />
        <Features />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
};

export default App;
