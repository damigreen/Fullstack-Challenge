import diaries from '../../data/diaries';
import { DiaryEntry } from '../types';

// const diaries:  Array<DiaryEntry> = diaryData as Array<DiaryEntry>;


const getEntities = (): Array<DiaryEntry> => {
  return diaries;
};

const addEntry = () => {
  return null;
};

const getNonSensitiveSntries = 
  (): Array<Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>> => {
    // ...
  };

export default {
  getEntities,
  addEntry
};
