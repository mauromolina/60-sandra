"use client";

import { useParams } from "next/navigation";
import { useInvitee } from "@/hooks/useInvitee";
import { HeroSection } from "@/components/sections/HeroSection";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { DateTimeSection } from "@/components/sections/DateTimeSection";
import { VenueSection } from "@/components/sections/VenueSection";
import { DressCodeSection } from "@/components/sections/DressCodeSection";
import { SpotifySection } from "@/components/sections/SpotifySection";
import { FamilyMessageSection } from "@/components/sections/FamilyMessageSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { PhotoUploadSection } from "@/components/sections/PhotoUploadSection";
import { RsvpSection } from "@/components/sections/RsvpSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function PersonalizedInvitationPage() {
  const params = useParams<{ slug: string }>();
  const { invitee, isLoading } = useInvitee(params.slug);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cream">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <main className="flex-1">
      <HeroSection inviteeName={invitee?.displayName} />
      <CountdownSection />
      <DateTimeSection />
      <VenueSection />
      <DressCodeSection />
      <FamilyMessageSection />
      <SpotifySection />
      <GallerySection />
      <PhotoUploadSection />
      <RsvpSection invitee={invitee} />
      <FooterSection />
    </main>
  );
}
