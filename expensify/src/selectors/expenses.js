import moment from 'moment';

export default (expenses, {text, startDate, endDate, sortBy}) => (
  expenses.filter((expense) => {
    const createdAtMoment = moment(expense.createdAt);
    const isTextMatch = expense.description.toLowerCase().includes(text.toLowerCase());
    const isAfterStartDate = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
    const isBeforeEndDate = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
    return isTextMatch && isAfterStartDate && isBeforeEndDate;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt > b.createdAt ? -1 : 1;
    } else if (sortBy == 'amount') {
      return a.amount > b.amount ? -1 : 1;
    }
  })
);
