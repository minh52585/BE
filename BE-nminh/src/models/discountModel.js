// models/discountModel.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const discountSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    minorder: {
      type: Number,
      required: true,
    },
    maxdiscount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    applies_category: {
      type: String,
      enum: ["all", "specific"],
      default: "all",
    },
    applies_products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    usagelimit: {
      type: Number,
      required: true,
    },
    usageperuser: {
      type: Number,
      required: true,
    },
    discount_type: {
      type: String,
      enum: ["percent", "fixed"],
      default: "percent",
    }
  },
  { timestamps: true } // moved here
);

const Discount = mongoose.model("Discount", discountSchema);

export default Discount;
