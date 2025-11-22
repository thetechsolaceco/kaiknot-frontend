"use client"
import Header from "../components/core/header";
import ComingSoon from "../components/landingpage/coming-soon";
import Concept from "../components/landingpage/concept";
import KaiKnotLanding from "../components/landingpage/hero-section";
import SocialsLinks from "../components/landingpage/socials-links";


export default function Home() {
  return (
    <div className="bg-[#00000]">
    <Header />
    <KaiKnotLanding /> 
    <Concept /> 
    <ComingSoon />
    <SocialsLinks />
    </div>
  );
}
