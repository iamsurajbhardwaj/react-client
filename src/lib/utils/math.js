const getRandomNumber = max => (Math.floor(Math.random() * max));

const getRoundRobinNumber = (min, max) => ((min === (max - 1)) ? 0 : (min + 1));

export { getRandomNumber, getRoundRobinNumber };
