const router = require('express').Router();
const Stories = require('./storiesModel');
const { checkId } = require('./storiesMiddleware');
// const { crudOperationsManager } = require('../lib/index');

// Intro to Relational Databases (Gabriel)
// https://bloomtech-1.wistia.com/medias/cfmhiymcj7

// Endpoints Ash asked for*
// [x] GET all episode by story
// [?] POST to add episode for a story
// [] GET storyEpisodePrompt by episode

// [x] GET - getAll() - get all episodes (chapters) of story.

// [?] POST - add() - add a chapter to the story.

// [] Prompts are the writing prompts the children are getting -
// - when they are asking write/draw something based on a story

// GET - getAll() - localhost:8000/stories
router.get('/', async (req, res) => {
  try {
    const stories = await Stories.getAll();
    console.log('stories =', stories);
    res.status(200).json(stories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// // crudOps version.
// router.get('/:id', checkId, async (req, res) => {
//   const { id } = req.params;
//   crudOperationsManager.getAll(
//     res,
//     Stories.getStoryById,
//     'Story could not be retrieved because id does not exist',
//     id
//   );
// });

// GET - getStoryById() - localhost:8000/stories/1
router.get('/:id', checkId, async (req, res) => {
  try {
    const story = await Stories.getStoryById(req.params.id);
    res.status(200).json(story);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST - add() - localhost:8000/stories
router.post('/', async (req, res) => {
  try {
    const story = await Stories.add(req.body);
    res.status(200).json(story);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT - updateById() - localhost:8000/stories/1
router.put('/:id', checkId, async (req, res) => {
  const updatedStory = await Stories.updateById(req.params.id, req.body);
  res.status(200).json(updatedStory);
});

// DELETE - remove() - localhost:8000/stories/1
router.delete('/:id', checkId, async (req, res) => {
  const id = req.params.id;
  await Stories.remove(id);
  res.status(204).json(`Story id: ${id} has been removed.`);
});

// GET - getEpisodesByStoryId() - localhost:8000/stories/1/episodes
router.get('/:storyId/episodes', async (req, res) => {
  try {
    const episodes = await Stories.getEpisodesByStoryId(req.params.storyId);
    if (episodes.length === 0 || !episodes)
      res.status(404).json({ message: 'story id not found' });
    else {
      res.status(200).json(episodes);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST - addEpisode() - localhost:8000/stories/episodes
router.post('/episodes', async (req, res) => {
  try {
    const episode = await Stories.addEpisode(req.body);
    res.status(200).json(episode);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// [] GET storyEpisodePrompt by episode id
// [] Prompts are the writing prompts the children are getting -
// - when they are asking write/draw something based on a story

router.get('/:episodeId/prompts', async (req, res) => {
  try {
    const story = await Stories.getEpisodePromptByEpisodeId(
      req.params.episodeId
    );
    res.status(200).json(story);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@ Old Code Below @@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// const router = require('express').Router();
// const { crudOperationsManager } = require('../../lib');
// const Stories = require('./storyModel');

// router.post('/', (req, res) => {
//   // Pull relevant data out of the request object
//   const newStory = req.body;

//   crudOperationsManager.post(res, Stories.add, 'Story', newStory);
// });

// // This endpoint returns all stories from 'Stories-New' table with corresponding 'Episodes' attached
// router.get('/', (req, res) => {
//   crudOperationsManager.getAll(res, Stories.getAllStories, 'allStories');
// });

// router.get('/:id', (req, res) => {
//   // Pull story ID out of the URL params
//   const { id } = req.params;

//   crudOperationsManager.getById(res, Stories.getById, 'Story', id);
// });

// router.put('/:id', (req, res) => {
//   // Pull relevant data out of the request object
//   const { id } = req.params;
//   const changes = req.body;

//   crudOperationsManager.update(res, Stories.update, 'Story', id, changes);
// });

// router.delete('/:id', (req, res) => {
//   // Pull story ID out of the URL params
//   const { id } = req.params;

//   crudOperationsManager.update(res, Stories.remove, 'Story', id);
// });

// //Does not get episode if reading/writing prompts do not exist.
// router.get('/episodes/:eid', async (req, res) => {
//   try {
//     // Pull episode ID out of the URL params
//     const { eid } = req.params;
//     const episode = await Stories.getEpisodeByID(eid);
//     const prompts = await Stories.getPromptsByEpisodeID(eid);
//     const data = {
//       ID: episode[0].ID,
//       StoryID: episode[0].StoryID,
//       EpisodeNumber: episode[0].EpisodeNumber,
//       TextURL: episode[0].TextURL,
//       AudioURL: episode[0].AudioURL,
//       WritingPrompt: prompts[0].WritingPrompt.Prompt,
//       DrawingPrompt: prompts[0].DrawingPrompt.Prompt,
//     };
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(404).json({
//       message: 'EpisodeNotFound',
//     });
//   }
// });

// // Work in progress by next cohort to add constraint to EpisodeNumber to be unique per story ID
// router.post('/episodes', (req, res) => {
//   // Pull relevant data out of the request object
//   const { StoryID, EpisodeNumber, TextURL, AudioURL } = req.body;
//   const newEpisode = {
//     StoryID: StoryID,
//     EpisodeNumber: EpisodeNumber,
//     TextURL: TextURL,
//     AudioURL: AudioURL,
//   };
//   crudOperationsManager.post(res, Stories.addEpisode, 'Story', newEpisode);
// });

// router.put('/episodes/:eid', (req, res) => {
//   // Pull episode ID out of the URL params
//   const { eid } = req.params;
//   // Pull relevant data out of the request object
//   const { EpisodeNumber, TextURL, AudioURL } = req.body;
//   const changes = {
//     EpisodeNumber: EpisodeNumber,
//     TextURL: TextURL,
//     AudioURL: AudioURL,
//   };

//   crudOperationsManager.update(
//     res,
//     Stories.updateEpisode,
//     'Episode',
//     eid,
//     changes
//   );
// });

// router.delete('/episodes/:eid', (req, res) => {
//   // Pull episode ID out of the URL params
//   const { eid } = req.params;

//   crudOperationsManager.update(res, Stories.removeEpisode, 'Episode', eid);
// });

// module.exports = router;
