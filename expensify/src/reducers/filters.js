import moment from 'moment';

export default (
  state = {
    text: '',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
    sortBy: 'date'
  }, action) => {
    switch (action.type) {
      case 'SET_TEXT':
        return {
          ...state,
          text: action.text
        };
      case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      };
      case 'SET_END_DATE':
        return {
          ...state,
          endDate: action.endDate
        };
      case 'SORT_BY_DATE':
        return {
          ...state,
          sortBy: 'date'
        };
      case 'SORT_BY_AMOUNT':
        return {
          ...state,
          sortBy: 'amount'
        };
      default:
        return state;
    }
}
