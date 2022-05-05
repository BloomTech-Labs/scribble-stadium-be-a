const Stories = require('./storiesModel.js');

async function checkId(req, res, next) {
  const id = req.params.id;
  try {
    const story = await Stories.getStoryById(id);
    if (!story) res.status(404).json({ message: 'ID not found' });
    else next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// async function checkStoryId(req, res, next) {
//   const id = req.params.storyId;
//   try {
//     const episodes = await Stories.getEpisodesByStoryID(id);
//     if (!episodes) res.status(404).json({ message: 'story id not found' });
//     else next();
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }

module.exports = {
  checkId,
  // checkStoryId
};
