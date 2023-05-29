const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxLength: 280,
          },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => {
                if (date) return date.toISOString().split("T") [0];
              },
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction]
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return `Number of reactions: ${this.reactions.length}`
    });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;