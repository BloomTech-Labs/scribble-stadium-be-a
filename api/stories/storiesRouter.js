const router = require('express').Router();
const Stories = require('./storiesModel');
const { crudOperationsManager } = require('../lib/index');
const { auth0Verify, authProfile } = require('../middleware/authProfile');

// GET - getAllStories() - localhost:8000/stories
router.get('/', auth0Verify, authProfile, (req, res) => {
  crudOperationsManager.getAll(res, Stories.getAllStories, 'All stories ');
});

// POST - addStory() - localhost:8000/stories
router.post('/', auth0Verify, authProfile, (req, res) => {
  crudOperationsManager.post(res, Stories.addStory, 'newStory', req.body);
});

// GET - getStoryById(req.params.id) - localhost:8000/stories/1
router.get('/:id', auth0Verify, authProfile, (req, res) => {
  crudOperationsManager.getById(
    res,
    Stories.getStoryById,
    'story',
    req.params.id
  );
});

// PUT - updateById(req.params.id) - localhost:8000/stories/1
router.put('/:id', auth0Verify, authProfile, (req, res) => {
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
});

module.exports = router;
