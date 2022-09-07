// Random creation using function locally
// Build it so that there are only 3 players in a episode
// Should only run on Tuesday nights
// Start with random association
// This is where DS can be integrated

const db = require('../../data/db-config');

function makeSquads() {
    //determine episode start date
    const mostRecentEpisodeStartDate = Date.now();
    // get all submissions with the matching start date
    submissions = db('submissions').where({ mostRecentEpisodeStartDate });
    // randomly sort subs into pairs
    // create squads for each sub in a pair 
    // update squad id on each submission in the pair
}