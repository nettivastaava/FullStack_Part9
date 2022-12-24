import { v1 as uuid } from 'uuid';
import patients from "../../data/patients";
import { NonSensitivePatientInfo, newPatient, Patient, newEntry } from "../types";

const getPatients = (): Array<NonSensitivePatientInfo> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, 
    name, 
    dateOfBirth, 
    gender, 
    occupation, 
  }));
};

const findById = ( id: string ): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const addPatient = ( toBeAdded: newPatient ): Patient => {
  const newPatientObject = {
    id: uuid(),
    ...toBeAdded
  };

  patients.push(newPatientObject);
  return newPatientObject;
};

const addEntry = (id: string, entry: newEntry): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id);
  if (patient) {
    const newEntryObject = {
      id: uuid(),
      ...entry
    };
    patient.entries.push(newEntryObject);

    return patient;
  }
  return undefined;
};

export default {
  getPatients,
  addPatient,
  findById,
  addEntry
};