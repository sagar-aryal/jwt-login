import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Defining the user schema
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "First name is required"],
  },
  lastname: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

// bcrypt/hash password before saving to db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// removing sensitive-field (password)
userSchema.methods.removeSensitiveUserField = async function () {
  // clone object
  const userObject = this.user.toObject();
  delete userObject.password;
  return userObject;
};

// authenticate user by matching email and password
userSchema.statics.login = async function (email, password) {
  try {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user.removeSensitiveUserField();
      }
    }
  } catch (err) {
    console.log(err.message);
  }
};

// Creating the users model
const Users = mongoose.model("Users", userSchema);

export default Users;
