import asyncHandler from '../middlewares/asyncHandler.middleware.js';
import User from '../models/user.model.js';
import AppError from '../utils/AppError.js';
import sendEmail from '../utils/sendEmail.js';
import Contact from '../models/contactUs.model.js';

/**
 * @CONTACT_US
 * @ROUTE @POST {{URL}}/api/v1/contact
 * @ACCESS Public
 */
export const contactUs = asyncHandler(async (req, res, next) => {
  const { name, email, message, subject } = req.body;
  console.log(name, email, message, subject);
  // console.log(req);
  // Checking if values are valid
  if (!name || !email || !message) {
    return next(new AppError('Name, Email, Message are required'));
  }


  try {
    const textMessage = `<h2>${name} - ${email}</h2> <br /> <p style="font-size:1.2rem">${message}</p>`;

    // Await the send email
    const contact = await Contact.create({ name, email, message, subject });
    if (!contact) {
      return next(new AppError('Server error', 505));
    }
    // console.log(contact);
    await sendEmail(process.env.CONTACT_US_EMAIL, 'Contact Us Form - Utkansh-24\n' + subject, textMessage);
  } catch (error) {
    console.log(error);
    return next(new AppError(error.message, 400));
  }

  res.status(200).json({
    success: true,
    message: 'Your request has been submitted successfully',
  });
});

export const getContactUs = asyncHandler(async (req, res, next) => {
  // console.log(req.body.answerStatus)
  const contact = await Contact.find({ answered: req.body.answerStatus });
  res.status(200).json({ success: true, data: contact });
});

export const replyQuery = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { queryId, replyMessage } = req.body;

  // Assuming queryId is a unique identifier other than ObjectId
  const query = await Contact.findOne({ _id: queryId });

  if (!query) {
    console.log('No query found');
    return res.status(404).json({ success: false, message: 'Query not found' });
  }

  if (replyMessage) {
    // Add a newline before 'Re:'
    query.replyMessage = `${replyMessage}`;

    // You might want to use query.email or another field here
    const truncatedMessage = query.replyMessage.slice(0, Math.min(30, query.replyMessage.length));

    await sendEmail(process.env.CONTACT_US_EMAIL, query.email,
      `Answer to your query: ${truncatedMessage}...`);
  }

  query.answered = true;
  await query.save();

  res.status(200).json({ success: true, message: 'Reply Sent' });
});


/**
 * @USER_STATS_ADMIN
 * @ROUTE @GET {{URL}}/api/v1/admin/stats/users
 * @ACCESS Private(ADMIN ONLY)
 */
export const userStats = asyncHandler(async (req, res, next) => {
  const allUsersCount = await User.countDocuments();

  const subscribedUsersCount = await User.countDocuments({
    'subscription.status': 'active', // subscription.status means we are going inside an object and we have to put this in quotes
  });

  res.status(200).json({
    success: true,
    message: 'All registered users count',
    allUsersCount,
    subscribedUsersCount,
  });
});
