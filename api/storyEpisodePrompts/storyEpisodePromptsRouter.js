const router = require('express').Router();
const Prompts = require('./storyEpisodePromptsModel');

// *********create middleware to check if episode with that id exists...
router.get('/episodes/:id/prompt', async (req, res) => {
  try {
    const episode = await Prompts.getEpisodeById(req.params.id);

    const episodePrompts = await Prompts.getEpisodePromptByEpisodeId(
      req.params.id
    ); // Should send an array of prompts

    const combinedEpisodeAndEpisodePrompts = {
      id: episode.id,
      storyId: episode.storyId,
      textImgUrl: episode.textImgUrl,
      audioUrl: episode.audioUrl,
      content: episode.content,
      prompts: episodePrompts,
    };
    res.status(200).json(combinedEpisodeAndEpisodePrompts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE MIDDLEWARE TO MAKE SURE episodeId, type, and prompt are fields sent from FE in the req.body
router.post('/prompts', async (req, res) => {
  try {
    const episodePrompt = await Prompts.addEpisodePrompt(req.body); //req.body should have episodeId in it (supplied by FE) so this should work
    res.status(200).json(episodePrompt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

exports = module.exports = router;
