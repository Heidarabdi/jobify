import {Router} from 'express';

const router = Router();

// import controllers
import {createJob, getAllJobs, getJobById, updateJob, deleteJob} from '../controllers/jobController.js';


// routes
// router.get('/', getAllJobs);
// router.get('/:id', getJobById);
// router.post('/', createJob);
// router.patch('/:id', updateJob);
// router.delete('/:id', deleteJob);

// or you can use this syntax
router.route('/').get(getAllJobs).post(createJob);
router.route('/:id').get(getJobById).patch(updateJob).delete(deleteJob);

export default router;