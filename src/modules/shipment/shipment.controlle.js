import { shipmentModel } from "../../../DataBase/models/shipment.model.js";
import { catchError } from "../../utils/catchError.js";


export const createShipment = catchError(async(req, res, next)=> {
    const { fromLocation, toLocation, weight, goodsType } = req.body

    const shipment = await shipmentModel.create({shipper: req.user._id,fromLocation, toLocation, weight, goodsType})
    res.status(201).json({message: "Shipment Created Successfully", shipment})
})

export const getMyShipments = catchError(async(req, res, next) => {
    const shipments = await shipmentModel.find({shipper: req.user._id})
    res.json({ shipments })
})

export const updateShipmentStatus = catchError(async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;
  
    const allowedStatuses = ["pending", "in_progress", "delivered"];
    if (!allowedStatuses.includes(status)) {
      return next(new AppError("Invalid status value", 400));
    }
  
    const shipment = await shipmentModel.findById(id);
    if (!shipment) {
      return next(new AppError("Shipment not found", 404));
    }
  
    if (shipment.shipper.toString() !== req.user._id.toString()) {
      return next(new AppError("Not authorized to update this shipment", 403));
    }
  
    shipment.status = status;
    await shipment.save();
  
    res.status(200).json({ message: "Shipment status updated", shipment });
  });