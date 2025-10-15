import { body } from 'express-validator';

export const createPostValidator = [
  body('name').trim().notEmpty().withMessage('Title is required'),
  body('slug').trim().notEmpty().withMessage('Slug is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('image.url').optional().isURL().withMessage('Image must be a valid URL'),
  body('image.altText')
    .optional()
    .isString()
    .isLength({
      max: 100,
    })
    .withMessage('Must be upto 100 characters'),
  body('category').exists().withMessage('Category is required').bail().notEmpty().withMessage('Category is required').bail().isMongoId().withMessage('Category should be valid'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array')
    .custom(async (tags) => {
      // Skip empty array
      if (!tags.length) {
        return true;
      }
      //Ensure all elements are either strings or valid ObjectIds
      const invalidIds = tags.filter((id) => !mongoose.Types.ObjectId.isValid(id));
      if (invalidIds.length > 0) {
        throw new Error(`Invalid tag IDs: ${invalidIds.join(', ')}`);
      }
      // Query all tags that match given IDs
      const existingTags = await tags
        .find({
          _id: {
            $in: tags,
          },
        })
        .select('_id');
      if (existingTags.length !== tags.length) {
        throw new Error('One or more tag IDs do not exits');
      }
      return true;
    }),
];
