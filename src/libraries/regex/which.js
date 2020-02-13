import prepositions from '../prepositions'
export let which = new RegExp(`(?<=\\b(?:a|the|are|is|(?!this)\\w+s)\\b\\s(\\w+\\s){1,3})(?<!(?:${prepositions}|to \\w+ )\\s)which`,`gi`)