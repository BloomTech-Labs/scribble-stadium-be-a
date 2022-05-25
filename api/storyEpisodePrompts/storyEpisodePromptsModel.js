const db = require('../../data/db-config');

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
  getEpisodePromptByEpisodeId,
  addEpisodePrompt,
};
