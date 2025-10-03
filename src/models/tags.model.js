const tagsDatabase = require('./tags.mongo');

// CREATE a tag
async function createTag(data) {
  const tag = new tagsDatabase(data);
  return await tag.save();
}

// READ all tags
async function getAllTags(skip, limit) {
  return await tagsDatabase
    .find()
    .sort({
      createdAt: 1,
    })
    .skip(skip)
    .limit(limit);
}

// READ one tag by ID
async function getTagById(id) {
  return await tagsDatabase.findById(id).populate('createdBy');
}

// UPDATE tag by ID
async function updateTag(id, data) {
  return await tagsDatabase
    .findByIdAndUpdate(id, data, {
      new: true, //returns updated document
    })
    .populate('createdBy');
}

//DELETE tag by id
async function deleteTag(id) {
  return await tagsDatabase.findByIdAndDelete(id);
}

module.exports = {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
};
