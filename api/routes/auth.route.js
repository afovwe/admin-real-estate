import express from 'express';
import { signup, verifyEmail, verifyEmailLink } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/verify-email/:email', verifyEmail);
router.get('/verify-by-link', verifyEmailLink);
router.post('/signup', signup);

export default router;
