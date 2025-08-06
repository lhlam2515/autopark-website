import { model, models, Schema, Document, Types } from "mongoose";

export interface ISession {
  userId: Types.ObjectId;
  slotId: Types.ObjectId;
  checkInTime: Date;
  isActive?: boolean;
  checkOutTime?: Date;
  locked?: boolean;
  paymentStatus?: "unpaid" | "paid";
}

export interface ISessionDoc extends ISession, Document {}
const SessionSchema = new Schema<ISession>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    slotId: { type: Schema.Types.ObjectId, ref: "Slot", required: true },
    checkInTime: { type: Date, default: Date.now, required: true },
    checkOutTime: { type: Date },
    isActive: { type: Boolean, default: true },
    locked: { type: Boolean, default: false },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
  },
  { timestamps: true }
);

const Session = models?.Session || model<ISession>("Session", SessionSchema);

export default Session;
