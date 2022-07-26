const router = require('express').Router();
const { crudOperationsManager } = require('../lib/index');
const childSubmissionsModel = require('./childSubmissionsModel.js');
const Submissions = require('../childSubmissions/childSubmissionsModel');
const { auth0Verify, authProfile } = require('../middleware/authProfile');
const { checkAllRequiredFieldsExist } = require('./childSubmissionsMiddleware');
const { aws, s3UploadBucket } = require('../../config/aws');

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
 *                 approvedAt: null
 *                 episodeStartDate: "2021-12-12T20:20:16.719Z"
 *                 finishedReadingAt: null
 *                 finishedWritingAt: null
 *                 squadCreatedAt: "2022-01-05T12:29:22.037Z"
 *                 votedAt: null
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

router.get('/', auth0Verify, authProfile, (req, res) => {
  Submissions.getAllSubmissions()
    .then((submissions) => {
      res.status(200).json(submissions);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

/**
 * @swagger
 * /s3:
 *  post:
 *    summary: Get AWS signed url for uploading a file to S3
 *    security:
 *      - okta: []
 *    tags:
 *      - submissions
 *    requestBody:
 *      description: File object to to be added with fileName and fileType
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - fileName
 *              - fileType
 *            properties:
 *              fileName:
 *                type: string
 *              fileType:
 *                type: string
 *            example:
 *                fileName: "test.png"
 *                fileType: "image/png"
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      200:
 *        description: A signed request object with the url to upload the file to S3
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                signedUrl:
 *                  type: string
 *                url:
 *                  type: string
 *                example:
 *                  signedUrl: 'https://bucketeer-0fcbcf8b-2b04-4ddb-ac9d-29c05b9d4990.s3.amazonaws.com/eaxmple?AWSAccessKeyId=AKIAX7CRDYXPW5WAYHMH&Content-Type=png&Expires=1658799315&Signature=VzaMA6zojoaIaII8AGZT7LN42cg%3D&x-amz-acl=public-read'
 *                  url: 'https://bucketeer-0fcbcf8b-2b04-4ddb-ac9d-29c05b9d4990.s3.amazonaws.com/eaxmple'
 */
//get AWS signed url for image upload to S3
router.post(
  '/s3',
  auth0Verify,
  authProfile,
  // checkAllRequiredFieldsExist,
  async (req, res) => {
    // const newSubmission = req.body;
    const s3 = new aws.S3(); // Create a new instance of S3
    const fileName = req.body.fileName.split(' ').join(''); // Set the file name to bikeImg.jpg to reference the img in a test bucket
    const fileType = req.body.fileType;
    const s3Params = {
      Bucket: s3UploadBucket,
      Key: fileName,
      Expires: 500,
      ContentType: fileType,
      ACL: 'public-read',
    };
    // Make a request to the S3 API to get a signed URL which we can use to upload our file
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        console.log(err);
        res.json({ success: false, error: err });
      }
      // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
      const returnData = {
        signedRequest: data,
        url: `https://${s3UploadBucket}.s3.amazonaws.com/${fileName}`,
      };
      // Send it all back
      res.json(returnData);
    });
  }
);
/**
 * @swagger
 * /page:
 *  post:
 *    summary: Save submission page
 *    security:
 *      - okta: []
 *    tags:
 *      - submissions
 *    requestBody:
 *      description: Submission page object with submissionId, type, url, and pageNum
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - submissionId
 *              - type
 *              - url
 *              - pageNum
 *            properties:
 *              submissionId:
 *                type: integer
 *              type:
 *                type: string
 *              url:
 *                type: string
 *              pageNum:
 *                type: integer
 *            example:
 *                submissionId: 2
 *                type: "drawing"
 *                url: "https://bucketeer-0fcbcf8b-2b04-4ddb-ac9d-29c05b9d4990.s3.amazonaws.com/example"
 *                pageNum: 3
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      200:
 *        description: A signed request object with the url to upload the file to S3
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                signedUrl:
 *                  type: string
 *                url:
 *                  type: string
 *                example:
 *                  id: 17
 *                  submissionId: 2
 *                  type: "drawing"
 *                  url: "https://bucketeer-0fcbcf8b-2b04-4ddb-ac9d-29c05b9d4990.s3.amazonaws.com/example"
 *                  pageNum: 3
 *                  created_at: "2022-07-26T02:59:49.621Z"
 *                  updated_at: "2022-07-26T02:59:49.621Z"
 */

router.post('/page', auth0Verify, authProfile, async (req, res) => {
  crudOperationsManager.post(
    res,
    childSubmissionsModel.addSubmissionPage,
    'Submission was not able to be added or was ',
    {
      submissionId: req.body.submissionId,
      type: req.body.type,
      url: req.body.url,
      pageNum: req.body.pageNum,
    }
  );
});

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
