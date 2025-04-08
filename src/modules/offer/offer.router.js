import express from "express"
import { auth } from "../../middleware/auth.js"
import { createOffer, getAllOffers } from "./offer.controller.js"

const offerRouter = express.Router()

offerRouter.post('/', auth("carrier"), createOffer)
offerRouter.get('/all', auth("carrier"), getAllOffers)

export default offerRouter