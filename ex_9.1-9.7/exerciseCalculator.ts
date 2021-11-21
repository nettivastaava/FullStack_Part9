interface ResultConfig {
  days: number,
  daysTrained: number,
  target: number,
  average: number,
  success: boolean,
  rating: number,
  ratingDes: string
}

const calculateExercises = (exercises: number[], goal: number) => {
  function getAvg(exercises: number[]) {
    const total = exercises.reduce((acc, c) => acc + c, 0);
    return total / exercises.length;
  }

  const trainDays = exercises.filter(number => number > 0);

  console.log('trainD ', trainDays)
  
  const average = getAvg(exercises);

  console.log('avg ', average)


  if (average >= goal) {
    const successResult = {
      days: exercises.length,
      daysTrained: trainDays.length,
      target: goal,
      average: average,
      success: true,
      rating: 3,
      ratingDes: 'brilliant!'
    }
    console.log(successResult);
  } else if (average >= goal-1) {
    const almostSuccessResult = {
      days: exercises.length,
      daysTrained: trainDays.length,
      target: goal,
      average: average,
      success: false,
      rating: 2,
      ratingDes: 'Not too bad, but could be better.'
    }
    return console.log(almostSuccessResult);
  } else {
    const failResult = {
      days: exercises.length,
      daysTrained: trainDays.length,
      target: goal,
      average: average,
      success: false,
      rating: 1,
      ratingDes: 'This is bad indeed. You should train!'
    }
    return console.log(failResult);
  }
}

interface exerciseArray {
  exercises: number[],
  goal: number
}

const parseArgumentsEx = (args: Array<string>): exerciseArray => {
  if (args.length < 2) throw new Error('Not enough arguments');

  args.shift();
  args.shift();
  for (let i = 0; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Provided values were not numbers!');
    } 
  }

  const final: Array<number> = args.map(string => Number(string));
  const dailyGoal = final.pop();
  return {
    exercises: final,
    goal: dailyGoal
  }
}

try {
  const { exercises, goal } = parseArgumentsEx(process.argv);
  calculateExercises(exercises, goal);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}