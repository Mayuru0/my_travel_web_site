import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

import{Destination, GalleryData} from '@/types/index'


//create Gallery

export const createGallery = async (data: Destination) => {
  const docRef = await addDoc(collection(db, "gallery"), {
    ...data,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
};

//get Gallery

export const getGalleries = async (): Promise<Destination[]> => {
  const snapshot = await getDocs(collection(db, "gallery"));

  const galleries: Destination[] = snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      province: data.province || "",
      subtitle: data.subtitle || "",
      title: data.title || "",
      date: data.date || "",
      description: data.description || "",
      coverImgUrl: data.coverImgUrl || "",
      galleryUrls: Array.isArray(data.galleryUrls) ? data.galleryUrls : [],    };
  });

  return galleries;
};





  //delete Gallery
  export const deleteGallery = async (galleryId: string) => {
    await deleteDoc(doc(db, "gallery", galleryId));
  }


  //get single gallery
export const getGalleryById = async (id: string): Promise<GalleryData | null> => {
  const docRef = doc(db, "gallery", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;

  const data = docSnap.data() as Omit<GalleryData, "id">;
  return { id: docSnap.id, ...data };
};

  //update Gallery
  export const updateGallery = async (gallery: Destination): Promise<void> => {
    if (!gallery.id) throw new Error("Gallery id is required");
  
    const docRef = doc(db, "gallery", gallery.id);
    await updateDoc(docRef, {
      ...gallery,
      updatedAt: serverTimestamp(),
    });
  };