import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, dropDups: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: String, required: true, default: "false" },
  position: { type: String, required: true},
  resetToken:String,
  expireToken:Date,
});

const UserModel = mongoose.model("User", userSchema);
 


export default UserModel;