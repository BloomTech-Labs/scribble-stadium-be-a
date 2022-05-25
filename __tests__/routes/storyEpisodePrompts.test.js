const request = require('supertest');
const express = require('express');
const Prompts = require('../../api/storyEpisodePrompts/storyEpisodePromptsModel');
const storyEpisodePromptsRouter = require('../../api/storyEpisodePrompts/storyEpisodePromptsRouter');
const server = express();
server.use(express.json());

jest.mock('../../api/storyEpisodePrompts/storyEpisodePromptsModel');
jest.mock('../../api/middleware/authProfile', () => {
  return {
    auth0Verify: jest.fn((req, res, next) => next()),
    authProfile: jest.fn((req, res, next) => next()),
  };
});

// Parent test suite*
describe('storyEpisodePrompts router endpoints', () => {
  beforeAll(() => {
    server.use('/storyEpisodePrompts', storyEpisodePromptsRouter);
    jest.clearAllMocks();
  });

  describe('POST /storyEpisodePrompts', () => {
    it('should return 201 when prompt is created', async () => {
      const mockPrompts = {
        episodeId: 89,
        type: 'zzzzzzzzzz',
        prompt: 'zzzzzzzzzz',
        created_at: '2022-05-18T01:42:25.658Z',
        updated_at: '2022-05-18T01:42:25.658Z',
      };
      Prompts.addEpisodePrompt.mockResolvedValue({
        ...mockPrompts,
        id: 64,
      });
      const res = await request(server)
        .post('/storyEpisodePrompts')
        .send([mockPrompts]);
      expect(res.status).toBe(201);
    });
  });

  describe('GET /storyEpisodePrompts/episodeId', () => {
    it('should return 200 when prompts found', async () => {
      Prompts.getEpisodePromptByEpisodeId.mockResolvedValue([
        {
          id: 64,
          episodeId: 89,
          type: 'zzzzzzzzzz',
          prompt: 'zzzzzzzzzz',
          created_at: '2022-05-18T01:42:25.658Z',
          updated_at: '2022-05-18T01:42:25.658Z',
        },
      ]);
      const res = await request(server).get('/storyEpisodePrompts/89');
      expect(res.status).toBe(200);
    });

    it('should return 404 when no prompts are found', async () => {
      Prompts.getEpisodePromptByEpisodeId.mockResolvedValue();
      const res = await request(server).get('/storyEpisodePrompts/89');
      expect(res.status).toBe(404);
    });
  });
}); // end of parent test suite
