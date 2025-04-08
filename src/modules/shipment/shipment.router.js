import express from "express"
import { createShipment, getMyShipments, updateShipmentStatus } from "./shipment.controlle.js"
import { auth } from "../../middleware/auth.js"

const shipmentRouter = express.Router()

shipmentRouter.post('/', auth("shipper"), createShipment)
shipmentRouter.get('/', auth("shipper"), getMyShipments)
shipmentRouter.patch('/:id/status', auth("shipper"), updateShipmentStatus);


export default shipmentRouter