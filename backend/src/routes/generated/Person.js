const router = require("express").Router();
const mongoose = require("mongoose");
const Person = require("./../../db/generated/Person");

/**
 * Get a Person by _id
 **/
router.get("/person/:_id", async (req, res, next) => {
    try {
        if (!req.params._id) {
            return res
                .status(400)
                .json({
                    error: "Parameter '_id' is required but not provided.",
                });
        }

        const person = await Person.findOne({ _id: req.params._id }, "-__v", {
            minimize: true,
        });

        if (!person) {
            return res.status(404).send("Not Found");
        }

        return res.json(person);
    } catch (e) {
        console.error(e);
        return res.status(500).send("Internal Server Error");
    }
});

/**
 * Get all People
 **/
router.get("/persons", async (req, res, next) => {
    try {
        const person = await Person.find({}, "-__v", { minimize: true });

        return res.json(person);
    } catch (e) {
        console.error(e);
        return res.status(500).send("Internal Server Error");
    }
});

/**
 * Creates a new Person
 **/
router.post("/person", async (req, res, next) => {
    try {
        const input = req.body;

        let person = await Person.create({ ...input });
        person = await Person.findOne({ _id: person._id });

        return res.json(person);
    } catch (e) {
        console.error(e);
        return res.status(500).send("Internal Server Error");
    }
});

/**
 * Update an existing Person
 **/
router.put("/person/:_id", async (req, res, next) => {
    try {
        if (!req.params._id) {
            return res
                .status(400)
                .json({
                    error: "Parameter '_id' is required but not provided.",
                });
        }

        const id = req.params._id;
        const input = req.body;

        const person = await Person.findOneAndUpdate(
            { _id: req.params._id },
            { ...input },
            { new: true, lean: true },
        );

        if (!person) {
            return res.status(404).send("Not Found");
        }

        return res.json(person);
    } catch (e) {
        console.error(e);
        return res.status(500).send("Internal Server Error");
    }
});

/**
 * Delete an existing Person
 **/
router.delete("/person/:_id", async (req, res, next) => {
    try {
        if (!req.params._id) {
            return res
                .status(400)
                .json({
                    error: "Parameter '_id' is required but not provided.",
                });
        }

        const id = req.params._id;
        const person = await Person.findOneAndDelete(
            { _id: req.params._id },
            { __v: 0 },
        );

        if (!person) {
            return res.status(404).send("Not Found");
        }

        return res.json(person);
    } catch (e) {
        console.error(e);
        return res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
