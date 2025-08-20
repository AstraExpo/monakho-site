import { db } from "@/lib/server/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function fetchProducts() {
  const snapshot = await getDocs(collection(db, "products"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
