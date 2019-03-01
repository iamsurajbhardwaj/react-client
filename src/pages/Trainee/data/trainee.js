import { PUBLIC_IMAGE_FOLDER } from '../../../configs';

const imagePath = `${PUBLIC_IMAGE_FOLDER}trainee-Image/`;
const trainees = [
  {
    id: '5c6c47af7740654f0915fac9',
    name: 'Sachin Tendulkar',
    email: 'sachin@gmail.com',
    imagePath: `${imagePath}sachin.jpeg`,
    createdAt: '2019-02-10T18:15:11.778Z',
  },
  {
    id: '5c6c47af7740654f0455fac9',
    name: 'Virat Kohli',
    email: 'virat@gmail.com',
    imagePath: `${imagePath}virat.jpeg`,
    createdAt: '2019-02-12T18:15:11.778Z',
  },
  {
    id: '5c6567af7740654f0915fac9',
    name: 'M.S. Dhoni',
    email: 'msdhoni@gmail.com',
    imagePath: `${imagePath}msDhoni.jpeg`,
    createdAt: '2019-02-13T18:15:11.778Z',
  },
  {
    id: '5c6c47af7747854f0915fac9',
    name: 'Rohit Sharma',
    email: 'rohit.sharma@gmail.com',
    imagePath: `${imagePath}rohit.jpg`,
    createdAt: '2019-02-14T18:15:11.778Z',
  },
  {
    id: '5c6c47af7740654f0915876c9',
    name: 'Bumrah',
    email: 'bumrah@gmail.com',
    imagePath: `${imagePath}bumrah.jpg`,
    createdAt: '2019-02-15T18:15:11.778Z',
  },
];


export default trainees;
