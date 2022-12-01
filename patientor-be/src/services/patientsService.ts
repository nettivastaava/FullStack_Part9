import patients from "../../data/patients";
import { NonSensitivePatientInfo } from "../types";

const getPatients = (): Array<NonSensitivePatientInfo> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, 
    name, 
    dateOfBirth, 
    gender, 
    occupation 
  }));
};

export default {
  getPatients
};