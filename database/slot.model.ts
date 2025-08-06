import { model, models, Schema, Document } from "mongoose";

export interface ISlot {
  slotId: string;
  location: string;
  deviceId: string;
}

export interface ISlotDoc extends ISlot, Document {}
const SlotSchema = new Schema<ISlot>(
  {
    slotId: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    deviceId: { type: String, required: true },
  },
  { timestamps: true }
);

const Slot = models?.Slot || model<ISlot>("Slot", SlotSchema);

export default Slot;
