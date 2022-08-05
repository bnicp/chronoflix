const { Schema, model } = require('mongoose');

const scoreSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    }
});

const Score = model('Score', scoreSchema);

module.exports = Score;
