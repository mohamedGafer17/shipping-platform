import { userModel } from "../../../DataBase/models/user.model.js"
import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../utils/catchError.js"
// import bcryptjs from 'bcryptjs'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"



// register
export const registerUser = catchError(async (req, res, next) => {
    const { name, email, password, role } = req.body;
    // التحقق من وجود المستخدم مسبقًا
    const isUser = await userModel.findOne({ email });
    if (isUser) return next(new AppError("Account Already Exists", 409)); // 409 >> Duplicate
    // تشفير كلمة السر
    const hashedPassword = bcrypt.hashSync(password, 10);
    // إنشاء المستخدم الجديد مع كلمة السر المشفرة
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();
    // إنشاء JWT
    const token = jwt.sign(
      {
        email: user.email,
        name: user.name,
        id: user._id,
        role: user.role,
      },
      "route"
    );
    res.status(201).json({ message: "success", user, token });
  });

// login
export const login = catchError(async(req, res, next)=> {
  const {email, password} = req.body

  const user = await userModel.findOne({ email })
  if(!user || !bcrypt.compareSync(password, user.password))
    return next(new AppError('In valid email or password', 409))

  const token = jwt.sign(
    { email: user.email, name: user.name, id: user._id, role: user.role,},"route"
  );
  res.status(201).json({ message: "success", token });
})

