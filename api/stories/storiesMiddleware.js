const Stories = require('./storiesModel.js');

async function checkId(req, res, next) {
  // console.log('@@@@@ CHECK ID MIDDLEWARE @@@@');
  try {
    const id = await Stories.getStoryById(req.params.id);
    if (!id) res.status(404).json({ message: `ID: ${id} not found` });
    else next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  checkId,
};
