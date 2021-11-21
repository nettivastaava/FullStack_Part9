const calculateBmi = (height: number, weight: number) => {
  const bmi = (weight/(height*height))*10000;

  if (bmi < 18.5) {
    console.log('Underweight (Unhealthy)');
  } else if (bmi < 23) {
    console.log('Normal range (Healthy)');
  } else if (bmi < 25) {
    console.log('Overweight I (At risk)');
  } else if (bmi < 30) {
    console.log('Overweight II (Moderately obese)');
  } else {
    console.log('Overweight III (Severely obese)');
  }
}

interface bmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): bmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

try {
  const { height, weight } = parseArguments(process.argv);
  calculateBmi(height, weight);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }

  console.log(errorMessage);
}
