import mongoose, { Schema } from 'mongoose';

// Define the Visitor interface
export interface IVisitor {
  ip: string;
  userAgent: string;
  timestamp: Date;
  country?: string;
  city?: string;
  referrer?: string;
  path: string;
}

// Define the Visitor schema
const visitorSchema = new Schema<IVisitor>(
  {
    ip: { type: String, required: true },
    userAgent: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    country: { type: String },
    city: { type: String },
    referrer: { type: String },
    path: { type: String, required: true },
  },
  { timestamps: true }
);

// Create and export the Visitor model
export const Visitor = mongoose.models.Visitor || mongoose.model<IVisitor>('Visitor', visitorSchema);