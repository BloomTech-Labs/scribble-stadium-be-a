const profileParents = require('./profileModel');

const checkProfileExists = async (req, res, next) => {
  try {
    const parent = await profileParents.findById(req.params.id);
    if (!parent) {
      next({
        status: 404,
        message: 'Profile not found',
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkProfileExists,
};
