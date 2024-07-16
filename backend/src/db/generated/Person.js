const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const { Address } = require("./Address");

const PersonSchema = new Schema(
    {
        firstname: {
            type: String,
            required: false,
            indexed: false,
            unique: false,
        },
        lastname: {
            type: String,
            required: false,
            indexed: false,
            unique: false,
        },
        birthdate: {
            type: Date,
            required: false,
            indexed: false,
            unique: false,
        },
        gender: {
            type: String,
            enums: ["MALE", "FEMALE"],
            required: false,
            indexed: false,
            unique: false,
        },
        address: {
            type: Address,
            required: false,
            indexed: false,
            unique: false,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Person", PersonSchema, "Person");
