/* eslint-disable no-useless-escape */
const thesisRX = /(?!.*(Journal|\d{1,3}\(\d{1,3}\)|\d{1,4}\-\d{1,4}))(?<=(?:\.\s|\.\s\s))(?!\.)([^\.\<\>]+)?\s?\b(?:(?:this|the) (?:paper|essay|part|research|study|report|analysis|work|piece|text|review|argument|discussion)|(?:examines|reviews|evaluates|explores|studies)|(?:For example|For instance|Also|Additionally|In addition|Moreover|Likewise|Furthermore|Besides|Another)|\d+)\b[^\.\(]+(\([^\.\)]+\))?[.?!](?=(\s{1,})?$)/gi

export default thesisRX