import { v1 as uuid } from 'uuid';
import patients from "../../data/patients";
import { NonSensitivePatientInfo, newPatient, Patient } from "../types";

const getPatients = (): Array<NonSensitivePatientInfo> => {
  console.log('pat ', patients);
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

export default {
  getPatients,
  addPatient,
  findById
};