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

import { Destination, MoreDestination } from "@/type";

export const destinations: Destination[] = [
  {
    id: 1,
    name: "Anuradhapura",
    province: "North Central Province",
    image: anuradhapura,
    description: "Description for Anuradhapura",
    gallery: {
      image1: anuradhapura,
      image2: sigiriya,
    },
    coverImg: AnuradhapuraCoverImg,
  },
  {
    id: 2,
    name: "Sigiriya",
    province: "North Central Province",
    image: sigiriya,
    description: "Description for Sigiriya",
    gallery: {
      image1: sigiriya,
      image2: ella,
    },
    coverImg: AnuradhapuraCoverImg,
  },
  {
    id: 3,
    name: "Ella",
    province: "North Central Province",
    image: ella,
    description: "Description for Ella",
    gallery: {
      image1: ella,
      image2: sigiriya,
    },
    coverImg: AnuradhapuraCoverImg,
  },
  {
    id: 4,
    name: "Anuradhapura",
    province: "North Central Province",
    image: anuradhapura,
    description: "Description for Anuradhapura",
    gallery: {
      image1: anuradhapura,
      image2: ella,
    },
    coverImg: AnuradhapuraCoverImg,
  },
  {
    id: 5,
    name: "Sigiriya",
    province: "North Central Province",
    image: sigiriya,
    description: "Description for Sigiriya",
    gallery: {
      image1: sigiriya,
      image2: anuradhapura,
    },
    coverImg: AnuradhapuraCoverImg,
  },
  {
    id: 6,
    name: "Ella",
    province: "North Central Province",
    image: ella,
    description: "Description for Ella",
    gallery: {
      image1: ella,
      image2: anuradhapura,
    },
    coverImg: AnuradhapuraCoverImg,
  },
];
export const moreDestinations: MoreDestination[] = [
  { id: 1, name: "Sigiriya", image: Sigiriya },
  { id: 2, name: "Galle", image: Galle },
  { id: 3, name: "Kandy", image: Kandy },
  { id: 4, name: "Polonnaruwa", image: Polonnaruwa },
  { id: 5, name: "Pinnawala", image: Pinnawala },
  { id: 6, name: "Seegiriya", image: Sigiriya },
  { id: 7, name: "Galle", image: Galle },
  { id: 8, name: "Kandy", image: Kandy },
  { id: 9, name: "Polonnaruwa", image: Polonnaruwa },
];

