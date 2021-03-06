import diaries from '../../data/diaries';
import { NewDiaryEntry, NonSensitiveDiaryEntry, DiaryEntry } from '../types';

// const diaries:  Array<DiaryEntry> = diaryData as Array<DiaryEntry>;


const getEntities = (): Array<DiaryEntry> => {
  return diaries;
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...entry
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

// const getNonSensitiveEntries = 
//   (): Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>[] => {
//     // ...
//   };

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find(d => d.id === id);
  return entry;
}

export default {
  getEntities,
  addDiary,
  getNonSensitiveEntries,
  findById,
};
