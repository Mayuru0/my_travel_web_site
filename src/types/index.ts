import { StaticImageData } from "next/image";

export type Destination = {
  id: number;
  name: string;
  province: string;
  image: StaticImageData; 
  description: string;
  gallery: {
    image1: StaticImageData;
    image2: StaticImageData;
  };
  coverImg: StaticImageData;

  
}
  
  export type MoreDestination = {
    id: number;
    name: string;
    image: StaticImageData;
  }
  

  export interface Vlog {
  id?: string; // 🔁 Make this optional
  title: string;
  url: string;
  category: string;
  duration: string;
  description: string;
  thumbnailUrl: string;
  public_id?: string; 
 vlogId?: string
}