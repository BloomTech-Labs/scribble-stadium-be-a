const db = require('../../data/db-config');

function getAll() {
  return db('stories');
}

function getStoryById(idArg) {
  return db('stories').where({ id: idArg }).first();
}

async function add(storyArg) {
  const [newStory] = await db('stories').insert(storyArg).returning('*');
  return newStory;
}

async function updateById(id, storyData) {
  await db('stories').where({ id: id }).update(storyData);
  return getStoryById(id);
}

async function remove(id) {
  const deletedStory = await db('stories').where({ id: id }).del();
  return deletedStory;
}

function getEpisodesByStoryId(storyId) {
  return db('storyEpisodes').where({ storyId: storyId }).select('*');
}

async function addEpisode(storyArg) {
  const [newEpisode] = await db('storyEpisodes') // [newEpisode] means that the output will be an obj rather than ann arr of obj/'s
    .insert(storyArg)
    .returning('*');
  return newEpisode;
}

async function getEpisodePromptByEpisodeId(episodeId) {
  return db('storyEpisodePrompts').where({ episodeId: episodeId }).select('*');
}

module.exports = {
  getAll,
  getStoryById,
  add,
  updateById,
  remove,
  getEpisodesByStoryId,
  getEpisodePromptByEpisodeId,
  addEpisode,
};

/**
 * Queries the database for a specific story with given ID
 * @param {number} id the id to search for in the database
 * @returns {Promise} a promise that resolves to story object of the
 * given story ID with all episodes and drawing/writing prompts
 */

// const getEpisodePromptByEpisodeId = async (id) => {
//   // grabs a story table by story id = 'title', 'author', 'description'
//   let story = await db('Stories').where('Stories.id', id);

//   // grabs all episodes for a given id
//   const episodes = await getEpisodesByStoryId(id);

//   console.log('@@@@@@@@@@@@@@@@@@@@@@@ episodes =', episodes);

// getting prompts from db and adding to each episode from arr
//   for (let i = 0; i < episodes.length; i++) {
//     let prompts = await getPromptsByEpisodeID(episodes[i].id);
//     episodes[i].WritingPrompt = prompts[0].WritingPrompt;
//     episodes[i].DrawingPrompt = prompts[0].DrawingPrompt;
//   }
//   story.episodes = episodes;
//   return [story];
// };

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //
// @@@@@@@@@@@@@@@@@@       @@@@@@@@@@@@@@@@@@@@@ //
// @@@@@@@@@@@@@@@@@@ NOTES @@@@@@@@@@@@@@@@@@@@@ //
// @@@@@@@@@@@@@@@@@@       @@@@@@@@@@@@@@@@@@@@@ //
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

// // knex.select('id').from<User>('users'); // Resolves to Pick<User, "id">[]
// //  This helper function grabs all ID's and the router will match params and grab the clients ID. (added id as argument)
// // SELECT * FROM posts WHERE id = id; //  SQL version*
// // return db('posts').where({ id: id, foo: 'bar' }).first() //  Knex version*
// // .first() gets rid of nesting, (array in this case). Without first() we get an empty arr with bad code, first() gives us undefined.
// function getById(id) {
//   return db('posts').where('id', id).first() // Returns the post with the id.
// }

// // From notes:
// // SQL version* Note that single quotes are needed in SQL Light Studio because you cannot set it up in a function with args.
// // -- Create Title & Content
// // SQL version = INSERT INTO posts (title, contents) VALUES ('title', 'contents');
// // My failed version: = db('posts').insert({ title, contents })

// // Gabriel's debugging notes:
// // const stuff = await db('posts').insert({ title, contents }) // Inserts into table, returns id.
// // console.log(stuff) // [ 15 ] // Here we learned that this returns an array of the id.

// async function create({ title, contents }) {
//   const [id] = await db('posts').insert({ title, contents }) // Inserts into table, returns id.
//   console.log(id) // 15
//   const newPost = await getById(id)                          // Gets the new post.
//   console.log(newPost) // { id: 15, title: 'title', contents: 'contents' } AKA title: 'xxxx', contents: 'xxxx'
//   return newPost                                             // Returns the new post.
// }

// // UPDATE posts
// // SET title = 'hi', contents = 'words'
// // WHERE id = 1;

// // Knex Documentation:
// // knex('books')
// //   .where('published_date', '<', 2000)
// //   .update({
// //     status: 'archived',
// //     thisKeyIsSkipped: undefined
// //   })

// // Update/PUT needs an ID in the param inside of the HTTP client.
// // After the put req, you must do a get req to see data.

// async function update(id, { title, contents }) {
//   // return await db('posts').where({ id }).update({ title, contents })
//   const updatedPost = await db('posts').where('id', id).update({ title, contents }) // Inserts into table, returns id.
//   // console.log(updatedPost) // was named stuff. It returns: 1. If return 'foo'
//   return updatedPost
// }

// // DELETE FROM shippers WHERE shipperid = 5;

// function remove(id) {
//   return db('posts').where('id', id).del()
// }

// // ____________________ SQL NOTE's _________________________ //

