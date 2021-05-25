import User from "../models/User.js";
import { getToken } from "../utils/utils.js";
import pkg from "express-validator";
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import sendgridTransport from 'nodemailer-sendgrid-transport'
import bcrypt from 'bcryptjs'

const { validationResult } = pkg;


const transporter = nodemailer.createTransport(sendgridTransport({
  auth:{
     api_key:"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"
     //api_key : "" + process.env.MY_KEY
  }
}))

export const registerUser = async (req, res) => {
    const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      } else {
    const newUser = await User.create(req.body);
    if (newUser) {
      res.send({
        _id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: getToken(newUser),
        position: newUser.position,
        msg: "Registered successfully!",
        success: true
      });

      transporter.sendMail({
        to:newUser.email,
        from:"fopnewarkmemberlist@gmail.com",
        subject:`Welcome To Newark Fraternal Order of Police Member list `,
        html:`
        <p>Dear ${newUser.username}<br>
        Welcome To Newark Fraternal Order of Police Member list for the year 2021.<br>
        This list is designed to communicate information, events,  and updates <br>
        to members of the Newark Community about the Fraternal Order of Police <br>


        For New Jerseys up-to-date Covids Alerts https://covid19.nj.gov/<br>
        For More information about the NJ  https://www.njfop.org/
      </p>
        `,
   
    })
    } else {
      res.status(404).send({ msg: "User Not Found" });
    }
      }
    
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (req, res) => {
  try {
    const signinUser = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    if (signinUser) {
      res.send({
        _id: signinUser.id,
        username: signinUser.username,
        email: signinUser.email,
        isAdmin: signinUser.isAdmin,
        token: getToken(signinUser),
        position: signinUser.position,
        msg: "Login successful!",
      });

    } else {
      res.status(401).send({ msg: "Invalid Email or Password." });
    }
  } catch (err) {
    console.log(err);
    console.log("commuing frombackend")
  }
};

export const getUser = async (req, res) => {
    try {
      const signinUser = await User.findOne({
        email: req.body.email,
      });
      if (signinUser) {
        res.send(signinUser);
      } else {
        res.status(401).send({ msg: "Invalid username or Password." });
      }
  }catch(err){
    res.send(err)
  }
}


export const resetPassword = (req, res) => {
  crypto.randomBytes(32,(err,buffer)=>{
      if(err){
          console.log(err)
      }
      const token = buffer.toString("hex")
      User.findOne({email:req.body.email})
      .then(user=>{
          if(!user){
              return res.status(422).json({error:"User dont exists with that email"})
          }
          user.resetToken = token
          user.expireToken = Date.now() + 3600000
          user.save().then((result)=>{
              transporter.sendMail({
                   to:user.email,
                  from:"fopnewarkmemberlist@gmail.com",
                  subject:"Password Reset",
                  html:`
                  <p>You requested for password reset</p>
                  <h5>click in this <a href="https://newarkpolice.herokuapp.com/newpassword.html?param=${token}">link</a> to reset password</h5><br>
                  For questions or comments about this message please contact the Newark Fraternal Oder of Police (Newrak FOP) at (973)- 642-0390 or newarkfoptest@gmail.com.

                  `
              })
              res.json({message:"check your email"})
          })

      })
  })
} 



export const newPassword = (req, res) => {
  
  const newPassword = req.body.password
  const sentToken = req.body.token
  User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
  .then(user=>{
      if(!user){
          return res.status(422).json({error:"Try again session expired"})
      }
      bcrypt.hash(newPassword,12).then(hashedpassword=>{
         user.password = newPassword
         user.resetToken = undefined
         user.expireToken = undefined
         user.save().then((saveduser)=>{
             res.json({message:"password updated success"})
         })
      })
  }).catch(err=>{
      console.log(err)
  })


}

export const contact = (req, res) => {
  try{
    const {contactName, message, email} = req.body
    transporter.sendMail({
      to:"newarkfoptest@gmail.com",
      from:"fopnewarkmemberlist@gmail.com",
      subject:`User's complaint`,
      html:`
      <p>name: ${contactName}<br>
       <p>mesaage: ${message}</p>
       <p>email: ${email}
    </p>
      `,
  })

  res.json({msg: "success"})

  }
  catch(err){
    console.log(err)
  }
} 
