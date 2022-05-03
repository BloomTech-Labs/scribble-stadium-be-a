const Stories = require('./storiesModel.js');

// Checks database for matching id.
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

module.exports = {
  checkId,
};
