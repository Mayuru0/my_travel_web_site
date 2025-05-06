import TravelGalleryCard from "../Gallery/TravelGalleryCard";
import { moreDestinations } from "../../../data/destinations";

export default function TravelGalleryCarosal() {
  return (
    <>
    <div className="mt-[5%] py-8">
      <TravelGalleryCard moreDestinations={moreDestinations} />
    </div>
    
  </>
  );
}

