import {Router} from 'express';

const router = Router();

// import controllers
import {createJob, getAllJobs, getJobById, updateJob, deleteJob, showStats} from '../controllers/jobController.js';
import {validateIdParam, validateJobInput} from "../middleware/validationMiddleware.js";
import {checkForTestUser} from "../middleware/authMiddleware.js";


// routes
// router.get('/', getAllJobs);
// router.get('/:id', getJobById);
// router.post('/', createJob);
// router.patch('/:id', updateJob);
// router.delete('/:id', deleteJob);

// or you can use this syntax
router.route('/')
    .get(getAllJobs)
    .post(validateJobInput, checkForTestUser ,createJob);

router.route('/stats').get(showStats);

router.route('/:id')
    .get(validateIdParam, getJobById)
    .patch(validateIdParam, checkForTestUser, validateJobInput, updateJob)
    .delete(validateIdParam, checkForTestUser , deleteJob);

export default router;