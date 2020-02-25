/* eslint-disable no-useless-escape */

let concludingSentencesRX = /(?<=\.\s|\.\s\s)(?!(.+)?(?:journal|\d{1,4}-\d{1,4}|\d{1,3}\(\d{1,3}\))(.+)?)([^\.]+)?\s?\b(?:For example|Lastly|For instance|Also|Additionally|In addition|Moreover|(?:This|That)\s\w+s|Likewise|[A-Z][a-z]+\s([a-z]+\s){0,5}also|Furthermore|Further|Besides|Another|\d+)\b[^\.\n]+(\[^\)]+?\d{4}\))?[.?!]?(?=(\s{1,})?$)/g

export let concludingSentencesInline = /^(?!(.+)?(?:journal|\d{1,4}-\d{1,4}|\d{1,3}\(\d{1,3}\))(.+)?)([^\.]+)?\s?\b(?:For example|Lastly|For instance|Also|Additionally|In addition|Moreover|(?:This|That)\s\w+s|Likewise|[A-Z][a-z]+\s([a-z]+\s){0,5}also|Furthermore|Further|Besides|Another|\d+)\b[^\.\n]+(\[^\)]+?\d{4}\))?[.?!]?(?=(\s{1,})?$)/

export default concludingSentencesRX;