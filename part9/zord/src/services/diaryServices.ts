import diaries from '../../data/diaries';
import { DiaryEntry } from '../types';

// const diaries:  Array<DiaryEntry> = diaryData as Array<DiaryEntry>;


const getEntities = (): Array<DiaryEntry> => {
  return diaries;
};

const addEntry = () => {
  return null;
};

// const getNonSensitiveSntries = 
//   (): Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>[] => {
//     // ...
//   };

const getNonSensitiveSntries = (): Omit<DiaryEntry, 'comment'> => {
    // ...
  };

export default {
  getEntities,
  addEntry
};
