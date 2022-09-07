const router = require('express').Router();
const { crudOperationsManager } = require('../lib/index');
const matchups = require('./matchupsModel');
const { auth0Verify, authProfile } = require('../middleware/authProfile');

/**
 * @swagger
 * paths:
 *   /matchup/{subId}:
 *    get:
 *       summary: returns an array of object matchups
 *       security:
 *         - okta: []
 *       tags:
 *         - matchups
 *       description: Get all matchups by the child's subId
 *       parameters:
 *         - name: subId
 *           in: path
 *           required: true
 *           description: subId must be in the parameter to receive child's matchups
 *           schema:
 *             type: integer
 *             example: 1
 *             minimum: 1
 *       responses:
 *          '200':
 *             description: Success Response
 *             content:
 *               application/json:
 *                 schema:
 *                   type: array
 *                   items:
 *                      $ref: '#components/schema/matchupObject'
 *          '401':
 *            $ref: '#/components/responses/UnauthorizedError'
 *          '404':
 *            description: 'Matchup not found'
 */

// get matchups by the child submission id
router.get('/:subId', auth0Verify, authProfile, (req, res) => {
  const { subId } = req.params;
  crudOperationsManager.getById(
    res,
    matchups.getMatchupBySubId,
    'Matchups could not be retrieved because the subId was ',
    subId
  );
});

module.exports = router;
