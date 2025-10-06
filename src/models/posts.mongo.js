const mongoose = require("mongoose");
const slugify = require("slugify");

const postsSchema = mongoose.Schema(
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
      unique: true,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true, //Add createdAt and updatedAt fields
  },
);

//Automatically generate slug name if not set

postsSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
    });
  }
  next();
});

// Indexing slug for faster retrieval

postsSchema.index({
  slug: 1,
});

module.exports = postsSchema;
