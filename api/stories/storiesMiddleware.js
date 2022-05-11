const Stories = require('./storiesModel.js');

async function checkId(req, res, next) {
  console.log(
    '______________________________________....@@@@@@@@@@@ CHECK ID MIDDLEWARE @@@@@@@@@@@.......'
  );
  try {
    const id = await Stories.getStoryById(req.params.id);
    if (!id) res.status(404).json({ message: `ID: ${id} not found` });
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
