import mongoose from 'mongoose';
import validator from 'validator';

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "🙏🙏Please provide your name!"],
    minLength: [3, "Name must be at least 3 characters!"],
    maxLength: [40, "Name can not exceeds 40 characters!"],
  },
  email: {
    type: String,
    validator: [validator.isEmail, "🙏🙏Please provide your name!"],
    required: [true, "🙏🙏Please provide your  email!"],
  },
  coverletter: {
    type: String,
    required: [true, "🙏🙏Please provide your cover Letter!"],
  },
  phone: {
    type: Number,
    required: [true, "🙏🙏Please provide your Phone Number!"],
  },
  address: {
    type: String,
    required: [true, "🙏🙏Please provide your address!"],
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    applicantID: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      role: {
        type: String,
        enum: ["job Seeker"],
        required: true,
      },
    },
    employerID: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      role: {
        type: String,
        enum: ["Employer"],
        required: true,
      },
    },
  },
});
export const Application = mongoose.model("Application",applicationSchema);