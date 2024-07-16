const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new Schema(
    {
        streetname: {
            type: String,
            required: false,
            indexed: false,
            unique: false,
        },
        housenumber: {
            type: Number,
            required: false,
            indexed: false,
            unique: false,
        },
        location: {
            type: {
                type: String,
                enum: ["Point"],
                required: false,
            },
            coordinates: {
                type: [Number],
                required: false,
                unique: false,
            },
        },
    },
    { timestamps: true },
);

AddressSchema.index({ location: "2dsphere" });

module.exports = {
    Address: AddressSchema,
};
