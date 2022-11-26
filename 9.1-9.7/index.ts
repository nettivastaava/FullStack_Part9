import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, Statistics } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = req?.query.height;
  const weight = req?.query.weight;
  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).send({ error: "malformed parameters"});
  } else {
    const bmiStatus = calculateBmi(Number(height), Number(weight));
    const response = {
      height: height,
      weight: weight,
      bmi: bmiStatus
    };
    res.send(response);
  }
});

app.post('/exercises', (req, res) => {
  const body = req.body;

  if (!body?.daily_exercises || isNaN(Number(body?.target))) {
    res.json({ error: 'parameters missing' });
  } else {
    const statistics: Statistics = calculateExercises(Number(body.target), body.daily_exercises);
    res.send(statistics);
  }
})
  
const PORT = 3003;
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
