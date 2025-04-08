import mongoose, { model, Schema } from 'mongoose';

const offerSchema = new Schema({
  shipmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shipment',
    required: true,
  },
  carrierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  }
}, { timestamps: true });

export const offerModel = model('Offer', offerSchema);
