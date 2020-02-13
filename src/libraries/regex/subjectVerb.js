import irregular from '../irregular'
import auxiliary from '../auxiliary'
import prepositions from '../prepositions'
import conjunctions from '../conjunctions'
let pluralWithoutS = 'men|women|children|feet|sheep|teeth|people'

let irr = irregular.join('|')
let otherExceptions = 'the|a|or|and|also|ever|er|s|if|and|lt|ly|had|ever|is|ed|ible|ing'

export let are = new RegExp('(?<=(?<!\\w+\\sof\\s)(?:a|the)\\s\\w+\\sand\\s(?:a|the)\\s\\w+\\s(\\w+\\s)?)\\bis\\b')
export let have = new RegExp('(?<=(?<!\\w+\\sof\\s)(?:a|the)\\s\\w+\\sand\\s(?:a|the)\\s\\w+\\s(\\w+\\s)?)\\bhas\\b')
export let sEndingSingle= new RegExp(`(?<!(?:${prepositions})\\s)\\b(?:he|she|it)\\b\\s[^\\s\\.’'\\,]+(?<!${irr}|be|been|is|was|has|had|will|can|could|should|would|must|may|might|shall|doesn|did|didn|done|${prepositions}|${otherExceptions})\\b`,'gi')

export let sEndingPlural = new RegExp(`(?<!(?:${prepositions})\\s)\\b(?:they|${pluralWithoutS})(\\swho)?\\b\\s[^\\s\\.\\,]+(?<=(?<!s|ly|ible|ed|ing|${conjunctions}|${prepositions})s)\\b`,'gi')