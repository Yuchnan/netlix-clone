import Footer from "@mods/LandingPage/Footer"
import Jumbotron from "@mods/LandingPage/Jumbotron"
import SectionEnjoy from "@mods/LandingPage/SectionContent/SectionEnjoy"
import SectionDownload from "@mods/LandingPage/SectionContent/SectionDownload"
import SectionFAQ from "@mods/LandingPage/SectionContent/SectionFAQ"
import SectionProfile from "@mods/LandingPage/SectionContent/SectionProfile"
import SectionWatch from "@mods/LandingPage/SectionContent/SectionWatch"
import Navbar from "./Navbar"


function Landing() {
  return (
    <>
      <Navbar />
      <Jumbotron />
      <SectionEnjoy />
      <SectionDownload />
      <SectionWatch />
      <SectionProfile />
      <SectionFAQ />
      <Footer />
    </>
  )
}

export default Landing