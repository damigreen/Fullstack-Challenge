const palindrome = require('../utils/for_testing').palindrome;

test('palindrome of damigreen', () => {
  const result = palindrome('damigreen');

  expect(result).toBe('neergimad');
});

test('palinndrome of react', () => {
  const result = palindrome('react');

  expect(result).toBe('tcaer');
});