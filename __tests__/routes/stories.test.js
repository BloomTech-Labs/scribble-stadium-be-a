const request = require('supertest');
const express = require('express');
const Stories = require('../../api/stories/storiesModel');
const storiesRouter = require('../../api/stories/storiesRouter');
const server = express();
server.use(express.json());

// stories = {
//   id: '7',
//   title: 'text',
//   description: 'text',
//   author: 'text',
// }

// 47 min of testing video
// https://www.youtube.com/watch?v=hpIf6GG7B9c&list=PL0pqmT38sWfthShZSffvgJp7MapFC0Ao_&index=65&t=1462s
// answers video = https://bloomtech-1.wistia.com/medias/5ylj9llq4c



jest.mock('../../api/stories/storiesModel'); // Should we mock routes too?
// mock the auth middleware completely
jest.mock('../../api/middleware/authProfile', () => {
  return {
    auth0Verify: jest.fn((req, res, next) => next()),
    authProfile: jest.fn((req, res, next) => next()),
  };
});

// Parent test suite*
describe('stories router endpoints', () => {
  beforeAll(() => {
    // This is the module/route being tested
    server.use(['/stories', '/stories/:id'], storiesRouter);
    jest.clearAllMocks();
  });

  describe('GET /stories', () => {
    it('should return 200', async () => {
      Stories.getAllStories.mockResolvedValue([]); // [] becomes res.body // We can create anything here! Does not need to be [].
      const res = await await request(server).get('/stories');
      // console.log('@@@@@@@@@@', res.body); // []
      const storiesLength = Stories.getAllStories.mock.calls.length; // mock.calls =[[]] mock.calls.length = 1
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0); // Empty array unless we state otherwise.
      expect(storiesLength).toBe(1);
    });
  }); // End of GET /stories

  describe('GET /stories/:id', () => {
    it('should return 200 when story found', async () => {
      Stories.getStoryById.mockResolvedValue([
        // Remember the array*
        {
          title: 'text',
          description: 'word',
        },
      ]);
      const res = await request(server).get('/stories/99');
      // console.log('@@@@@@----->', res.body);
      // Per Jake: You aren't testing the knex query or the DB connection,
      // just that if you get something back the route returns 200.
      // You could add that it returns a body as well
      expect(res.status).toBe(200);
      // expect(Stories.getStoryById.mock.calls.length).toBe(2);
    });

    it('should return 404 when story not found', async () => {
      Stories.getStoryById.mockResolvedValue([]);
      const res = await request(server).get('/stories/99');
      expect(res.status).toBe(404);
    });

    it("should have title and a description keys in it's object.", async () => {
      Stories.getStoryById.mockResolvedValue([
        // Remember the array*
        {
          title: 'text',
          description: 'word',
        },
      ]);
      const res = await request(server).get('/stories/99');
      // console.log('$$$$$$$$----->', res.body);
      expect(res.body.title).toBe('text'); // Passes if body.title is 'text', fails if not.
      expect(res.body.description).toBe('word');
    });
  }); // End of GET /stories/:id





  describe('PUT /stories/:id', () => {
    it('should return 204 when updated', async () => {
      const story = {
        title: 'text',
        description: 'text',
      };

      Stories.updateById.mockResolvedValue(story);
      Stories.getStoryById.mockResolvedValue([story]);
      const res = await request(server).put('/stories/1').send(story);
      expect(res.status).toBe(204);
      // console.log('@@@@@@@@@@@@@@', res.status);
    });



    // it("should return 404 when not found", async () => {
    // });
  });


}); // End of parent test suite
