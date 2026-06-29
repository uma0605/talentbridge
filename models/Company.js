import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const companySchema = new mongoose.Schema(
  {
    companyName: { type: String, required: [true, 'Company name is required'], trim: true },
    email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, trim: true },
    password: { type: String, required: [true, 'Password is required'], minlength: 8, select: false },
    role: { type: String, default: 'company' },
  },
  { timestamps: true }
);

companySchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

companySchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Company = mongoose.model('Company', companySchema);
export default Company;
