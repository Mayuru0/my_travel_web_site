import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export interface ContactMessage {
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  message: string;
}

export const saveContact = async (data: ContactMessage): Promise<string> => {
  const docRef = await addDoc(collection(db, "contacts"), {
    ...data,
    status: "unread",
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};
