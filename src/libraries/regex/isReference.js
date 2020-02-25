// eslint-disable-next-line no-useless-escape
let isReference = /(?:(?:\,|\.)\s[A-Z]\.\s\(\d{4}(, \w+ \d{2})?\)\.|\/(\w+(\-\w+)?)+\/|\d+\(\d+\)|[A-Z][a-z]+\,\s[A-Z][a-z]+\.\s(?:“|"))/g
export default isReference