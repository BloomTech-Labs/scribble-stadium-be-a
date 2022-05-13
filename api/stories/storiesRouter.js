const router = require('express').Router();
const Stories = require('./storiesModel');
const { checkId } = require('./storiesMiddleware');

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

// GET - getAllStories() - localhost:8000/stories - For testing purposes*
router.get('/', async (req, res) => {
  try {
    const stories = await Stories.getAllStories();
    console.log('stories =', stories);
    res.status(200).json(stories);
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

module.exports = router;
