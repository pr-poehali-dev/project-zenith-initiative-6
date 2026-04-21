import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/sections/HeroSection"
import { OnlineSection } from "@/components/sections/OnlineSection"
import { SocialSection } from "@/components/sections/SocialSection"
import { AboutSection } from "@/components/sections/AboutSection"
import { RulesSection } from "@/components/sections/RulesSection"
import { NewsSection } from "@/components/sections/NewsSection"
import { KillfeedSection } from "@/components/sections/KillfeedSection"
import { BanListSection } from "@/components/sections/BanListSection"
import { FooterSection } from "@/components/sections/FooterSection"

const Index = () => {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <main>
        <HeroSection />
        <OnlineSection />
        <SocialSection />
        <AboutSection />
        <RulesSection />
        <NewsSection />
        <KillfeedSection />
        <BanListSection />
      </main>
      <FooterSection />
    </div>
  )
}

export default Index
