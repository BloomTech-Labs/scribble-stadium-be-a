// These Fields must exist in req.body for the creation of a new submission [POST]
const checkAllRequiredFieldsExist = (req, res, next) => {
  if (!req.body.childId || !req.body.storyId || !req.body.episodeId) {
    return res
      .status(400)
      .json({ message: 'Some required fields are missing.' });
  } else {
    next();
  }
};

module.exports = {
  checkAllRequiredFieldsExist,
};
