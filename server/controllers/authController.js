const jwt = require(`jsonwebtoken`);

const User = require(`../models/userModel`);
const Event = require(`../models/eventModel`);
const catchAsync = require(`./catchAsync`);
const AppError = require(`./appError`);

const JWT_SECRET = `aquickgingertabbyjumpedoverthelazygoldenretriever`;
const JWT_EXPIRES_IN = `15d`;
const JWT_COOKIE_EXPIRES_IN = `15`;

//SETUP SIGN IN TOKEN TO BE ATTACHED
const signToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

//CREATE COOKIE AND ATTACH TOKEN
const createSendToken = (user, statusCode, req, res) => {
  //1. SETUP COOKIE PARAMS
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true, //COOKIE INACCESSIBLE BY BROWSER
    secure: req.secure || req.headers[`x-forwarded-proto`] === `https`,
  };

  //2. SEND COOKIE
  res.cookie(`jwt`, token, cookieOptions);

  //3. REMOVE PASSWORD FROM OUTPUT
  user.password = undefined;

  //4. SEND USER WITH COOKIE AND TOKEN
  res.status(statusCode).json({
    status: `success`,
    token,
    user,
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1. IF EMAIL & PASSWORD DOES NOT EXIST
  if (!email || !password) {
    return next(new AppError(`Please provide an email and password.`, 400));
  }

  //2. CHECK IF USER EXISTS AND PASSWORD CORRECT + CREATE FAILED LOGIN EVENT
  const user = await User.findOne({ email }).select(`+password`);
  if (!user || !(await user.correctPassword(password, user.password))) {
    if (user)
      await Event.create({
        type: `LOGIN`,
        response: `failed`,
        user: user.id,
      });

    return next(new AppError(`Incorrect email or password.`, 401));
  }

  //3. CREATE SUCCESSFUL LOGIN EVENT
  await Event.create({
    type: `LOGIN`,
    response: `success`,
    user: user.id,
  });

  //4. SEND USER WITH TOKEN
  createSendToken(user, 200, req, res);
});

exports.logout = (req, res) => {
  res.cookie(`jwt`, `loggedout`, {
    //OVERWRITE COOKIE FOR LOGOUT
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: `success` });
};
