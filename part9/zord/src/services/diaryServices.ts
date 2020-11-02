import diaries from '../../data/diaries';
import {NonSensitiveDiaryEntry, DiaryEntry } from '../types';

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

const getNonSensitiveSntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

export default {
  getEntities,
  addEntry,
  getNonSensitiveSntries,
};
