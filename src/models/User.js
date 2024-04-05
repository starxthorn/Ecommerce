import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  avatar: {
    type: String,
    required: false,
    default:
      "https://w7.pngwing.com/pngs/753/432/png-transparent-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-people-thumbnail.png",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  location: {
    type: String,
    required: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: Number,
    required: false,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
