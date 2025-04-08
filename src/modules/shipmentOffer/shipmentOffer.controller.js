import { shipmentModel } from "../../../DataBase/models/shipment.model.js";
import { shipmentOfferModel } from "../../../DataBase/models/shipmentOffer.model.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/catchError.js";


export const createShipmentOffer = catchError(async(req, res, next) => {
    const { price, estimatedDeliveryDate, notes, shipment } = req.body

    const offer = await shipmentOfferModel.create({price, estimatedDeliveryDate, notes, shipment, carrier: req.user._id})
    res.status(201).json({message: "offer submitted", offer})
})

export const getShipmentOffers = catchError(async (req, res, next) => {
    const { id } = req.params;
  
    console.log("Shipment ID:", id);
  
    const offers = await shipmentOfferModel
      .find({ shipment: id })
      .populate("carrier", "name email");
  
    console.log("Offers:", offers);
  
    res.status(200).json({ message: "Offers fetched", offers });
  });


  export const acceptShipmentOffer = catchError(async (req, res, next) => {
    const { id } = req.params;
  
    //  هات العرض
    const offer = await shipmentOfferModel.findById(id);
    if (!offer) return next(new AppError("Offer not found", 404));
  
    //  هات الشحنة
    const shipment = await shipmentModel.findById(offer.shipment);
    if (!shipment) return next(new AppError("Shipment not found", 404));
  
    //  اتأكد إن اليوزر هو صاحب الشحنة
    if (shipment.shipper.toString() !== req.user._id.toString()) {
      return next(new AppError("Not authorized to accept offers for this shipment", 403));
    }
  
    //  حدّث حالة العرض المقبول
    offer.status = "accepted";
    await offer.save();
  
    //  ارفض باقي العروض
    await shipmentOfferModel.updateMany(
      { shipment: offer.shipment, _id: { $ne: offer._id } },
      { $set: { status: "rejected" } }
    );
  
    //  عدّل حالة الشحنة
    shipment.status = "in_progress";
    shipment.carrier = offer.carrier;
    await shipment.save();
  
    res.status(200).json({ message: "Offer accepted", offer });
  });