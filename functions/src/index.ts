import * as admin from "firebase-admin";
import {onCall, HttpsError} from "firebase-functions/v2/https";
import {
  calculateOrderTotal,
  calculateOrderSubtotal,
} from "../.././src/utils/calculation";

admin.initializeApp();

export const PlaceOrder = onCall(async (request) => {
  if (!request.auth) {
    return new HttpsError("failed-precondition", "You are not authorized");
  }

  const firestore = admin.firestore();
  const lines = request.data.lines;

  const draft = {
    ...request.data,
    status: "pending",
    createdBy: request.auth.uid,
    total: calculateOrderTotal(lines, 13),
    subTotal: calculateOrderSubtotal(lines),
    pickupTime: admin.firestore.FieldValue.serverTimestamp(),
    createAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  const order = await firestore.collection("orders").add(draft);
  return {id: order.id, order: draft};
});