import { NewDiaryEntry } from './types';


const parseComment = (comment: any): string => {
  if(!comment || !isString(comment)) {
    throw new Error(`Incorrect or missing comment: ${comment}`);
  }

  return comment;
};


const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect of missing date: ' +  date);
  }
  return date;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const toNewDiaryEntry = (object: any): NewDiaryEntry => { 
  const newEntry: NewDiaryEntry = {
    // ...
  }

  return newEntry;
};

export default toNewDiaryEntry;
