import mongoose, { model, Schema } from 'mongoose'


const shipmentSchema = new Schema({
  shipper: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fromLocation: {
    type: String,
    required: true,
  },
  toLocation: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  goodsType: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "in_progress", "delivered"],
    default: "pending",
  },
  selectedOffer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Offer",
  },
}, {
  timestamps: true,
});

export const shipmentModel = model("Shipment", shipmentSchema);
