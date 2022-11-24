interface Statistics {
  periodLength: number,
  trainingDays: number,
  target: number,
  average: number,
  success: boolean,
  rating: number,
  ratingDescription: string
}

const ratingDescriptions = [
  "Come on!",
  "M'kay",
  "Brilliant!"
]

const calculateExercises = (weeklyHours: Array<number>): Statistics => {
  if (weeklyHours.length < 1) {
    throw new Error('Provided an empty list');
  }
  const trainingDays = weeklyHours.filter(hoursCount => hoursCount > 0) 
  const average = weeklyHours.reduce((accumulator, currentVale) => accumulator + currentVale, 0) / weeklyHours.length
  const rating = average >= 3 ? 3 : average >= 2 ? 2 : 1;
  const target = 2;
  return {
    periodLength: weeklyHours.length,
    trainingDays: trainingDays.length,
    target: target,
    average,
    rating,
    success: rating >= target,
    ratingDescription: ratingDescriptions[rating - 1]
  }
}

console.log(calculateExercises([3, 5, 2, 4.5, 5, 3, 1]));