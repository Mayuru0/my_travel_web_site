import anuradhapura from "../../public/Destinations/Anuradhapura.png";
import sigiriya from "../../public/Destinations/Seegiriya.png";
import AnuradhapuraCoverImg from "../../public/Destinations/AnuradhapuraCoverImg.png"
import ella from "../../public/Destinations/Ella.png";
import Sigiriya from "../../public/Destinations/Seegiriya.png";
import Galle from "../../public/Destinations/Galle.png";
import Kandy from "../../public/Destinations/Kandy.png";
import Polonnaruwa from "../../public/Destinations/Polonnaruwa.png";
import Pinnawala from "../../public/Destinations/Pinnawala.png";
import { StaticImageData } from "next/image";

export interface Destination {
  id: number;
  name: string;
  image: StaticImageData;
  province:string;
  established:string;
  coverImg:StaticImageData;

}

export interface MoreDestination {
  name: string;
  image: StaticImageData;
}

export const destinations: Destination[] = [
  { id: 1, name: "Anuradhapura", province:"North Central Province", established:"5th century BC",image: anuradhapura , coverImg: AnuradhapuraCoverImg },
  { id: 2, name: "Sigiriya", province:"North Central Province", established:"5th century BC",image: sigiriya , coverImg: AnuradhapuraCoverImg },
  { id: 3, name: "Ella", province:"North Central Province", established:"5th century BC",image: ella , coverImg: AnuradhapuraCoverImg },

  { id: 4, name: "Anuradhapura", province:"North Central Province", established:"5th century BC",image: anuradhapura , coverImg: AnuradhapuraCoverImg },
  { id: 5, name: "Sigiriya", province:"North Central Province", established:"5th century BC",image: sigiriya , coverImg: AnuradhapuraCoverImg },
  { id: 6, name: "Ella" ,province:"North Central Province", established:"5th century BC", image: ella , coverImg: AnuradhapuraCoverImg },
];

export const moreDestinations: MoreDestination[] = [
  { name: "sigiriya", image: Sigiriya },
  { name: "Galle", image: Galle },
  { name: "Kandy", image: Kandy },
  { name: "Polonnaruwa", image: Polonnaruwa },
  { name: "Pinnawala", image: Pinnawala },
  { name: "seegiriya", image: Sigiriya },
  { name: "Galle", image: Galle },
  { name: "Kandy", image: Kandy },
  { name: "Polonnaruwa", image: Polonnaruwa },
];
