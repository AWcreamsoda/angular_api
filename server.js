const express = require("express");
const app = express();
const mongoose = require('mongoose');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static( __dirname + '/public/dist/public' ));
mongoose.connect('mongodb://localhost/person', {useNewUrlParser: true});
const PersonSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 4},
}, {timestamps: true})
const Person = mongoose.model('Person', PersonSchema);

app.get('/info', (req, res) => {
    Person.find()
        .then(people => res.json(people))
        .catch(err => res.json(err))
})

app.get('/new/:name', (req, res) => {
    const person = new Person({
        name: req.params.name,
    })
    person.save()
        .then(() => res.redirect('/'))
        .catch(err => res.json(err))
})

app.get('/remove/:name/', (req, res) => {
    Person.remove({name: req.params.name})
        .then(() => res.redirect('/'))
        .catch(err => res.json(err))
})

app.get('/:name', (req, res) => {
    Person.find({name: req.params.name})
        .then(person => res.json(person))
        .catch(err => res.json(err))
})

app.listen(8000, () => console.log("listening on port 8000"));