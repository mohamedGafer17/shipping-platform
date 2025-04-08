import express from "express"
import { acceptShipmentOffer, createShipmentOffer, getShipmentOffers } from "./shipmentOffer.controller.js"
import { auth } from "../../middleware/auth.js"

const shipmentOfferRouter = express.Router()

shipmentOfferRouter.post('/', auth("carrier"), createShipmentOffer)

shipmentOfferRouter.get('/shipment/:id', auth("shipper"), getShipmentOffers);
shipmentOfferRouter.patch('/:id/accept', auth("shipper"), acceptShipmentOffer)



export default shipmentOfferRouter