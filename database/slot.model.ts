import { model, models, Schema, Document } from "mongoose";

export interface ISlot {
  slotId: string;
  location: string;
  deviceId: string;
}

export interface ISlotDocument extends ISlot, Document {}
const SlotSchema = new Schema<ISlotDocument>(
  {
    slotId: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    deviceId: { type: String, required: true },
  },
  { timestamps: true }
);

const Slot = models?.Slot || model<ISlotDocument>("Slot", SlotSchema);

export default Slot;
