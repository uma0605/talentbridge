import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Admin',
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    role: {
      type: String,
      default: 'admin',
    },
  },
  { timestamps: true }
);

// Hash password before saving
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model('Admin', adminSchema);

// Seed default admin on startup if none exists
export const seedAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ email: 'admin@talentbridge.com' });
    if (!adminExists) {
      await Admin.create({
        name: 'Super Admin',
        email: 'admin@talentbridge.com',
        password: 'admin123',
      });
      console.log('✅ Default admin seeded: admin@talentbridge.com / admin123');
    }
  } catch (err) {
    console.error('Admin seed error:', err.message);
  }
};

export default Admin;
