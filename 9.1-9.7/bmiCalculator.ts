// type bmiCategory = 'Underweight' | 'Normal range' | 'Overweight' | 'Obese';

const calculateBmi = (height: number, weight: number) => {
  const score = weight / ((height / 100) * 2);

  if (score < 18.5) {
    return 'Underweight'
  } else if (score < 25) {
    return 'Normal range'
  } else if (score < 30) {
    return 'Overweight'
  } 
  return 'Obese'
}

console.log(calculateBmi(180, 128))