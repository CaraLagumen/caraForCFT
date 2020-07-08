const mongoose = require(`mongoose`);

const eventSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, `Event type required.`],
    },
    response: {
      type: String,
      required: [true, `Event response required.`],
    },
    created: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: `User`,
      required: [true, `Event must belong to a user.`],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

eventSchema.pre(/^find/, function (next) {
  this.populate(`user`);
  next();
});

const Event = mongoose.model(`Event`, eventSchema);
module.exports = Event;
