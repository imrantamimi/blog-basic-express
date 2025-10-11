import mongoose from 'mongoose';
import slugify from 'slugify';

const { Schema, model } = mongoose;

const tagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Also creates an index
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true, // Also creates an index
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
    timestamps: true,
  }
);

// automatically generate slug from name if not set
tagSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, {
      lowercase: true,
      strict: true,
    });
  }
  next();
});

export const tagDatabase = model('Tag', tagSchema);
