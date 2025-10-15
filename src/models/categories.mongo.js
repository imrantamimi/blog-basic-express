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

categorySchema.pre('save', async function (next) {
  if (this.isModified('slug')) {
    this.slug = slugify(this.slug, {
      lowercase: true,
      strict: true,
    });
    const existing = await this.constructor.findOne({
      slug: this.slug,
      _id: {
        $ne: this._id,
      },
    });
    if (existing) {
      return next(new Error('Slug must be unique'));
    }
  }
  next();
});

categorySchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();
  if (update.slug) {
    update.slug = slugify(update.slug, {
      lowercase: true,
      strict: true,
    });
    const existing = await this.model.findOne({
      slug: update.slug,
      _id: {
        $ne: this.getQuery()._id,
      },
    });
    if (existing) {
      return next(new Error('Slug must be unique'));
    }
    this.setUpdate(update);
  }
  next();
});

export const CategoryDatabase = model('Category', categorySchema);
