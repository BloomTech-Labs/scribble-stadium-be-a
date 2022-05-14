const router = require('express').Router();
const Stories = require('./storiesModel');
const { checkId } = require('./storiesMiddleware');
const { crudOperationsManager } = require('../lib/index');
const { auth0Verify, authProfile } = require('../middleware/authProfile');

// How do we test the Auth middleware? Even without the Auth middleware everything is broken without a token. So I am not sure how to test it.
// Delete in this file throws a 500 when using crudOps, and I am not sure why.

// GET - getAllStories() - localhost:8000/stories
router.get('/', auth0Verify, authProfile, (req, res) => {
  crudOperationsManager.getAll(res, Stories.getAllStories, 'All stories ');
});

// POST - add() - localhost:8000/stories
router.post('/', auth0Verify, authProfile, (req, res) => {
  crudOperationsManager.post(res, Stories.add, 'newStory', req.body);
});

// PUT - updateById() - localhost:8000/stories/1
router.put('/:id', auth0Verify, authProfile, checkId, (req, res) => {
  crudOperationsManager.update(
    res,
    Stories.updateById,
    'updatedStory',
    req.params.id,
    req.body
  );
});

// DELETE - remove() - localhost:8000/stories/1
router.delete('/:id', auth0Verify, authProfile, async (req, res) => {
  const id = req.params.id;
  await Stories.remove(id);
  res.status(204).json(`Story id: ${id} has been removed.`);

  // crudOps version not working and I do not know why.
  // crudOperationsManager.remove(
  //   res,
  //   Stories.remove,
  //   'removedStory',
  //   req.params.id,
  // )
});

module.exports = router;

// * AKA model @param {Function} query the model function that runs the relevant database query
// * errorName MSG @param {String} name the singular name of the data object being operated on

/*
Notes: 
- Most POST req do not have an id in the param.
- Add middleware and edge cases. 

[ ] GET  /stories/id                     - story by i
[ ] POST /stories                        - post a story 
[ ] GET  /stories/episodes/id/prompt     - get individual episode by episodeId, send prompts with it 
[ ] POST for the prompts by episode id

Tables used:

stories = {
  id: '7',       
  title: 'text',
  description: 'text',
  author: 'text',
}

storyEpisodes = {
  id: 1,
  storyId: 7,
  episodeNum: 1,
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
