var express = require('express');
var router = express.Router();
var models = require("../db")

router.get('/', function(req, res, next) {
    // return all persons
    models.PersonSchema.findAll({}).then(person => res.json({
        person
    }))
});

router.get('/:id', function(req, res, next) {
    // return a single person by id
    models.PersonSchema.findByPk(req.params.id).then(person => res.json({
        person
    }))
});

router.post('/', function(req, res, next) {
    // create a new person
    models.PersonSchema.create(req.body).then(person => res.json({
        person
    }))
});

router.put('/:id', function(req, res, next) {
    // update a single person by id
    models.PersonSchema.findByPk(req.params.id).then(person => {
        person.update(req.body).then(person => res.json({
            person
        }));
    })
});

router.delete('/:id', function(req, res, next) {
    // delete a single person by id
    models.PersonSchema.destroy({
        where: {
            id: req.params.id
        }
    }).then(person => res.json({
        person
    }))
});

module.exports = router;