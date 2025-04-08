import jwt from "jsonwebtoken";
import { userModel } from "../../DataBase/models/user.model.js";
import { AppError } from "../utils/AppError.js";


export const auth = (role) => {
    return async (req, res, next) => {
      try {
        const authHeader = req.headers.authorization;
  
        if (!authHeader || !authHeader.startsWith("Bearer "))
          return next(new AppError("Token is required", 401));
  
        const token = authHeader.split(" ")[1];
  
        const decoded = jwt.verify(token, "route");
  
        const user = await userModel.findById(decoded.id);
        if (!user) return next(new AppError("User not found", 404));
  
        if (role && user.role !== role)
          return next(new AppError("Not authorized", 403));
  
        req.user = user;
        next();
      } catch (err) {
        next(err); // هيعدي على globalError middleware
      }
    };
  };

















// export const auth = (role) => {
//   return async (req, res, next) => {
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) return next(new AppError("Token is required", 401));

//     const decoded = jwt.verify(token, "route");
//     const user = await userModel.findById(decoded.id);
//     if (!user) return next(new AppError("User not found", 404));

//     if (role && user.role !== role)
//       return next(new AppError("Not authorized", 403));

//     req.user = user;
//     next();
//   };
// };