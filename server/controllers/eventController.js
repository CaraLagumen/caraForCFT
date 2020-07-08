const moment = require(`moment`);

const Event = require(`../models/eventModel`);
const factory = require(`./handlerFactory`);
const catchAsync = require(`./catchAsync`);
const AppError = require(`./appError`);

exports.getEvents = factory.getAll(Event);
exports.createEvents = factory.createMany(Event);

exports.getFailedEvents = catchAsync(async (req, res, next) => {
  const doc = await Event.find({ response: `failed` });

  res.status(200).json({
    status: `success`,
    results: doc.length,
    doc,
  });
});

exports.getSingleUserEvents = catchAsync(async (req, res, next) => {
  const doc = await Event.find({ user: req.params.userId });

  res.status(200).json({
    status: `success`,
    results: doc.length,
    doc,
  });
});

exports.getDayBeforeLastEvents = catchAsync(async (req, res, next) => {
  const events = await Event.find();

  const eventsDates = events.map((event) => moment(event.created));
  const latestEventDate = moment.max(eventsDates);
  const dayBeforeLastEvent = latestEventDate.subtract(1, `d`).toDate();

  const doc = await Event.find({ created: dayBeforeLastEvent });

  if (!doc) {
    return new AppError(
      `No events found for the day before the latest event.`,
      404
    );
  }

  res.status(200).json({
    status: `success`,
    results: doc.length,
    doc,
  });
});

exports.getWeekBeforeEvents = catchAsync(async (req, res, next) => {
  const now = moment().startOf(`d`);
  const weekBeforeStart = now.clone().subtract(2, `w`).toDate();
  const weekBeforeEnd = now.clone().subtract(1, `w`).toDate();
  
  const doc = await Event.find({
    $and: [
      { created: { $gte: weekBeforeStart, $lte: weekBeforeEnd } },
      { response: `success` },
    ],
  });

  if (!doc) {
    return new AppError(
      `No successful events found for the week before the latest event.`,
      404
    );
  }

  res.status(200).json({
    status: `success`,
    results: doc.length,
    doc,
  });
});
