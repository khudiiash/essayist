
let determiner = /(?<=\.\s)(?:This(?=(\,)?\s\b(?:be|been|is|was|were|are|have|has|had|will|can|could|therefore|should|would|may|might|shall|\w+[^s]s|\w+ed)\b)|(?:These|Those)(?=\s\b(?:be|been|is|was|were|are|have|has|had|will|can|could|therefore|should|would|may|might|shall|are|were|\w+(?<!al|s))\b))/g
export default determiner