// type bmiCategory = 'Underweight' | 'Normal range' | 'Overweight' | 'Obese';

export const calculateBmi = (height: number, weight: number) => {
  const score = weight / ((height / 100) * 2);

  if (score < 18.5) {
    return 'Underweight';
  } else if (score < 25) {
    return 'Normal range';
  } else if (score < 30) {
    return 'Overweight';
  } 
  return 'Obese';
};

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);

console.log(calculateBmi(height, weight));