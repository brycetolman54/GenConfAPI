const express = require('express');

const app = express();

const data = require('./GenConfQuotes/data.json');

const PORT = process.argv.length > 2 ? process.argv[2] : process.env.PORT;

const cors = require('cors');

app.use(express.json());

app.use(cors());

app.get('/', (_req, res) => {
    res.send('Welcome to my General Conference Quotes API! To learn more about it, go to https://github.com/brycetolman54/GenConfAPI');
})

app.get('/random', (_req, res) => {
    // Get a random number based on the number of quotes
    const randomInt = Math.floor(Math.random() * data.all.length);
    // Get the quote by its index
    const theQuote = data.all[randomInt];
    // Send it off
    res.send(theQuote.quote);
})

app.get('/year/:year', (req, res) => {
    // Get the array of quote ids for the year specified
    const theYear = data.years.find(obj => obj.year === req.params.year);
    // Make sure that is a valid year
    if(!theYear) {
        res.send('That is not one of the valid years. To see a list of years you can search by, go to https://github.com/brycetolman54/GenConfAPI')
    }
    else {
    // Get a random number based on the number of quotes in that year's array
    const randomInt = Math.floor(Math.random() * theYear.quotes.length);
    // Get the id of the quote
    const quoteIndex = theYear.quotes[randomInt];
    // Use the id to get the quote from the all array (you have to subtract 1 because the ids start at 0)
    const theQuote = data.all[quoteIndex - 1];
    // Send it off
    res.send(theQuote.quote);
    }
})

app.get('/speaker/:speaker', (req, res) => {
    // Get the array of quote ids for the speaker specified
    const theSpeaker = data.speakers.find(obj => obj.speaker === req.params.speaker);
    // Make sure this is a valid speaker
    if(!theSpeaker) {
        res.send('That is not one of the valid speakers. To see a list of speakers you can search by, go to https://github.com/brycetolman54/GenConfAPI')
    }
    else {
        // Get a random number based on the number of quotes in that speaker's array
        const randomInt = Math.floor(Math.random() * theSpeaker.quotes.length);
        // Get the id of the quote
        const quoteIndex = theSpeaker.quotes[randomInt];
        // Use the id to get the quote from the all array (you have to subtract 1 because the ids start at 0)
        const theQuote = data.all[quoteIndex - 1];
        // Send it off
        res.send(theQuote.quote);
    }
})

app.get('/topic/:topic', (req, res) => {
    // Get the array of quote ids for the topic specified
    const theTopic = data.topics.find(obj => obj.topic === req.params.topic);
    // Make sure that is actually a topic
    if(!theTopic) {
        res.send('That is not one of the valid topics. To see a list of topics you can search by, go to https://github.com/brycetolman54/GenConfAPI')
    }
    else {
    // Get a random number based on the number of quotes in that topic's array
    const randomInt = Math.floor(Math.random() * theTopic.quotes.length);
    // Get the id of the quote
    const quoteIndex = theTopic.quotes[randomInt];
    // Use the id to get the quote from the all array (you have to subtract 1 because the ids start at 0)
    const theQuote = data.all[quoteIndex - 1]; 
    // Send it off
    res.send(theQuote.quote);
    }
})

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
})
