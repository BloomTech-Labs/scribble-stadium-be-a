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
    server.use('/storyEpisodePrompts', storyEpisodePromptsRouter); // root route for the router
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
      Prompts.getPromptsByEpisodeId.mockResolvedValue([
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
      console.log('@@@@@@@@@@@@@ res.body =', res.body);

      expect(res.status).toBe(200);
    });
  });

}); // end of parent test suite

// describe('GET /stories', () => {
//   it('should return 200', async () => {
//     Stories.getAllStories.mockResolvedValue([]); // [] becomes res.body // We can create anything here! Does not need to be [].
//     const res = await await request(server).get('/stories');
//     // console.log('@@@@@@@@@@', res.body); // []
//     const storiesLength = Stories.getAllStories.mock.calls.length; // mock.calls =[[]] mock.calls.length = 1
//     expect(res.status).toBe(200);
//     expect(res.body.length).toBe(0); // Empty array unless we state otherwise.
//     expect(storiesLength).toBe(1);
//   });
// }); // End of GET /stories
