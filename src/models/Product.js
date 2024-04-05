import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: String,
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
  ],
  oldPrice: {
    type: Number,
    default: 0,
  },
  newPrice: {
    type: Number,
    required: true,
  },
  reveiws: [reviewSchema],
  category: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  stock: {
    type: Number,
    required: true,
  },
});

const Product =
  mongoose.models.Product || new mongoose.model("Product", productSchema);
export default Product;
