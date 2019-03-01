import moment from 'moment';

const getDateFormatted = (date, format) => moment(date).format(format);
export default getDateFormatted;
