import { format } from 'date-fns';

export const toStartHourDay = (year: number, month: number, day: number) => {
  return new Date(
    `${year.toString().padStart(4, '0')}-${month
      .toString()
      .padStart(2, '0')}-${day.toString().padStart(2, '0')}T00:00:00.000Z`,
  );
};

export const toEndHourDay = (year: number, month: number, day: number) => {
  return new Date(
    `${year.toString().padStart(4, '0')}-${month
      .toString()
      .padStart(2, '0')}-${day.toString().padStart(2, '0')}T23:59:59.000Z`,
  );
};

export const toFirstDayMonth = (year: number, month: number) => {
  return new Date(
    `${year.toString().padStart(4, '0')}-${month
      .toString()
      .padStart(2, '0')}-01T00:00:00.000Z`,
  );
};

export const toLastDayMonth = (year: number, month: number) => {
  const lastDay = new Date(year, month, 0, 0);

  return new Date(`${format(lastDay, 'yyyy-MM-dd')}T23:59:59.000Z`);
};
