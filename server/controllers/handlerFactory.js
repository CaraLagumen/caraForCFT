const catchAsync = require(`./catchAsync`);
const AppError = require(`./appError`);

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.find();

    res.status(200).json({
      status: `success`,
      results: doc.length,
      doc,
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    const doc = Model.findById(req.params.id);

    if (!doc) {
      return new AppError(`No document found with that ID.`, 404);
    }

    res.status(200).json({
      status: `success`,
      doc,
    });
  });

exports.createMany = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.insertMany(req.body);

    res.status(201).json({
      status: `success`,
      results: doc.length,
      doc,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: `success`,
      doc,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError(`No document found with that ID.`, 404));
    }

    res.status(200).json({
      status: `success`,
      doc,
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError(`No document found with that ID.`, 404));
    }

    res.status(204).json({
      status: `success`,
      doc: null,
    });
  });
