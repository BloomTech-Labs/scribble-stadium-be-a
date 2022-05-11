const router = require('express').Router();
const Stories = require('./storiesModel');
const { checkId } = require('./storiesMiddleware');

// CLUTTERED MESS:
// const { crudOperationsManager } = require('../lib/index');
// Intro to Relational Databases (Gabriel)
// https://bloomtech-1.wistia.com/medias/cfmhiymcj7

// Or you can send all the necessary information in a single endpoint. For example:
// This one endpoint would return the corresponding episodes and prompts as well.
// GET story by id - /stories/id

// notes
// Primary id's need to be auto incrementing.
// Most POST req do not have an id in the param.

// Q's for Ash
// ASK HOW TO CHANGE THE URL PATH SO 'STORIES' IS IN THE FUNCTION PATH.
// Does every id have to be in the url AKA req.params rather than req.body?

// NEED TO CHANGE MIGRATION DELETE EPISODEID

/*

Create individual endpoints for each table. For example:

[x] GET  /stories/id                     - story by i
[x] POST /stories                        - post a story 

[x] GET  /stories/storyId/episodes       - get all episodes for a storyId - stories/storyId/episodes
[x] GET  /stories/episodes/episodeId     - episode by id 
[ ] POST /stories/episodes               - create new episode to existing story, connect stories primary id to episode storyId (req.body) // front end will make them match.

[ ] GET  /stories/episodes/id/prompt     - get individual episode by episodeId, send prompts with it 
[ ] POST for the prompts by episode id



TABLES: stories, storyEpisodes, storyEpisodePrompt

stories = {
  id: '7',
  title: 'text',
  description: 'text',
  author: 'text',
}

storyEpisodes = {
  id: 1,
  storyId: 7,
  textImgUrl: 'text',
  audioUrl: 'text',
  content: 'text',
}

storyEpisodePrompts = {
  id: 1,
  episodeId: 1,
  type: 'text',
  prompt: 'text',
}

*/

// GET - getAllStories() - localhost:8000/stories
router.get('/', async (req, res) => {
  try {
    const stories = await Stories.getAllStories();
    console.log('stories =', stories);
    res.status(200).json(stories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@     storyEpisodes     @@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// Needs middleware.
// GET  /stories/episodes/episodeId    - Getting episodes by the episodes id
router.get('/episodes/:episodeId', async (req, res) => {
  const episodes = await Stories.getEpisodeById(req.params.episodeId);
  res.status(200).json(episodes);
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
    if (episodes.length === 0)
      res.status(404).json({ message: 'StoryId not found' });
    else res.status(200).json(episodes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PER Ash - the endpoint should be stories/id/episodes
// Before refactoring.
// POST - addEpisode() - localhost:8000/stories/episodes
router.post('/:id/episodes', async (req, res) => {
  try {
    const episode = await Stories.addEpisode(req.body);
    res.status(200).json(episode);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// This is not working and I do not know why.
router.post('/episodes', async (req, res) => {
  try {
    const id = await Stories.getEpisodesByStoryId(req.body.storyId);
    // console.log('@@@@@@@@@@@@@@@@', req.body.storyId);
    console.log(id);
    if (id) {
      res
        .status(400)
        .json({ message: `storyId: ${req.body.storyId} already exists.` });
    } else {
      console.log('else_________');
      const episode = await Stories.addEpisode(req.body);
      res.status(200).json(episode);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

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

// Old version for reference, delete when done. // No edge case.
// POST - add() - localhost:8000/stories
// router.post('/', async (req, res) => {
//   try {
//     const story = await Stories.add(req.body);
//     res.status(200).json(story);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

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
