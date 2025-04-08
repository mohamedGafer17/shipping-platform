import mongoose, { model, Schema } from "mongoose";


const shipmentOfferSchema = new Schema({
    price: {
        type: Number,
        required: true,
      },
      estimatedDeliveryDate: {
        type: Date,
        required: true,
      },
      notes: {
        type: String,
      },
      shipment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shipment",
        required: true,
      },
      carrier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
      },
}, {timestamps: true})

export const shipmentOfferModel = model( "shipmentOffer", shipmentOfferSchema) 