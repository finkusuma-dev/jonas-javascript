const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function getMonth(idx: number) {
  return months[idx];
}

export function sentenceCase(s: string) {
  return s[0].toUpperCase() + s.substring(1);
}

export function invalidInputs(
  inputs: Record<string, unknown>,
  predicate: (value: unknown, key: string) => boolean,
  msg?: (key: string) => string
): boolean {
  let message = '';

  Object.entries(inputs).forEach((entry) => {
    if (predicate(entry[1], entry[0])) {
      if (msg) message = message + sentenceCase(msg(entry[0])) + '\n';
      else message = message + `${sentenceCase(entry[0])} is invalid!\n`;
    }
  });

  if (message) alert(message);

  return message != '';
}
