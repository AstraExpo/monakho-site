import {
  FirestoreDataConverter,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import { BaseProduct } from "../types/product";

export const productConverter: FirestoreDataConverter<BaseProduct> = {
  toFirestore({ id, ...data }: BaseProduct): DocumentData {
    return data;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): BaseProduct {
    const data = snapshot.data(options)!;
    return {
      id: snapshot.id,
      ...(data as Omit<BaseProduct, "id">),
    };
  },
};
