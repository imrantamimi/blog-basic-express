const mongoose = require('mongoose');
const slugify = require('slugify');

const categoriesSchema = new mongoose.Schema(
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
      unique: true,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category', // self-reference for nested categories
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
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

categoriesSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
    });
  }
  next();
});

//Adding index for faster lookups by slug
categoriesSchema.index({
  slug: 1,
});

module.exports = mongoose.model('Category', categoriesSchema);
