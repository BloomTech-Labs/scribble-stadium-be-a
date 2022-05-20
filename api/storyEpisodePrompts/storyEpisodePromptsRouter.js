const router = require('express').Router();
const Prompts = require('./storyEpisodePromptsModel');
const { crudOperationsManager } = require('../lib/index');
const { auth0Verify, authProfile } = require('../middleware/authProfile');

// ***create middleware to check if episode with that id exists...
// GET - getEpisodeById(req.params.id) - http://localhost:8000/storyEpisodePrompts/episodes/1/prompt

// Add this*
// get all prompts where episodeId === req.params.id

// get should by id
router.get('/:episodeId', auth0Verify, authProfile, async (req, res) => {
  try {
    const episode = await Prompts.getEpisodeById(req.params.episodeId);

    const episodePrompts = await Prompts.getEpisodePromptByEpisodeId(
      req.params.episodeId
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

// POST - addEpisodePrompt - http://localhost:8000/storyEpisodePrompts
router.post('/', auth0Verify, authProfile, (req, res) => {
  console.log('@@@@@@@@@@@@@@@@@@@@req.body', req.body);
  crudOperationsManager.post(res, Prompts.addEpisodePrompt, 'prompt', req.body);
});

exports = module.exports = router;
