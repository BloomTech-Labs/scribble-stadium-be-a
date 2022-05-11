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
