import { addZero } from "./addZero";

export const formatTime = (time?: Date) => {
  if (time) {
    const newTime = new Date(time);

    const formattedMinutes = addZero(newTime.getMinutes());
    const formattedSeconds = addZero(newTime.getSeconds());

    return `${formattedMinutes} : ${formattedSeconds}`;
  }

  return "";
};
