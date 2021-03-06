const { Schema, Types } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      userName: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        required: true, 
        default: Date.now,
        get: (dateValue) => moment(dateValue).format('MMM DD, YYYY [at] hh:mm a')
      },
    },
    {
      toJSON: {
        getters: true,
      },
    },
  );
  
  module.exports = reactionSchema;
  