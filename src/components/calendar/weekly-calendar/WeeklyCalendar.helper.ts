import {
  addDays,
  differenceInCalendarWeeks,
  endOfWeek,
  format,
  nextWednesday,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

export const getCalendarWeek = (currentDate: Date) => {
  const startDate = startOfWeek(currentDate);
  const endDate = endOfWeek(currentDate);

  const dates: Date[] = [];
  let curr = startDate;
  while (differenceInCalendarWeeks(endDate, curr) >= 0) {
    dates.push(curr);
    curr = addDays(curr, 1);
  }

  return dates;
};

export const getCalendarTitle = (currentDate: Date) => {
  const startDayOfMonth = startOfMonth(currentDate).getDay();
  const baseDateOfWeek = nextWednesday(startOfWeek(currentDate));

  const baseDay = baseDateOfWeek.getDate();

  const correctionValue = startDayOfMonth <= 3 ? 1 : 0;
  const weekOfMonth = Math.ceil((baseDay - (7 - startDayOfMonth) + 1) / 7) + correctionValue;

  return `${format(baseDateOfWeek, 'MMMM yyyy')} ${weekOfMonth} week`;
};
