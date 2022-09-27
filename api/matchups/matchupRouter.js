const router = require('express').Router();
const { crudOperationsManager } = require('../lib/index');
const Matchups = require('./matchupsModel');
const { auth0Verify, authProfile } = require('../middleware/authProfile');

/**
 * @swagger
 *   components:
 *       schema:
 *          matchupObject:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 episodeDate:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 quads:
 *                   type: []
 *                 players:
 *                   type: []
 *               example:
 *                 id: 1
 *                 episodeDate: 2021-10-08 19:13:54.822+00
 *                 quads: []
 *                 players: []
 *                 createdAt: 2021-10-08 19:13:54.822+00
 *                 updatedAt: 2021-10-08 19:13:54.822+00
 */

/**
 * @swagger
 * paths:
 *   /matchups/{id}:
 *    get:
 *       summary: returns an array of object matchups
 *       security:
 *         - okta: []
 *       tags:
 *         - matchups
 *       description: Get all matchups by the matchup's id
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: id must be in the parameter to receive squads
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
 *            description: 'Profile not found'
 */

// get matchup by the matchup id
router.get('/:id', auth0Verify, authProfile, (req, res) => {
  const { id } = req.params;
  crudOperationsManager.getAll(
    res,
    Matchups.getMatchupByMatchupId,
    'Matchup could not be retrieved because the id was ',
    id
  );
});

module.exports = router;
