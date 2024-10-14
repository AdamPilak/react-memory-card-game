import { addZero } from "./addZero";

export const formatDate = (date?: Date) => {
  if (date) {
    const newDate = new Date(date);

    const year = newDate.getFullYear();
    const formattedMonth = addZero(newDate.getMonth());
    const formattedDay = addZero(newDate.getDay());

    const formattedMinutes = addZero(newDate.getMinutes());
    const formattedSeconds = addZero(newDate.getSeconds());

    return `${formattedDay}/${formattedMonth}/${year} ${formattedMinutes} : ${formattedSeconds}`;
  }

  return "";
};
