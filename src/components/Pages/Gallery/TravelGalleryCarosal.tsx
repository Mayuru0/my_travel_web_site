import TravelGalleryCard from "./TravelGalleryCard";
import { moreDestinations } from "@/data/destinations";

export default function TravelGalleryCarosal() {
  return (
    <>
    <div className="py-8">
      <TravelGalleryCard moreDestinations={moreDestinations} />
    </div>
    
  </>
  );
}

