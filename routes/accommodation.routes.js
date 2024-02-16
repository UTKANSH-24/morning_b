import { Router } from "express";
import {
    registerAccommodation,
    // getAccommodationList,
    getUnverifiedAccommodationList,
    getVerifiedAccommodationList,
    changeAccommodationVerificationStatus,
    getMyBookingList,
    getAllRoomList,
} from "../controllers/accommodation.controller.js"
import { isLoggedIn } from "../middlewares/auth.middleware.js";
const router = Router();

router.route('/registerAccommodation').post(isLoggedIn, registerAccommodation);
// router.route('/getAccommodationList').post(isLoggedIn, getAccommodationList);
// router.route('/getUnverifiedAccommodationList/').post(isLoggedIn, getUnverifiedAccommodationList);
router.route('/getUnverifiedAccommodationList/:type').post(isLoggedIn, getUnverifiedAccommodationList);
router.route('/getVerifiedAccommodationList/:type').post(isLoggedIn, getVerifiedAccommodationList);
router.route('/changeAccommodationVerificationStatus').post(isLoggedIn, changeAccommodationVerificationStatus);
router.route('/getMyBookingList').post(isLoggedIn, getMyBookingList);
router.route('/getAllRoomList').post(isLoggedIn, getAllRoomList);

export default router;
