import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';




const emergencyContactSchema = new mongoose.Schema({ 
  name: { 
    type: String,
    // required: true
   },
  relationship: { 
    type: String, 
    //required: true
   },
  phoneNumber: {
     type: String,
      // required: true
     },
})

const employeeSchema = new Schema(
  {
    emp_id: {
        type: String,
        unique: true,
        default: () => uuidv4().replace(/-/g, '').slice(0, 16) // Generates a 16 digit unique id
      },
      firstName: {
        type: String,
       required: true
      },
      lastName: {
        type: String,
       required: true
      },
      email: {
        type: String,
       required: true,
        unique: true
      },
      position: {
        type: String,
      required: true
      },
      department: {
        type: String,
       required: true
      },
      dateOfJoining: {
        type: String,
       required: true
      },
      phoneNumber: {
        type: String,
       required: true
      },
      address: {
        street: {
          type: String,
          required: true
        },
        city: {
          type: String,
          required: true
        },
        state: {
          type: String,
          required: true
        },
        postalCode: {
          type: String,
          required: true
        },
        country: {
          type: String,
          required: true
        }
      },
      salary: {
        type: Number,
        required: true
      },
      managerId: {
        type: Number
      },
      employmentType: {
        type: String,
        required: true
      },
      skills: {
        type: [String],
       required: true
      },
      emergencyContact: { 
        type: [emergencyContactSchema]
      },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
      },
    },
  },
  {
    timestamps: true,
  }
);



export const Employee = mongoose.model("Employee", employeeSchema);

