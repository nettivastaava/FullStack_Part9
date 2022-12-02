import { v1 as uuid } from 'uuid';
import patients from "../../data/patients";
import { NonSensitivePatientInfo, newPatient, Patient } from "../types";

const getPatients = (): Array<NonSensitivePatientInfo> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, 
    name, 
    dateOfBirth, 
    gender, 
    occupation 
  }));
};

const addPatient = ( toBeAdded: newPatient ): Patient => {
  const newPatientObject = {
    id: uuid(),
    ...toBeAdded, 
  };

  patients.push(newPatientObject);
  return newPatientObject;
};

export default {
  getPatients,
  addPatient
};