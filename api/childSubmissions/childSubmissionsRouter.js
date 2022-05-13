const router = require('express').Router();
const { crudOperationsManager } = require('../lib/index');
const childSubmissionsModel = require('./childSubmissionsModel.js');
const { auth0Verify, authProfile } = require('../middleware/authProfile');
const { checkAllRequiredFieldsExist } = require('./childSubmissionsMiddleware');

/**
 * @swagger
 *   components:
 *       schema:
 *          submissionObject:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 childId:
 *                   type: integer
 *                 storyId:
 *                   type: integer
 *                 episodeId:
 *                   type: integer
 *                 approvedAt:
 *                   type: string
 *                 episodeStartDate:
 *                   type: string
 *                 finishedReadingAt:
 *                   type: string
 *                 finishedWritingAt:
 *                   type: string
 *                 votedAt:
 *                   type: string
 *                 squadCreatedAt:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *               example:
 *                 id: 1
 *                 childId: 1
 *                 storyId: 1
 *                 episodeId: 1
 *                 "approvedAt": null,
 *                 episodeStartDate: "2021-12-12T20:20:16.719Z"
 *                 finishedReadingAt: null
 *                 finishedWritingAt: null
 *                 squadCreatedAt: "2022-01-05T12:29:22.037Z"
 *                 votedAt: null,
 *                 createdAt: 2021-10-08 19:13:54.822+00
 *                 updatedAt: 2021-10-08 19:13:54.822+00
 */

/**
 * @swagger
 * paths:
 *   /submission/{childId}:
 *    get:
 *       summary: returns an array of object submissions
 *       security:
 *         - okta: []
 *       tags:
 *         - submissions
 *       description: Get all submissions by the child's childId
 *       parameters:
 *         - name: childId
 *           in: path
 *           required: true
 *           description: childId must be in the parameter to receive child submissions
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
 *                      $ref: '#components/schema/submissionObject'
 *          '401':
 *            $ref: '#/components/responses/UnauthorizedError'
 *          '404':
 *            description: 'Profile not found'
 */

// get childSubmission by the child's id
router.get('/:childId', auth0Verify, authProfile, (req, res) => {
  const { childId } = req.params;
  crudOperationsManager.getAll(
    res,
    childSubmissionsModel.getSubmissionByChildId,
    'Child submission could not be retrieved because the childId was ',
    childId
  );
});

/**
 * @swagger
 *  /submission:
 *   post:
 *       summary: Creates a new submission object for child playing the game.
 *       security:
 *         - okta: []
 *       tags:
 *         - submissions
 *       description: Create a new submission, Front End must supply post request with childId, episodeId, and storyId
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#components/schema/submissionObject'
 *       responses:
 *          '201':
 *             description: Successfully created submission
 *             content:
 *               application/json:
 *                 schema:
 *                   $ref: '#components/schema/submissionObject'
 *          '400':
 *            $ref: '#/components/responses/BadRequest'
 *          '401':
 *             $ref: '#/components/responses/UnauthorizedError'
 *          '404':
 *             description: 'Profile not found'
 */

//The FE needs to supply the storyId and episodeId in the req.body and the childId in the params
router.post(
  '/',
  auth0Verify,
  authProfile,
  checkAllRequiredFieldsExist,
  async (req, res) => {
    const newSubmission = req.body;

    crudOperationsManager.post(
      res,
      childSubmissionsModel.addSubmission,
      'Submission was not able to be added or was ',
      newSubmission
    );

    // childSubmissionsModel
    //   .addSubmission(newSubmission)
    //   .then((newSub) => {
    //     res.status(201).json(newSub);
    //   })
    //   .catch(() => {
    //     res
    //       .status(500)
    //       .json({ message: 'The new Submission could not be added to the DB' });
    //   });
  }
);

/**
 * @swagger
 *  /submission/{id}:
 *    put:
 *      summary: Attempts to replace the submission object with the given id parameter.
 *      security:
 *        - okta: []
 *      tags:
 *        - submissions
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: id of the submission must be in the parameter to receive child submissions
 *          schema:
 *            type: integer
 *            example: 2
 *            minimum: 1
 *      requestBody:
 *        description: Changes to be applied to the specified submission.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *      responses:
 *        '204':
 *            description: Successful update (no content returned)
 *        '401':
 *            $ref: '#/components/responses/UnauthorizedError'
 *        '404':
 *            description: 'Profile not found'
 */

// update specific submission from submission id
router.put('/:id', auth0Verify, authProfile, (req, res) => {
  const { id } = req.params;
  const submissionChanges = req.body;

  crudOperationsManager.update(
    res,
    childSubmissionsModel.updateSubmissionBySubmissionId,
    'The submission could not be updated by the database.',
    id,
    submissionChanges
  );
});

/**
 * @swagger
 *  /submission/{id}:
 *    patch:
 *      summary: Updates only specified fields requested within the object. id of submission object required in parameter.
 *      security:
 *        - okta: []
 *      tags:
 *        - submissions
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: id of the submission must be in the parameter to receive child submissions
 *          schema:
 *            type: integer
 *            example: 2
 *            minimum: 1
 *      requestBody:
 *        description: Changes to be applied to the specified submission.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *      responses:
 *        '204':
 *            description: Successful update (no content returned)
 *        '401':
 *            $ref: '#/components/responses/UnauthorizedError'
 *        '404':
 *            $ref: '#/components/responses/NotFound'
 */

// update specific submission from submission id
router.patch('/:id', auth0Verify, authProfile, (req, res) => {
  const { id } = req.params;
  const submissionChanges = req.body;

  crudOperationsManager.update(
    res,
    childSubmissionsModel.updateSubmissionBySubmissionId,
    'The submission could not be updated by the database.',
    id,
    submissionChanges
  );
});

module.exports = router;