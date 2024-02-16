import { Router } from 'express';
import {
  deleteEventById,updateEventById,removeEvent,updateParticipantVerification,removeParticipantsFromEvent,addfacultycoordinatorById,addtcacordinatorToEventById,
  addclubcoordinatorById,addtcacoordinatorById,addParticipantToEventById,gettcacordinatorByEventId,getParticipantsByEventId,
  createEvent,getAllEvents
} from '../controllers/event.controller.js';

import {
  authorizeRoles,
  authorizeSubscribers,
  isLoggedIn,
} from '../middlewares/auth.middleware.js';

const router = Router();

router
  .route('/')
  .get(isLoggedIn,getAllEvents)
  .post(
    isLoggedIn,
    authorizeRoles('ADMIN'),
    // upload.single('thumbnail'),
    createEvent
  )
  .delete(isLoggedIn, authorizeRoles('ADMIN'), removeParticipantsFromEvent)
  .put(isLoggedIn, authorizeRoles('ADMIN'), updateParticipantVerification )
router
  .route('/:id')
  .post(
    isLoggedIn,
    authorizeRoles('ADMIN'),

    addParticipantToEventById
  )
  .get(isLoggedIn, authorizeSubscribers, getParticipantsByEventId) // Added authorizeSubscribers to check if user is admin or subscribed if not then forbid the access to the lectures
  .put(isLoggedIn, authorizeRoles('ADMIN'), updateEventById);

  
router
  .route('/tcacoordinator/:id')
  .post(
    isLoggedIn,
    authorizeRoles('ADMIN'),

    addtcacordinatorToEventById
  )
  .get(isLoggedIn,  gettcacordinatorByEventId) // Added authorizeSubscribers to check if user is admin or subscribed if not then forbid the access to the lectures

router
  .route('/lecture/:id')
  .post(
    isLoggedIn,
    authorizeRoles('ADMIN'),

    addParticipantToEventById
  )

router
  .route('/clubcoordinator/:id')
  // .get(isLoggedIn, authorizeSubscribers, getParticipantsByEventId) // Added authorizeSubscribers to check if user is admin or subscribed if not then forbid the access to the lectures
  .post(
    isLoggedIn,
    authorizeRoles('ADMIN'),
    // upload.single('lecture'),
    addclubcoordinatorById
  )




export default router;