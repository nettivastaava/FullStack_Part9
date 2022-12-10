import { newPatient, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const isDate = (dateOfBirth: string): boolean => {
  return Boolean(Date.parse(dateOfBirth));
};

const parseDate = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
      throw new Error('Incorrect or missing date: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};

const validateGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender ' + gender);
  }

  return gender;
};

const validateOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation ' + occupation);
  }

  return occupation;
};

const isSSN = (ssn: string): boolean => {
  if (!ssn || !isString(ssn)) {
    return false;
  }

  return true;
};

const validateSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || !isSSN(ssn)) {
    throw new Error('Incorrect or missing SSN ' +  ssn);
  }

  return ssn;
};
/*
const validateEntries = (entries: unknown): Array<string> => {
  if (!entries || !Array.isArray(entries)) {
    throw new Error('Incorrect or missing entries ' +  entries);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return entries;
};
*/
const toNewPatient = (object: any): newPatient => {
  const newPatientObjct: newPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: validateGender(object.gender),
    occupation: validateOccupation(object.occupation),
    ssn: validateSSN(object.ssn),
    entries: []
  };

  return newPatientObjct;
};

export default toNewPatient;