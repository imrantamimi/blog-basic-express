const express = require("express");
const {
  httpGetAllTags,
  httpGetTagById,
  httpCreateTag,
  httpUpdateTag,
  httpDeleteTag,
} = require("../controllers/tags.controller");

const tagsRouter = express.Router();

tagsRouter.get("/", httpGetAllTags);
tagsRouter.get("/:id", httpGetTagById);
tagsRouter.post("/", httpCreateTag);
tagsRouter.put("/:id", httpUpdateTag);
tagsRouter.delete("/:id", httpDeleteTag);

module.exports = tagsRouter;
