import express from 'express';
import diaryServices from '../services/diaryServices';

const router = express.Router();

// router.get('/', (_req, res) => {
//   res.send('Getting all diaries');
// });

router.post('/', (_req, res) => {
  res.send('Saving a diary');
});


router.get('/', (_req, res) => {
  res.send(diaryServices.getNonSensitiveSntries());
});


export default router;
