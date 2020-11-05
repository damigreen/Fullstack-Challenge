import express from 'express';
import diaryServices from '../services/diaryServices';

const router = express.Router();

// router.get('/', (_req, res) => {
//   res.send('Getting all diaries');
// });

// router.post('/', (_req, res) => {
//   res.send('Saving a diary');
// });


router.get('/', (_req, res) => {
  res.send(diaryServices.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const diary = diaryServices.findById(Number(req.params.id));
  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  const { date, weather, visibility, comment } = req.body;
  const newDiaryEntry = diaryServices.addDiary(
    date,
    weather,
    visibility,
    comment,
  );
  res.json(newDiaryEntry);
});

export default router;
