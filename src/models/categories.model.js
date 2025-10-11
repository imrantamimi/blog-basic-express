import { CategoryDatabase } from './categories.mongo.js';

// CREATE a category
export async function createCategory(data) {
  const category = new CategoryDatabase(data);
  return await category.save();
}

//READ all categories
export async function getAllCategories(skip, limit) {
  return await CategoryDatabase.find()
    .sort({
      createdAt: 1,
    })
    .skip(skip)
    .limit(limit)
    .populate('createdBy');
}

//Read category by ID
export async function getCategoryById(id) {
  return await CategoryDatabase.findById(id).populate('createdBy').populate('parentCategory');
}

//Update category
export async function updateCategory(id, data) {
  return await CategoryDatabase.findByIdAndUpdate(id, data, {
    new: true,
  })
    .populate('createdBy')
    .populate('parentCategory');
}

//Delete category
export async function deleteCategory(id) {
  return await CategoryDatabase.findByIdAndDelete(id);
}