// // How to comment in SQL:
// // -- 2 dashes!
// // The WHERE keyword is for a 'filter or a query'.
// // /* Use single quotes for strings */
// // /* String queries are case sensitive */
// // /* chaining 1 AND and a conditional */
// // /* OR also works, sorta like AND */

// // /* LIKE with the % operator grabs all any string that ends in land */
// // /* LIKE allows for case insensitivity */

// // /* NOT is a keyword, does what it says. Sorta like "!" in JavaScript. */

// // SELECT * FROM customers WHERE country LIKE 'ireland';

// // @@@@@@@@@@@ SELECT @@@@@@@@@@@@@@

// // -- How to grab all that do not contain a specific word in a paragraph.
// // -- LIKE allows for case insensitivity, % allows to search for the string regardless of what is in front or behind it.

// // SELECT * FROM employees
// // WHERE notes
// // NOT LIKE '%university%';

// // ______________________________________________

// // -- Grab all CategoryId's that have an integer of one.
// // SELECT * FROM products WHERE categoryid = 1;

// // _______________________________________________

// // -- Find all of the orders made after Jan 1 1997
// // SELECT * FROM orders WHERE orderDate > '1997-01-01';

// // -- I was stuck on this because I forgot "FROM" and the zeros in the date.

// // ****

// // -- ORDER BY oderdate ASC; makes the dates appear in order.

// // SELECT * FROM orders WHERE orderdate > '1997-01-01' ORDER BY oderdate ASC;

// // _______________________________________________

// // -- Get all products sorting them by category ascending, and then by price descending.

// // SELECT * FROM products
// // ORDER BY categoryid ASC, price DESC;

// // -- Interesting to note that WHERE was not needed, ORDER BY sufficed.
// // -- Also, "ASC" is not necessary since it is the default, but it adds clarity.

// // _______________________________________________

// // @@@@@@@@@@@@ INSERT aka create @@@@@@@@@@@@@

// // --INSERT INTO shippers (shippername, phone) VALUES ('acme 44', '(916) 500 9483');

// // insert into shippers (shippername, phone) values ('acme 44', '(909) 123 1234');

// // --SELECT * FROM shippers;

// // ***

// // -- Likely a W3Schools bug, buuut, would not work until I used case sensitivity with schema names. Like this:

// // -- insert into shippers (ShipperName, Phone) values ('acme 44', '(909) 123 1234');

// // select * from shippers; -- To check result.

// // -- And if you wanted to add just 1 property, it works unless it is a required field. It looks like this:

// // -- insert into shippers (ShipperName) values ('acme 44');

// // // // // // // Knex INSERT // // // // // // // // // //

// db('users').insert({ name: 'John' })

//  Also given as an example, but not sure why there is an array:
// .insert([
//   { name: 'Starsky' },
//   { name: 'Hutch' }
// ])

// knex('tableName')
// .insert({
//   email: "ignore@example.com",
//   name: "John Doe"
// })

// // ____________________________________________

// // @@@@@@@@@@@@@ UPDATE @@@@@@@@@@@@@

// // -- How to edit a table:

// // UPDATE shippers
// // SET shippername = 'webpt 31 is lit'
// // WHERE shipperid = 4;

// // --SELECT * FROM shippers;

// // ***

// // -- How to update multiple fields. Note, no trailing commas.

// // UPDATE posts
// // SET title = 'words', contents = 'more words'
// // WHERE id = 1;

// // @@@@@@@@@@@@ DELETE @@@@@@@@@@@@@

// // -- ID is the primary key. Any ID number that has been deleted cannot be used by any future ID numbers.
// // -- So we DELETE ID 2 then create a new one, the ID's are 1, 3, and so on.

// // -- How to delete:

// // DELETE FROM shippers WHERE shipperid = 5;

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@ Old Code Below @@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// const db = require('../../data/db-config');

// /**
//  * Queries the database to attempt to add a new story
//  * @param {Object} story the story to be added to the database
//  * @param {string} story.Title the title of the story
//  * @param {string} story.Description the description of the story
//  * @param {string} story.Author the author of the story
//  * @returns {Promise} a promise that resolves to the ID of the new story
//  */
// const add = (story) => {
//   return db('Stories').insert(story).returning('ID');
// };

// /**
//  * Queries the database for all stories
//  * @returns {Promise} a promise that resolves to an array of story
//  * objects with corresponding episodes
//  */
// const getAllStories = async () => {
//   const stories = await db('Stories');
//   for (let i = 0; i < stories.length; i++) {
//     let episodes = await getEpisodesByStoryID(stories[i].ID);
//     stories[i].Episodes = episodes;
//   }
//   return stories;
// };

