const { User, Thought, Reaction } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
          .then((thought) => res.json(thought))
          .catch((err) => res.status(500).json(err));
      },
      getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v')
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
      createThought(req, res) {
        Thought.create(req.body)
          .then((thought) => {
            return User.findOneAndUpdate(
              { _id: req.body.userId },
              { $addToSet: { thoughts: thought._id } },
              { new: true }
            );
          })
          .then((user) =>
            !user
              ? res.status(404).json({
                message: 'Thought created, but found no user with that ID',
              })
              : res.json('Created the thought')
          )
          .catch((err) => res.status(500).json(err));
      },
      updateThought(req, res) {
        Thought.findById(req.body)
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
      },
      deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : User.deleteOne({ thoughts: thought._id })
      )
      .then(() => res.json({ message: 'Thought deleted!' }))
      .catch((err) => res.status(500).json(err));
      },
      createReaction(req, res) {
        Reaction.create(req.body)
          .then((reaction) => {
            return Thought.findOneAndUpdate(
              { _id: req.body.thoughtId },
              { $addToSet: { reactions: reaction.reactionId } },
              { new: true }
            );
          })
          .then((thought) =>
            !thought
              ? res.status(404).json({
                message: 'Reaction created, but found no thought with that ID',
              })
              : res.json('Created the Reaction')
          )
          .catch((err) => res.status(500).json(err));
      },
      deleteReaction(req, res) {
        Reaction.findOneAndDelete({ _id: req.params.reactionId })
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: 'No reaction with that ID' })
          : Thought.deleteOne({ reactions: reaction.id })
      )
      .then(() => res.json({ message: 'Thought deleted!' }))
      .catch((err) => res.status(500).json(err));
      }
};