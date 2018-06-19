const Joi = require('joi');
const logger = require('./logger');
const express = require('express');
const app = express();

app.use(express.json());

app.use(logger);

const genres = [
    { id: 1, name: 'Comedy' },
    { id: 2, name: 'Romance' },
    { id: 3, name: 'Sci-Fi' },
    { id: 4, name: 'Horror' },
    { id: 5, name: 'Musical' },
]

app.get('/', (req, res) => {
    res.send('Vidly Service');
});

app.get('/api/genres', (req, res) => {
    
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('the genre with the given ID was not found');
    res.send(genre);
});

app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);
    
    //else
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    //push to array
    genres.push(genre);
    //retun course to client
    res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
    // lookup genre
    //not exist return 404
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) {
        return res.status(404).send('the course with the given ID was not found');
    }
        //validate
    //if invalid, return 400, bad req
    const { error } = validateGenre(req.body);

    if (error) return res.status(400).send(result.error.details[0].message);

    //update course
    //return updated course
    genre.name = req.body.name;
    res.send(genre);

});

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) {
        return res.status(404).send('the course with the given ID was not found');
    }

    //delete
    const index = genres.indexOf(genre);
    genres.splice(index, 1)

    //return the course
    res.send(genre);

});

function validateGenre(genre){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}


// read port env variable
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));