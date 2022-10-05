import * as R from "ramda";

const toCamelCase = str =>
  str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());

export const buildSelectOptions = optionsAsStringArray =>
  optionsAsStringArray.map(option => ({
    label: option,
    value: toCamelCase(option),
  }));

export const isPresent = R.pipe(R.either(R.isNil, R.isEmpty), R.not);
