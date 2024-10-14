export const addZero = (value: number) => {
  const newValue = (value < 10 ? "0" : "") + value;

  return newValue;
};
