import express from "express";
import { createShippingBill, getMyShippingBills, getShippingBillDetails } from "./shippingBill.controller.js";
import { auth } from "../../middleware/auth.js";
import { upload } from "../../middleware/upload.js";
import { shippingBillModel } from "../../../DataBase/models/shippingBill.model.js";

const shippingBillRouter = express.Router();

// إنشاء بوليصة شحن بناءً على offerId
shippingBillRouter.post('/:id', auth("shipper"), createShippingBill);

shippingBillRouter.get('/', auth("shipper","carrier"), getMyShippingBills);

shippingBillRouter.patch("/:id", auth("shipper"), getShippingBillDetails);

shippingBillRouter.patch(
    "/:id",
    auth("shipper"),
    upload.single("bill"),
    async (req, res, next) => {
      const { id } = req.params;
  
      const bill = await shippingBillModel.findById(id);
      if (!bill) return next(new AppError("Shipping bill not found", 404));
  
      bill.pdfFile = req.file.filename;
      await bill.save();
  
      res.status(200).json({ message: "PDF uploaded", file: req.file.filename });
    }
  );

export default shippingBillRouter;