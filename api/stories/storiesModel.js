const db = require('../../data/db-config');

function getAllStories() {
  return db('stories');
}

function getStoryById(id) {
  return db('stories').where({ id: id });
}

async function addStory(storyArg) {
  const [newStory] = await db('stories').insert(storyArg).returning('*');
  return newStory;
}

async function updateById(id, storyData) {
  await db('stories').where({ id: id }).update(storyData);
  return getStoryById(id);
}

async function remove(id) {
  const deletedStory = await db('stories').where({ id: id }).del();
  return deletedStory;
}

module.exports = {
  getAllStories,
  getStoryById,
  addStory,
  updateById,
  remove,
};
