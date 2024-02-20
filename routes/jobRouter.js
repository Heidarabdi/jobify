import {Router} from 'express';

const router = Router();

// import controllers
import {createJob, getAllJobs, getJobById, updateJob, deleteJob} from '../controllers/jobController.js';
import {validateIdParam, validateJobInput} from "../middleware/validationMiddleware.js";


// routes
// router.get('/', getAllJobs);
// router.get('/:id', getJobById);
// router.post('/', createJob);
// router.patch('/:id', updateJob);
// router.delete('/:id', deleteJob);

// or you can use this syntax
router.route('/')
    .get(getAllJobs)
    .post(validateJobInput, createJob);

router.route('/:id')
    .get(validateIdParam, getJobById)
    .patch(validateIdParam,validateJobInput, updateJob)
    .delete(validateIdParam, deleteJob);

export default router;