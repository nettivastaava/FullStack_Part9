import { newPatient, Gender, Entry, newEntry, HealthCheckRating, Diagnosis, Discharge } from "./types";
import diagnoses from "../data/diagnoses";

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

const isValidType = (type: unknown) => {
  if (type !== "HealthCheck" && type !== "Hospital" && type !== "OccupationalHealthcare") {
    return false;
  }

  return true;
};

const isEntries = (entries: any): entries is Entry[] => {
  const entriesToValidate = entries as Entry[];
  const invalid = entriesToValidate?.find(entry => entry.type !== 'Hospital' && entry.type !== 'OccupationalHealthcare' && entry.type !== 'HealthCheck');
  
  if (invalid) {
    return false;
  }

  return true;
};

const validateEntries = (entries: unknown): Entry[] => {
  if (!entries) {
    return [];
  }

  if (!isEntries(entries)) {
    throw new Error('Incorrect or missing entries ' + entries);
  }

  
  return entries;
};

export const toNewPatient = (object: any): newPatient => {
  const newPatientObjct: newPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: validateGender(object.gender),
    occupation: validateOccupation(object.occupation),
    ssn: validateSSN(object.ssn),
    entries: validateEntries(object?.entries)
  };

  return newPatientObjct;
};

const isHealthCheckRating = (healthCheckRating: any): healthCheckRating is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const validateHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing health check rating ' + healthCheckRating);
  }

  return healthCheckRating;
};

const validateDiagnosisCodes = (diagnosisCodes: unknown): diagnosisCodes is Array<Diagnosis['code']> => {
  const toDiagCodes = diagnosisCodes as Array<Diagnosis['code']>;
  const validated = toDiagCodes?.filter(diagnosis => diagnoses.some(diag => diag.code === diagnosis));
  
  if (validated?.length === toDiagCodes?.length) {
    return true;
  }

  return false;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnosis['code']> => {
  if (!diagnosisCodes || !validateDiagnosisCodes(diagnosisCodes)) {
    throw new Error('Incorrect or missing dianosis codes ' + diagnosisCodes);
  }

  return diagnosisCodes;
};

const parseType = (type: unknown): any => {
  if (!type || !isValidType) {
    throw new Error('invalid or missing type ' + type);
  }

  return type;
};

const validateDischarge = (obj: unknown): any => {
  const discharge = obj as Discharge;
  if (!discharge || !discharge.date || !isDate(discharge.date) || !discharge.criteria || !isString(discharge.criteria)) {
    throw new Error('invalid or missing discharge ' + discharge);
  }

  return discharge;
};

const parseDischarge = (obj: unknown): Discharge => {
  const discharge = obj as Discharge;
  console.log('dis ', discharge);
  if (!discharge || !validateDischarge(discharge)) {
    throw new Error('invalid or missing discharge ' + discharge);
  }

  return discharge;
};

const parseSickLeave = (sickLeaveObj: unknown): any => {
  const sickLeave = sickLeaveObj as {
    startDate: string,
    endDate: string
  };
  if (!sickLeave || !sickLeave.startDate || !sickLeave.endDate || !parseDate(sickLeave.startDate) || !parseDate(sickLeave.endDate)) {
    throw new Error('invalid or missing sick leave ' + sickLeave);
  }

  return sickLeave;
};

const validateHealthCheck = (object: any): newEntry => {
  const newEntryObject: newEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    type: parseType(object.type),
    date: parseDate(object.date),
    specialist: parseName(object.specialist),
    healthCheckRating: validateHealthCheckRating(object.healthCheckRating),
    description: parseName(object.description),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
  };

  return newEntryObject;
};

const validateHospitalEntry = (object: any): newEntry => {
  const newEntryObject: newEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    type: parseType(object.type),
    date: parseDate(object.date),
    specialist: parseName(object.specialist),
    description: parseName(object.description),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    discharge: parseDischarge(object.discharge),
  };

  return newEntryObject;
};

const validateOccupationalHealthcareEntry = (object: any): newEntry => {
  const newEntryObject: newEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    type: parseType(object.type),
    date: parseDate(object.date),
    specialist: parseName(object.specialist),
    description: parseName(object.description),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    employerName: parseName(object.employerName),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    sickLeave: parseSickLeave(object.sickLeave),
  };

  return newEntryObject;
};

export const toNewEntry = (object: any): newEntry => {
  switch(object.type) {
    case "HealthCheck":
      return validateHealthCheck(object);
    case "Hospital":
      return validateHospitalEntry(object);
    case "OccupationalHealthcare":
      return validateOccupationalHealthcareEntry(object);
    default:
      throw new Error('invalid or missing type ' + object.type);
  }
};