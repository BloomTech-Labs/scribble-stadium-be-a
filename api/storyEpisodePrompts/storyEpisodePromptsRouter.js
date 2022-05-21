const router = require('express').Router();
const Prompts = require('./storyEpisodePromptsModel');
const { crudOperationsManager } = require('../lib/index');
const { auth0Verify, authProfile } = require('../middleware/authProfile');

// GET - getEpisodePromptByEpisodeId(req.params.episodeId) - http://localhost:8000/storyEpisodePrompts/1
router.get('/:episodeId', auth0Verify, authProfile, async (req, res) => {
  crudOperationsManager.getById(
    res,
    Prompts.getEpisodePromptByEpisodeId,
    'prompts',
    req.params.episodeId
  );
});

// POST - addEpisodePrompt - http://localhost:8000/storyEpisodePrompts
router.post('/', auth0Verify, authProfile, (req, res) => {
  crudOperationsManager.post(res, Prompts.addEpisodePrompt, 'prompt', req.body);
});

exports = module.exports = router;

//   try {
//     const episodePrompts = await Prompts.getEpisodePromptByEpisodeId(
//       req.params.episodeId
//     );
//     res.status(200).json(episodePrompts);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
