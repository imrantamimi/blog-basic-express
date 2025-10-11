import { tagDatabase } from './tags.mongo.js';

// CREATE a tag
export async function createTag(data) {
  const tag = new tagDatabase(data);
  return await tag.save();
}

// READ all tags
export async function getAllTags(skip, limit) {
  return await tagDatabase
    .find()
    .sort({
      createdAt: 1,
    })
    .skip(skip)
    .limit(limit);
}

// READ one tag by ID
export async function getTagById(id) {
  return await tagDatabase.findById(id).populate('createdBy');
}

// UPDATE tag by ID
export async function updateTag(id, data) {
  return await tagDatabase
    .findByIdAndUpdate(id, data, {
      new: true, //returns updated document
    })
    .populate('createdBy');
}

//DELETE tag by id
export async function deleteTag(id) {
  return await tagDatabase.findByIdAndDelete(id);
}
