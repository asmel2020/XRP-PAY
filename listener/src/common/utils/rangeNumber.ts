export const rangeNumber = (number1: number, number2: number) => {
  let min = Math.min(number1, number2);

  let max = Math.max(number1, number2);

  let output = Array.from({ length: max - min + 1 }, (v, i) => i + min);

  output.shift();

  if (number1 > number2) output.reverse();
  
  return output;
};
