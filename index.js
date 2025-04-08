import express from 'express';
import { dbConnection } from './DataBase/dbConnection.js';
import userRouter from './src/modules/user/user.router.js';
import shipmentRouter from './src/modules/shipment/shipment.router.js';
import offerRouter from './src/modules/offer/offer.router.js';
import shipmentOfferRouter from './src/modules/shipmentOffer/shipmentOffer.router.js';
import shippingBillRouter from './src/modules/shippingBill/shippingBill.router.js';

const app = express()
const port = 3000
app.use(express.json())


dbConnection()

// routes
app.use('/api/users', userRouter)
// shipment
app.use('/api/shipments', shipmentRouter)
// offer
app.use('/api/offers', offerRouter)
// shipment offer
app.use('/api/shipmentOffers', shipmentOfferRouter)
// shippingBill
app.use('/api/shipmentOffers', shippingBillRouter)

app.get('/', (req, res) => res.send('App is running'))



app.listen(port, () => console.log(`App is running on port ${port}!`))