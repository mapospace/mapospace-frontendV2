import BentoGrid from "@/components/LandingPage/BentoGrid";
import CompanyName from "@/components/LandingPage/CompanyName";
import Faq from "@/components/LandingPage/Faq";
import Footer from "@/components/LandingPage/Footer";
import Header from "@/components/LandingPage/Header";
import How from "@/components/LandingPage/How";
import MainComponent from "@/components/LandingPage/MainComponent";
import Plan from "@/components/LandingPage/Plan";
import Stories from "@/components/LandingPage/Stories";

export default function Home() {
  return (
    <div className="overflow-hidden" >
      < Header />
      <MainComponent />
      <How />
      <BentoGrid />
      <CompanyName />
      <Stories />
      <Plan />
      <Faq />
      <Footer />
    </div >
  );
}
