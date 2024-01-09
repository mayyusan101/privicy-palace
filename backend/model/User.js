const mongoose = require("mongoose");
const { Schema } = mongoose;

const AccountSchema = {
  type: {
    type: String,
  },
  accountName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
};

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  Accounts: [AccountSchema],
},{
    timestamps: true
});

// hide password & token field
userSchema.set("toJSON", {
  transform: (
    doc,
    { __v, password, token, ...rest },
    options
  ) => rest,
});

module.exports = mongoose.model("User", userSchema);
