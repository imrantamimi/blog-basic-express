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
tagSchema.pre('save', async function (next) {
  if (this.isModified('slug')) {
    this.slug = slugify(this.slug, {
      lowercase: true,
      strict: true,
    });

    // Check for existing slug
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

tagSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();
  if (update.slug) {
    update.slug = slugify(update.slug, {
      lowercase: true,
      strict: true,
    });

    const existing = await this.model.findOne({
      slug: update.slug,
      _id: { $ne: this.getQuery()._id }, // exclude current doc
    });

    if (existing) {
      return next(new Error('Slug must be unique'));
    }

    this.setUpdate(update);
  }
  next();
});

export const tagDatabase = model('Tag', tagSchema);
