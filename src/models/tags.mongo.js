const mongoose = require("mongoose");
const slugify = require("slugify");

const tagsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true, // No duplicate tags name
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// automatically generate slug from name if not set
tagsSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, {
      lowercase: true,
      strict: true,
    });
  }
  next();
});

// Adding index for faster lookups by slug
tagsSchema.index({
  slug: 1,
});

module.exports = mongoose.model("Tag", tagsSchema);
