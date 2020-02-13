// eslint-disable-next-line no-useless-escape
const repetitionsRX = /(?<!-|\/)(?:(?!span)(\b(?!this|that|those|these|thus|their|there|will|would|should|could|from|were|with)(?<!\-)\w{4,})(?<=\b\1\b[^\.\n]+)|\b(\w+)\s+\2\b)|((?<=\.\s)\b(?!These|This|Those)([A-Z][a-z]{3,}))(?<=(?!span)(?<=\.\s|\n|^)\b\4\b([^\.\n]+(?=\.)){0,1}\.\s\4)/gi
export default repetitionsRX

