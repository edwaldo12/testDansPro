import Router, { json } from "express";
import {
  addUser,
  getJobs,
  getJobDetail,
} from "../controllers/jobController.js";
import { loginUser } from "../controllers/authController.js";
import { verifyToken } from "../middleware/index.js";

const router = Router({
  caseSensitive: true,
});

const jsonParser = json();

router.post("/api/add-user", jsonParser, addUser);
router.post('/api/login-user', jsonParser, loginUser);

router.get("/api/get-jobs", verifyToken, getJobs);
router.get("/api/get-job-detail/:id", verifyToken, getJobDetail);

export default router;
