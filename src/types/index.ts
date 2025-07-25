import { StaticImageData } from "next/image";

// export type Destination = {
//   id: number;
//   name: string;
//   province: string;
//  // image: StaticImageData; 
//   description: string;
//   gallery: {
//     image1: StaticImageData;
//     image2: StaticImageData;
//     image3: StaticImageData;
//     image4: StaticImageData;
//     image5: StaticImageData;
//     image6: StaticImageData;
//     image7: StaticImageData;
//   };
//   coverImg: StaticImageData;

  
// }


export interface Destination  {
  id?: string;
  province: string
  title: string
  date:string
  description: string
  coverImgUrl: string
  galleryUrls: string[]
  subtitle: string
};


export interface GalleryData {
  id?: string;
  title: string;
  date: string;
  province: string;
  description: string;
  coverImgUrl: string;
  galleryUrls: string[];
  subtitle: string

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
 featured?: boolean;
}


import { Timestamp } from "firebase/firestore";
export type CategoryType = {
  id?: string;            
  title: string;           
  description: string;     
  coverImgUrl: string;      
 createdAt: Timestamp;
  province: string;
  galleryUrls: string[];
  Destination: string
  date: string
  subtitle: string
  
 
 
   
  
 
};
