const categoriesDatabase = require('./categories.mongo');

// CREATE a category
async function createCategory(data) {
  const category = new categoriesDatabase(data);
  return await category.save();
}

//READ all categories
async function getAllCategories(skip, limit) {
  return await categoriesDatabase
    .find()
    .sort({
      createdAt: 1,
    })
    .skip(skip)
    .limit(limit);
}

//Read category by ID
async function getCategoryById(id) {
  return await categoriesDatabase.findById(id).populate('createdBy').populate('parentCategory');
}

//Update category
async function updateCategory(id, data) {
  return await categoriesDatabase
    .findByIdAndUpdate(id, data, {
      new: true,
    })
    .populate('createdBy')
    .populate('parentCategory');
}

//Delete category
async function deleteCategory(id) {
  return await categoriesDatabase.findByIdAndDelete(id);
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
