let prepositionalRX = /(?:([a-zA-Z]+\s?\b)\s\bfor\b\s([a-zA-Z]+\s?\b){1,3}\s\bwould\b\s\bbe\b|([a-zA-Z]+\s?\b)\s\bof\b\s([a-zA-Z]+\s?\b){1,3}(\s\bof\b\s([A-Za-z]+(\s\w{5,}){1,3}\b){1,2}){1,3}|([a-zA-Z]+\s?\b){1,2}\s\bof\b\s([a-zA-Z]+\s?\b){1,3}\s\bon\b\s([a-zA-Z]+\s?\b){1,3}\s\bof\b\s([a-zA-Z]+\s?\b){1,2})/gi
export default prepositionalRX