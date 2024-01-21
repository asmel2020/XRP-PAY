export const getMaxNumFromArray = (numbers: number[]): number => {
  let result = 0;

  // Recorremos el array para obtener el valor mayor
  for (var i = 0; i < numbers.length; i++) {
    let number = numbers[i];

    // En la primera vuelta cogemos el valor
    if (i == 0) {
      result = number;
    }

    // En las demás cogemos el valor si es mayor al que tenemos
    else {
      if (number > result) {
        result = number;
      }
    }
  }

  // Siempre devuelve el mayor de todos
  return result;
};
