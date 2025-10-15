import { getAllTags, getTagById, createTag, updateTag, deleteTag } from '../models/tags.model.js';
import { getPagination } from '../utils/query.js';

export async function httpGetAllTags(req, res) {
  const { skip, limit } = getPagination(req.query);
  const tags = await getAllTags(skip, limit);
  return res.status(200).json(tags);
}

export async function httpGetTagById(req, res) {
  const tagId = req.params.id;
  const tag = await getTagById(tagId);
  return res.status(200).json(tag);
}

export async function httpCreateTag(req, res) {
  try {
    const data = req.body;
    const tag = await createTag(data);
    return res.status(200).json(tag);
  } catch (err) {
    if (err.message.includes('Slug must be unique')) {
      return res.status(400).json({
        message: 'Slug already exists',
      });
    }
    res.status(500).json({ message: 'Server error' });
  }
}

export async function httpUpdateTag(req, res) {
  const tagId = req.params.id;
  const data = req.body;
  const tag = await updateTag(tagId, data);
  return res.status(200).json(tag);
}

export async function httpDeleteTag(req, res) {
  const tagId = req.params.id;
  await deleteTag(tagId);
  return res.status(201).json({
    ok: true,
  });
}
