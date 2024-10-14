import { addZero } from "./addZero";

export const formatDate = (date?: Date) => {
  if (date) {
    const newDate = new Date(date);

    const year = newDate.getFullYear();
    const formattedMonth = addZero(newDate.getMonth() + 1);
    const formattedDay = addZero(newDate.getDate());

    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  return "";
};
