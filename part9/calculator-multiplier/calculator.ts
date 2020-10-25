type Operation = "multiply" | "add" | "divide";
type Result = number | string;

export const calculator = (a: number, b: number, op: Operation): Result => {
  // if (op === "multiply") {
  //   return a * b;
  // } else if (op === 'add') {
  //   return a + b;
  // } else if (op === 'divide') {
  //   if (b === 0) return 'can\'t divide by 0!';
  //   return a / b;
  // }

  switch (op) {
    case 'multiply':
      return a * b;
    case 'add':
      return a + b;
    case 'divide':
      if (b === 0) throw new Error('can\'t divide by 0!');
      return a / b;
    default:
      throw new Error('Operation is not multiply, divide or add!');
  }
}

console.log(process.argv)
try {
  console.log(calculator(4, 8, 'add'))
} catch(e) {
  console.log('Something went wrong, error message: ', e.message);
}
