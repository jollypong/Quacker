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
            required: true, 
            default: Date.now,
            get: (dateValue) => moment(dateValue).format('MMM DD, YYYY [at] hh:mm a')
        },
        userName:
        {
            type: String,
            required: true, 
            ref: 'User'
        },
        reactions: [
            reactionSchema
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true, 
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;