// /**
//  * Queries the database for a specific story with given ID
//  * @param {number} ID the ID to search for in the database
//  * @returns {Promise} a promise that resolves to story object of the
//  * given story ID with all episodes and drawing/writing prompts
//  */
// const getById = async (ID) => {
//   const story = await db('Stories').where('Stories.ID', ID);
//   const episodes = await getEpisodesByStoryID(ID);
//   // const episodesArray = [];
//   // for (let i = 0; i < episodes.length; i++) {
//   //   episodesArray.push(episodes[i]);
//   // }
//   for (let i = 0; i < episodesArray.length; i++) {
//     let prompts = await getPromptsByEpisodeID(episodesArray[i].ID);
//     episodesArray[i].WritingPrompt = prompts[0].WritingPrompt.Prompt;
//     episodesArray[i].DrawingPrompt = prompts[0].DrawingPrompt.Prompt;
//   }
//   const storyWithEpisodes = {
//     ID: story[0].ID,
//     Title: story[0].Title,
//     Description: story[0].Description,
//     Author: story[0].Author,
//     Episodes: episodesArray,
//   };
//   return [storyWithEpisodes];
// };

// /**
//  * Queries the database to update row matching ID with the given changes
//  * @param {number} ID the unique row ID to update
//  * @param {Object} changes an object containing the changes
//  * @param {string} [changes.Title] new story title (optional)
//  * @param {string} [changes.Description] the new description of the story (optional)
//  * @param {string} [changes.Author] the new author of the story (optional)
//  * @returns {Promise} a promise that resolves to number of rows updated
//  */
// const update = (ID, changes) => {
//   return db('Stories').where({ ID }).update(changes);
// };

// /**
//  * Queries the database to remove a row
//  * @param {number} ID the ID of the row to delete
//  * @returns {Promise} a promise that resolves to the number of rows deleted
//  */
// const remove = (ID) => {
//   return db('Stories').where({ ID }).del();
// };

// /**
//  * Queries the database to retrieve all episodes for a specific story with given ID
//  * @param {number} storyID the ID to search for in the database
//  * @returns {Promise} a promise that resolves to story object of the given story ID
//  */
// const getEpisodesByStoryID = (storyID) => {
//   return db('Episodes as e')
//     .join('Stories as s', 'e.StoryID', 's.ID')
//     .where('s.ID', storyID)
//     .select(
//       'e.ID',
//       'e.StoryID',
//       'e.EpisodeNumber',
//       'e.TextURL',
//       'e.AudioURL',
//       'e.Content'
//     );
// };

// /**
//  * Queries the database for a specific episode with given ID
//  * @param {number} episodeID the ID to search for in the database
//  * @returns {Promise} a promise that resolves to episode object of the given story ID
//  */
// const getEpisodeByID = (episodeID) => {
//   return db('Episodes as e')
//     .where('e.ID', episodeID)
//     .select(
//       'e.ID',
//       'e.StoryID',
//       'e.EpisodeNumber',
//       'e.TextURL',
//       'e.AudioURL',
//       'e.Content'
//     );
// };

// /**
//  * Queries the database for a specific prompts with given episode ID
//  * @param {number} episodeID the ID to search for in the database
//  * @returns {Promise} a promise that resolves to drawing prompt object of the given episode ID
//  */
// const getPromptsByEpisodeID = async (episodeID) => {
//   let writing = await db('Story-Prompts as sp')
//     .where('sp.EpisodeID', episodeID)
//     .andWhere('sp.Type', 'Writing')
//     .select('sp.Prompt');
//   let drawing = await db('Story-Prompts as sp')
//     .where('sp.EpisodeID', episodeID)
//     .andWhere('sp.Type', 'Drawing')
//     .select('sp.Prompt');

//   let episodePrompts = {
//     WritingPrompt: writing[0],
//     DrawingPrompt: drawing[0],
//   };

//   return [episodePrompts];
// };
// /**
//  * Queries the database to attempt to add a new episode
//  * @param {Object} episode the episode to be added to the database
//  * @param {string} episode.StoryID the id of the story
//  * @param {string} episode.EpisodeNumber episode number
//  * @param {string} episode.TextURL text url of episode
//  * @param {string} episode.AudioURL audio url of episode
//  * @returns {Promise} a promise that resolves to the ID of the new episode
//  */
// const addEpisode = (episode) => {
// //   return db('Episodes').insert(episode).returning('ID');
// // };

// // /**
// //  * Queries the database to update row matching ID with the given changes
// //  * @param {number} episodeID the unique row ID to update
// //  * @param {Object} changes the episode to be added to the database
// //  * @param {string} changes.EpisodeNumber the description of the story
// //  * @param {string} changes.TextURL the author of the story
// //  * @param {string} changes.AudioURL the author of the story
// //  * @returns {Promise} a promise that resolves to the ID of the new story
// //  */
// // const updateEpisode = (episodeID, changes) => {
// //   return db('Episodes as e').where('e.ID', episodeID).update(changes);
// // };

// // /**
// //  * Queries the database to remove a row
// //  * @param {number} episodeID the ID of the row to delete
// //  * @returns {Promise} a promise that resolves to the number of rows deleted
// //  */
// // const removeEpisode = (episodeID) => {
// //   return db('Episodes as e').where('e.ID', episodeID).del();
// // };

// // module.exports = {
// //   add,
// //   getAllStories,
// //   getById,
// //   update,
// //   remove,
// //   getEpisodesByStoryID,
// //   getEpisodeByID,
// //   addEpisode,
// //   removeEpisode,
// //   updateEpisode,
// //   getPromptsByEpisodeID,
// // };
