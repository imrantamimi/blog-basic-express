import mongoose from 'mongoose';
import slugify from 'slugify';

const { Schema, model } = mongoose;

const postSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Also creates an index
      lowercase: true,
    },
    image: {
      url: {
        type: String,
      },
      altText: {
        type: String,
      },
    },
    content: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true, //Add createdAt and updatedAt fields
  }
);

//Automatically generate slug name if not set

postSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
    });
  }
  next();
});

export const postDatabase = model('Post', postSchema);
