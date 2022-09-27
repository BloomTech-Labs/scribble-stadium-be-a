const router = require('express').Router();
const { crudOperationsManager } = require('../lib/index');
const Squads = require('./squadsModel.js');
const { auth0Verify, authProfile } = require('../middleware/authProfile');

/**
 * @swagger
 *   components:
 *       schema:
 *          squadObject:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 childId:
 *                   type: integer
 *                 subId:
 *                   type: integer
 *                 myDrawPoints:
 *                   type: integer
 *                 myWritePoints:
 *                   type: integer
 *                 teammateDrawPoints:
 *                   type: integer
 *                 teammateDrawPoints:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *               example:
 *                 id: 1
 *                 childId: 1
 *                 subId: 1
 *                 myDrawPoints: 40
 *                 myWritePoints: 60
 *                 teammateDrawPoints: 40
 *                 teammateWritePoints: 60
 *                 createdAt: 2021-10-08 19:13:54.822+00
 *                 updatedAt: 2021-10-08 19:13:54.822+00
 */

/**
 * @swagger
 * paths:
 *   /squads/{id}:
 *    get:
 *       summary: returns an array of object squads
 *       security:
 *         - okta: []
 *       tags:
 *         - squads
 *       description: Get all squads by the squad's id
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
 *                      $ref: '#components/schema/squadObject'
 *          '401':
 *            $ref: '#/components/responses/UnauthorizedError'
 *          '404':
 *            description: 'Profile not found'
 */

// get squad by the squad id
router.get('/:id', auth0Verify, authProfile, (req, res) => {
  const { id } = req.params;
  crudOperationsManager.getAll(
    res,
    Squads.getSquadBySquadId,
    'Squad could not be retrieved because the id was ',
    id
  );
});

module.exports = router;
