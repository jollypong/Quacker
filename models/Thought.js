const { Schema, model } = require('mongoose');
const reactionSchema = require ('./Reaction');

//helper function for date
const moment = require('moment');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            trim: true,
            minLength: 1, 
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => moment(timestamp).format('MMM DD, YYYY [at] hh:mm a'),
        },
        username:
        {
            type: String,
            required: true, 
        },
        reaction: [
            reactionSchema
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reaction.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;