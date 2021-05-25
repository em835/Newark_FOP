import express from "express";
import pkg from "express-validator";
const { check } = pkg;
const router = express.Router();
import User from "../models/User.js";

import { registerUser, loginUser, getUser, resetPassword, newPassword, contact } from "../controllers/userController.js";
import { isAuth } from "../utils/utils.js";

router.post("/register",
  [
    // check("name")
    //   .isLength({ min: 5 })
    //   .withMessage("Full name be of 5 characters and above"),
    check("email", "email must be valid").isEmail()
    .custom((value, {req}) => {
        return new Promise((resolve, reject) => {
          User.findOne({email:req.body.email}, function(err, user){
            if(err) {
              reject(new Error('Server Error'))
            }
            if(Boolean(user)) {
              reject(new Error('E-mail already in use'))
            }
            resolve(true)
          });
        });
      }),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Password must have a minimum length of 5"),
  ],
  registerUser
);

router.post("/login", loginUser);

router.post("/me", isAuth, getUser);

router.post("/reset-password",  resetPassword);

router.post("/new-password",  newPassword);

router.post('/contact', contact);

export default router;
