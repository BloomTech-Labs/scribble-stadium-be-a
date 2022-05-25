const request = require('supertest');
const express = require('express');
const Stories = require('../../api/stories/storiesModel');
const storiesRouter = require('../../api/stories/storiesRouter');
const server = express();
server.use(express.json());

jest.mock('../../api/stories/storiesModel');
jest.mock('../../api/middleware/authProfile', () => {
  return {
    auth0Verify: jest.fn((req, res, next) => next()),
    authProfile: jest.fn((req, res, next) => next()),
  };
});

describe('stories router endpoints', () => {
  beforeAll(() => {
    server.use('/stories', storiesRouter);
    jest.clearAllMocks();
  });

  describe('GET /stories', () => {
    it('should return 200', async () => {
      Stories.getAllStories.mockResolvedValue([
        {
          id: 1,
          parentId: 1,
          name: null,
          pin: null,
        },
      ]);
      const res = await request(server).get('/stories');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(Stories.getAllStories.mock.calls.length).toBe(1);
    });
  });

  describe('GET /stories/:id', () => {
    it('should return 200 when story found', async () => {
      Stories.getStoryById.mockResolvedValue([
        {
          title: 'text',
          description: 'word',
        },
      ]);
      const res = await request(server).get('/stories/99');
      expect(res.status).toBe(200);
    });

    it('should return 404 when story not found', async () => {
      Stories.getStoryById.mockResolvedValue([]);
      const res = await request(server).get('/stories/99');
      expect(res.status).toBe(404);
    });

    it("should have title and a description keys in it's object.", async () => {
      Stories.getStoryById.mockResolvedValue({
        title: 'text',
        description: 'word',
      });
      const res = await request(server).get('/stories/99');
      expect(res.body.title).toBe('text');
      expect(res.body.description).toBe('word');
    });
  });

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
    });
  });
}); // End of parent test suite
