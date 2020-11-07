import express from 'express';
import diaryServices from '../services/diaryServices';
import toNewDiaryEntry from '../utils';

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
  try {
    // const { date, weather, visibility, comment } = req.body;
    const newDiaryEntry = toNewDiaryEntry(req.body);

    const addedEntry = diaryServices.addDiary(newDiaryEntry);
    res.json(addedEntry);

  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
