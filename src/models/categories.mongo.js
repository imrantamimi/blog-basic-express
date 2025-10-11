import mongoose from 'mongoose';
import slugify from 'slugify';

const { Schema, model } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true, // no duplicate category names
    },
    slug: {
      type: String,
      required: true,
      unique: true, // Also creates an index
      lowercase: true,
      trim: true, //URL-friendly version of name
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      url: {
        type: String,
      },
      altText: {
        type: String,
      },
    },
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: 'Category', // self-reference for nested categories
      default: null,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true, //add createdAt and updatedAt fields
  }
);

//Automatically generate slug from name if not set

categorySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
    });
  }
  next();
});

export const CategoryDatabase = model('Category', categorySchema);
