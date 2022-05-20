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
            const mockPrompts =
            {
                episodeId: 89,
                type: "zzzzzzzzzz",
                prompt: "zzzzzzzzzzzzzzzz",
                created_at: "2022-05-18T01:42:25.658Z",
                updated_at: "2022-05-18T01:42:25.658Z"
            }

            Prompts.addEpisodePrompt.mockResolvedValue({
                ...mockPrompts,
                id: 64
            });

            const res = await request(server)
                .post('/storyEpisodePrompts')
                .send([mockPrompts]);
            expect(res.status).toBe(201);
        });



    });


}); // end of parent test suite






























  // describe('POST /storyEpisodePrompts/prompts', () => {
    //     // test to see if POST returns a 201
    //     // {
    //     //     "episodeId": 89,
    //     //     "type": "zzzzzzzzzz",
    //     //     "prompt": "zzzzzzzzzzzzzzzz"
    //     // }
    //     it('should return 201 when prompt is created', async () => {
    //         Prompts.addEpisodePrompt.mockResolvedValue([{
    //             episodeId: 89,
    //             type: 'text',
    //             prompt: 'text',
    //         }]);
    //         const res = await request(server)
    //             .post('/storyEpisodePrompts/prompts')
    //             .send([{
    //                 episodeId: 89,
    //                 type: 'text',
    //                 prompt: 'text',
    //             }]);
    //         expect(res.status).toBe(201);
    //     });
    // });
