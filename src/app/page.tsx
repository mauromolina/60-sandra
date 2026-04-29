import { HeroSection } from "@/components/sections/HeroSection";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { DateTimeSection } from "@/components/sections/DateTimeSection";
import { VenueSection } from "@/components/sections/VenueSection";
import { DressCodeSection } from "@/components/sections/DressCodeSection";
import { SpotifySection } from "@/components/sections/SpotifySection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { FamilyMessageSection } from "@/components/sections/FamilyMessageSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { PhotoUploadSection } from "@/components/sections/PhotoUploadSection";
import { RsvpSection } from "@/components/sections/RsvpSection";
import { FooterSection } from "@/components/sections/FooterSection";

export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <CountdownSection />
      <DateTimeSection />
      <VenueSection />
      <DressCodeSection />
      <TimelineSection />
      <FamilyMessageSection />
      <SpotifySection />
      {/* <GallerySection /> */}
      {/* <PhotoUploadSection /> */}
      <RsvpSection />
      <FooterSection />
    </main>
  );
}
