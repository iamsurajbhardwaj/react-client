const getRandomNumber = max => (Math.floor(Math.random() * max));

const getRoundRobinNumber = (min, max) => ((min === (max - 1)) ? 0 : (min + 1));
//  {
//   const value =
//   // let value = min;
//   // value += 1;
//   // if (value === max) {
//   //   return 0;
//   // }
//   console.log('value>>>', value);

//   return value;
// };

export { getRandomNumber, getRoundRobinNumber };
