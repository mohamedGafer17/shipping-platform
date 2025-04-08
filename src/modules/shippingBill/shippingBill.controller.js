import { shipmentModel } from "../../../DataBase/models/shipment.model.js";
import { shipmentOfferModel } from "../../../DataBase/models/shipmentOffer.model.js";
import { shippingBillModel } from "../../../DataBase/models/shippingBill.model.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/catchError.js";


export const createShippingBill = catchError(async(req, res, next) =>{
    
    const { id } = req.params;

  const offer = await shipmentOfferModel.findById(id).populate("shipment carrier");
  if (!offer || offer.status !== "accepted") {
    return next(new AppError("Offer is invalid or not accepted", 400));
  }

  const shipment = await shipmentModel.findById(offer.shipment._id);
  if (!shipment) {
    return next(new AppError("Shipment not found", 404));
  }

  // تأكد إن المستخدم هو صاحب الشحنة
  if (shipment.shipper.toString() !== req.user._id.toString()) {
    return next(new AppError("You are not authorized to generate bill for this shipment", 403));
  }

  // تأكد إن مفيش بوليصة موجودة لنفس الشحنة
  const existing = await shippingBillModel.findOne({ shipment: shipment._id });
  if (existing) {
    return next(new AppError("Shipping bill already exists", 400));
  }

  const bill = await shippingBillModel.create({
    shipment: shipment._id,
    shipper: req.user._id,
    carrier: offer.carrier._id,
    price: offer.price,
    deliveryEstimate: offer.estimatedDeliveryDate,
    notes: offer.notes,
    billNumber: `BILL-${Date.now()}`
  });

  res.status(201).json({ message: "Shipping bill created", bill });

})

export const getMyShippingBills = catchError(async (req, res, next) => {
    const userId = req.user._id;
    const role = req.user.role;
  
    let bills = [];
  
    if (role === "shipper") {
      bills = await shippingBillModel.find({ shipper: userId })
        .populate("shipment")
        .populate("carrier", "name email");
    } else if (role === "carrier") {
      bills = await shippingBillModel.find({ carrier: userId })
        .populate("shipment")
        .populate("shipper", "name email");
    } else {
      return res.status(403).json({ message: "Unauthorized role" });
    }
  
    res.status(200).json({ message: "Your bills", bills });
  });


  export const getShippingBillDetails = catchError(async (req, res, next) => {
    const { id } = req.params;
  
    const bill = await shippingBillModel.findById(id)
      .populate("shipment")
      .populate("shipper", "name email")
      .populate("carrier", "name email");
  
    if (!bill) {
      return next(new AppError("Shipping bill not found", 404));
    }
  
    res.status(200).json({
      message: "Shipping bill details",
      bill
    });
  });