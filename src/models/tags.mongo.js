const mongoose = require('mongoose');
const slugify = require('slugify');

const tagsSchema = new mongoose.Schema(
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
    timestamps: true,
  }
);

// automatically generate slug from name if not set
tagsSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, {
      lowercase: true,
      strict: true,
    });
  }
  next();
});

module.exports = mongoose.model('Tag', tagsSchema);
