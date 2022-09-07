const router = require('express').Router();
const { crudOperationsManager } = require('../lib/index');
const Squads = require('./squadsModel.js');
const { auth0Verify, authProfile } = require('../middleware/authProfile');

/**
 * @swagger
 * paths:
 *   /squad/{childId}:
 *    get:
 *       summary: returns an array of object squads
 *       security:
 *         - okta: []
 *       tags:
 *         - squads
 *       description: Get all squads by the child's childId
 *       parameters:
 *         - name: childId
 *           in: path
 *           required: true
 *           description: childId must be in the parameter to receive child's squads
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

// get squads by the child's id
router.get('/:subId', auth0Verify, authProfile, (req, res) => {
  const { subId } = req.params;
  crudOperationsManager.getById(
    res,
    Squads.getSquadbySubId,
    'Squads could not be retrieved because the subId was ',
    subId
  );
});

module.exports = router;
