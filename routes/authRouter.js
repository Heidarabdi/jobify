import {Router} from "express";
import {validateLoginInput, validateRegisterInput} from "../middleware/validationMiddleware.js";
import {login, logout, register} from "../controllers/authController.js";


const router = Router();

// import controllers

router.route('/register').post(validateRegisterInput, register);
router.route('/login').post(validateLoginInput, login);
router.route('/logout').get(logout);



export default router;