import { NewDiaryEntry, Weather, Visibility, } from './types';


const parseComment = (comment: any): string => {
  if(!comment || !isString(comment)) {
    throw new Error('Incorrect or missing comment: ' +  comment);
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

const isWeather = (param: any): param is Weather => {
  return Object.values(Weather).includes(param);
};

const parseWeather = (weather: any): Weather => {
  // if (!weather || !isString(weather) || !isWeather(weather)) {
  if (!weather || !isWeather(weather)) {
    throw new Error('Incorrect or missing weather: ' + weather);
  }
  return weather;
};

const isVisibility = (param: any): param is Visibility => {
  return Object.values(Visibility).includes(param);
};

const parseVisibility = (visibility: any): Visibility => {
  if (!visibility || !isVisibility(visibility)) {
    throw new Error('Incorrect or missing visibility: ' + visibility);
  }
  return visibility;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const toNewDiaryEntry = (object: any): NewDiaryEntry => { 
  return {
    date: parseDate(object.date),
    comment: parseComment(object.comment),
    weather: parseWeather(object.weather),
    visibility: parseVisibility(object.visibility),
  };
};

export default toNewDiaryEntry;
