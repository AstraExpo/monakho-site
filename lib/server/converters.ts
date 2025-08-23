/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FirestoreDataConverter,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";
import { BaseProduct } from "../types/product";

export const productConverter: FirestoreDataConverter<BaseProduct> = {
  toFirestore(product: WithFieldValue<BaseProduct>): DocumentData {
    const { id, ...data } = product;
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
