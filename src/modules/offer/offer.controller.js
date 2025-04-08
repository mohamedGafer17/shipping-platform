import { offerModel } from "../../../DataBase/models/offer.model.js";
import { catchError } from "../../utils/catchError.js";



export const createOffer = catchError(async(req, res, next)=> {
    const { shipmentId, price} = req.body

    const offer = new offerModel({shipmentId, carrierId: req.user._id, price})
    await offer.save()

    res.status(201).json({ message: " offer submitted successfully", offer})
})

export const getAllOffers = catchError(async(req, res, next)=> {
    const offer = await offerModel.find()
    res.status(200).json({message: "success", offer})
})