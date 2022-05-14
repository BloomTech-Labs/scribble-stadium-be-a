const db = require('../../data/db-config');

// Accesses the storyEpisodes table:
function getEpisodeById(id) {
  return db('storyEpisodes').where({ id: id }).first();
}

async function getEpisodePromptByEpisodeId(episodeId) {
  return db('storyEpisodePrompts').where({ episodeId: episodeId }).select('*');
}

async function addEpisodePrompt(episodePrompt) {
  const [prompt] = await db('storyEpisodePrompts')
    .insert(episodePrompt)
    .returning('*');
  return prompt;
}

module.exports = {
  getEpisodeById,
  getEpisodePromptByEpisodeId,
  addEpisodePrompt,
};
