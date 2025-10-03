const { getAllTags, getTagById, createTag, updateTag, deleteTag } = require('../models/tags.model');
const { getPagination } = require('../utils/query');

async function httpGetAllTags(req, res) {
  const { skip, limit } = getPagination(req.query);
  const tags = await getAllTags(skip, limit);
  return res.status(200).json(tags);
}

async function httpGetTagById(req, res) {
  const tagId = req.params.id;
  const tag = await getTagById(tagId);
  return res.status(200).json(tag);
}

async function httpCreateTag(req, res) {
  const data = req.body;
  const tag = await createTag(data);
  return res.status(200).json(tag);
}

async function httpUpdateTag(req, res) {
  const tagId = req.params.id;
  const data = req.body;
  const tag = await updateTag(tagId, data);
  return res.status(200).json(tag);
}

async function httpDeleteTag(req, res) {
  const tagId = req.params.id;
  await deleteTag(tagId);
  return res.status(201).json({
    ok: true,
  });
}

module.exports = {
  httpGetAllTags,
  httpGetTagById,
  httpCreateTag,
  httpUpdateTag,
  httpDeleteTag,
};
