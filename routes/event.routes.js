import { Router } from 'express';
import {
  getAllEvents,
  createEvent,
  getParticipantsByEventId,
  getFacultyCoordinatorsByEventId,
  getTcaCoordinatorByEventId,
  addTeamToEventByEventId,
  addTcaCoordinatorByEventId,
  addFacultyCoordinatorByEventId,
  addClubCoordinatorById,
  updateTeamsPaymentVerification,
  updateEventById,
  deleteEventById,
} from '../controllers/event.controller.js';

import {
  authorizeRoles,
  authorizeSubscribers,
  isLoggedIn,
} from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/addTeamToEventByEventId').post( isLoggedIn,addTeamToEventByEventId); //idk y not working with isLogedIn
router.route('/createEvent').post(isLoggedIn, createEvent);
router.route('/getAllEvents').post(isLoggedIn, getAllEvents);
// router.route('/').post(isLoggedIn, getAllEvents);

// router.route('/create').post(isLoggedIn, authorizeRoles('ADMIN'), createEvent);
// // .delete(isLoggedIn, authorizeRoles('ADMIN'), removeParticipantsFromEvent)
// router.route('/update').put(isLoggedIn, authorizeRoles('ADMIN'), updateTeamsPaymentVerification);

// router.route('/addTeam/:id').post(isLoggedIn, authorizeRoles('ADMIN'), addTeamToEventByEventId);
//  router.route('/update') .put(isLoggedIn, authorizeRoles('ADMIN'), updateEventById);

// // router
// // .route('/:id')
// // .get(isLoggedIn, authorizeSubscribers, getParticipantsByEventId)

// router
//   .route('/tcacoordinator/:id')
//   .post(
//     isLoggedIn,
//     authorizeRoles('ADMIN'),

//     addtcacordinatorToEventById
//   )
//   .get(isLoggedIn, gettcacordinatorByEventId) // Added authorizeSubscribers to check if user is admin or subscribed if not then forbid the access to the lectures


// router
//   .route('/facultycoordinator/:id')
//   .post(
//     isLoggedIn,
//     authorizeRoles('ADMIN'),

//     addfacultycoordinatorById
//   )
//   .get(isLoggedIn, getfacultycordinatorByEventId) // Added authorizeSubscribers to check if user is admin or subscribed if not then forbid the access to the lectures



// router
//   .route('/lecture/:id')
//   .post(
//     isLoggedIn,
//     authorizeRoles('ADMIN'),

//     addParticipantToEventById
//   )



// router
//   .route('/clubcoordinator/:id')
//   // .get(isLoggedIn, authorizeSubscribers, getParticipantsByEventId) // Added authorizeSubscribers to check if user is admin or subscribed if not then forbid the access to the lectures
//   .post(
//     isLoggedIn,
//     authorizeRoles('ADMIN'),
//     // upload.single('lecture'),
//     addclubcoordinatorById
//   )




export default router;
