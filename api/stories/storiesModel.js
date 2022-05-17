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

/**
 * Queries the database for a specific story with given ID
 * @param {number} id the id to search for in the database
 * @returns {Promise} a promise that resolves to story object of the
 * given story ID with all episodes and drawing/writing prompts
 */

// const getEpisodePromptByEpisodeId = async (id) => {
//   // grabs a story table by story id = 'title', 'author', 'description'
//   let story = await db('Stories').where('Stories.id', id);

//   // grabs all episodes for a given id
//   const episodes = await getEpisodesByStoryId(id);

//   console.log('@@@@@@@@@@@@@@@@@@@@@@@ episodes =', episodes);

// getting prompts from db and adding to each episode from arr
//   for (let i = 0; i < episodes.length; i++) {
//     let prompts = await getPromptsByEpisodeID(episodes[i].id);
//     episodes[i].WritingPrompt = prompts[0].WritingPrompt;
//     episodes[i].DrawingPrompt = prompts[0].DrawingPrompt;
//   }
//   story.episodes = episodes;
//   return [story];
// };

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

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@ Old Code Below @@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// const db = require('../../data/db-config');

// /**
//  * Queries the database to attempt to add a new story
//  * @param {Object} story the story to be added to the database
//  * @param {string} story.Title the title of the story
//  * @param {string} story.Description the description of the story
//  * @param {string} story.Author the author of the story
//  * @returns {Promise} a promise that resolves to the ID of the new story
//  */
// const add = (story) => {
//   return db('Stories').insert(story).returning('ID');
// };

// /**
//  * Queries the database for all stories
//  * @returns {Promise} a promise that resolves to an array of story
//  * objects with corresponding episodes
//  */
// const getAllStories = async () => {
//   const stories = await db('Stories');
//   for (let i = 0; i < stories.length; i++) {
//     let episodes = await getEpisodesByStoryID(stories[i].ID);
//     stories[i].Episodes = episodes;
//   }
//   return stories;
// };

// /**
//  * Queries the database for a specific story with given ID
//  * @param {number} ID the ID to search for in the database
//  * @returns {Promise} a promise that resolves to story object of the
//  * given story ID with all episodes and drawing/writing prompts
//  */
// const getById = async (ID) => {
//   const story = await db('Stories').where('Stories.ID', ID);
//   const episodes = await getEpisodesByStoryID(ID);
//   // const episodesArray = [];
//   // for (let i = 0; i < episodes.length; i++) {
//   //   episodesArray.push(episodes[i]);
//   // }
//   for (let i = 0; i < episodesArray.length; i++) {
//     let prompts = await getPromptsByEpisodeID(episodesArray[i].ID);
//     episodesArray[i].WritingPrompt = prompts[0].WritingPrompt.Prompt;
//     episodesArray[i].DrawingPrompt = prompts[0].DrawingPrompt.Prompt;
//   }
//   const storyWithEpisodes = {
//     ID: story[0].ID,
//     Title: story[0].Title,
//     Description: story[0].Description,
//     Author: story[0].Author,
//     Episodes: episodesArray,
//   };
//   return [storyWithEpisodes];
// };

// /**
//  * Queries the database to update row matching ID with the given changes
//  * @param {number} ID the unique row ID to update
//  * @param {Object} changes an object containing the changes
//  * @param {string} [changes.Title] new story title (optional)
//  * @param {string} [changes.Description] the new description of the story (optional)
//  * @param {string} [changes.Author] the new author of the story (optional)
//  * @returns {Promise} a promise that resolves to number of rows updated
//  */
// const update = (ID, changes) => {
//   return db('Stories').where({ ID }).update(changes);
// };

// /**
//  * Queries the database to remove a row
//  * @param {number} ID the ID of the row to delete
//  * @returns {Promise} a promise that resolves to the number of rows deleted
//  */
// const remove = (ID) => {
//   return db('Stories').where({ ID }).del();
// };

// /**
//  * Queries the database to retrieve all episodes for a specific story with given ID
//  * @param {number} storyID the ID to search for in the database
//  * @returns {Promise} a promise that resolves to story object of the given story ID
//  */
// const getEpisodesByStoryID = (storyID) => {
//   return db('Episodes as e')
//     .join('Stories as s', 'e.StoryID', 's.ID')
//     .where('s.ID', storyID)
//     .select(
//       'e.ID',
//       'e.StoryID',
//       'e.EpisodeNumber',
//       'e.TextURL',
//       'e.AudioURL',
//       'e.Content'
//     );
// };

// /**
//  * Queries the database for a specific episode with given ID
//  * @param {number} episodeID the ID to search for in the database
//  * @returns {Promise} a promise that resolves to episode object of the given story ID
//  */
// const getEpisodeByID = (episodeID) => {
//   return db('Episodes as e')
//     .where('e.ID', episodeID)
//     .select(
//       'e.ID',
//       'e.StoryID',
//       'e.EpisodeNumber',
//       'e.TextURL',
//       'e.AudioURL',
//       'e.Content'
//     );
// };

// /**
//  * Queries the database for a specific prompts with given episode ID
//  * @param {number} episodeID the ID to search for in the database
//  * @returns {Promise} a promise that resolves to drawing prompt object of the given episode ID
//  */
// const getPromptsByEpisodeID = async (episodeID) => {
//   let writing = await db('Story-Prompts as sp')
//     .where('sp.EpisodeID', episodeID)
//     .andWhere('sp.Type', 'Writing')
//     .select('sp.Prompt');
//   let drawing = await db('Story-Prompts as sp')
//     .where('sp.EpisodeID', episodeID)
//     .andWhere('sp.Type', 'Drawing')
//     .select('sp.Prompt');

//   let episodePrompts = {
//     WritingPrompt: writing[0],
//     DrawingPrompt: drawing[0],
//   };

//   return [episodePrompts];
// };
// /**
//  * Queries the database to attempt to add a new episode
//  * @param {Object} episode the episode to be added to the database
//  * @param {string} episode.StoryID the id of the story
//  * @param {string} episode.EpisodeNumber episode number
//  * @param {string} episode.TextURL text url of episode
//  * @param {string} episode.AudioURL audio url of episode
//  * @returns {Promise} a promise that resolves to the ID of the new episode
//  */
// const addEpisode = (episode) => {
// //   return db('Episodes').insert(episode).returning('ID');
// // };

// // /**
// //  * Queries the database to update row matching ID with the given changes
// //  * @param {number} episodeID the unique row ID to update
// //  * @param {Object} changes the episode to be added to the database
// //  * @param {string} changes.EpisodeNumber the description of the story
// //  * @param {string} changes.TextURL the author of the story
// //  * @param {string} changes.AudioURL the author of the story
// //  * @returns {Promise} a promise that resolves to the ID of the new story
// //  */
// // const updateEpisode = (episodeID, changes) => {
// //   return db('Episodes as e').where('e.ID', episodeID).update(changes);
// // };

// // /**
// //  * Queries the database to remove a row
// //  * @param {number} episodeID the ID of the row to delete
// //  * @returns {Promise} a promise that resolves to the number of rows deleted
// //  */
// // const removeEpisode = (episodeID) => {
// //   return db('Episodes as e').where('e.ID', episodeID).del();
// // };

// // module.exports = {
// //   add,
// //   getAllStories,
// //   getById,
// //   update,
// //   remove,
// //   getEpisodesByStoryID,
// //   getEpisodeByID,
// //   addEpisode,
// //   removeEpisode,
// //   updateEpisode,
// //   getPromptsByEpisodeID,
// // };
