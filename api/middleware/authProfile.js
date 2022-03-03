const createError = require('http-errors');
const Profiles = require('../profile/profileModel');
const jwt = require('express-jwt');
const auth0Config = require('../../config/auth0');

const makeProfileObj = (claims) => {
  return {
    id: claims.sub.slice(6),
    email: claims.email,
    name: claims.name,
  };
};
/**
 * A simple middleware that asserts valid Okta idToken and sends 401 responses
 * if the token is not present or fails validation. If the token is valid its
 * contents are attached to req.profile
 */
const authProfile = async (req, res, next) => {
  try {
    console.log('req.auth0User', req.auth0User);
    if (req.auth0User) {
      const jwtUserObj = makeProfileObj(req.auth0User);
      const profile = await Profiles.findOrCreateProfile(jwtUserObj);
      if (profile) {
        req.profile = profile;
        console.log('req.profile', profile);
      } else {
        throw new Error('Unable to process jwt profile');
      }
    }
    next();
  } catch (err) {
    next(createError(401, err.message));
  }
};

const auth0Verify = (req, res, next) => {
  if (req.path === '/') {
    next();
  } else {
    jwt(auth0Config)(req, res, next);
  }
};

module.exports = {auth0Verify, authProfile};
