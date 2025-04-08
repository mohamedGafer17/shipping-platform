import mongoose,{ model, Schema } from "mongoose";


const shippingBillSchema = new Schema({

    shipment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shipment",
        required: true
      },
      shipper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      carrier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      issueDate: {
        type: Date,
        default: Date.now
      },
      deliveryEstimate: {
        type: Date
      },
      notes: {
        type: String
      },
      billNumber: {
        type: String,
        required: true,
        unique: true
      },
      pdfFile: {
        type: String
      }

},{timestamps: true})

export const shippingBillModel = model("ShippingBill", shippingBillSchema)