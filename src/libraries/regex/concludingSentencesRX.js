/* eslint-disable no-useless-escape */

let concludingSentencesRX = /(?<=\.\s|\.\s\s)(?!(.+)?(?:journal|\d{1,4}-\d{1,4}|\d{1,3}\(\d{1,3}\))(.+)?)([^\.]+)?\s?\b(?:For example|For instance|Also|Additionally|In addition|Moreover|Likewise|[A-Z][a-z]+\s([a-z]+\s){0,5}also|Furthermore|Further|Besides|Another|\d+)\b[^\.\n]+(\[^\)]+?\d{4}\))?[.?!](?=(\s{1,})?$)/gi

export let concludingSentencesInline = /^(?!(.+)?(?:journal|\d{1,4}-\d{1,4}|\d{1,3}\(\d{1,3}\))(.+)?)([^\.]+)?\s?\b(?:For example|For instance|Also|Additionally|In addition|Moreover|Likewise|[A-Z][a-z]+\s([a-z]+\s){0,5}also|Furthermore|Further|Besides|Another|\d+)\b[^\.\n]+(\[^\)]+?\d{4}\))?[.?!](?=(\s{1,})?$)/i

export default concludingSentencesRX;