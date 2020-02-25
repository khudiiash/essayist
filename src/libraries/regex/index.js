import {APAcitationGlobal, APAcitationInline} from "./APAcitationRX"
import {MLAcitationGlobal, MLAcitationInline } from "./MLAcitationRX"
import {APAtitle, APAjournal } from "./APAreference"
import {passiveRXglobal, passiveRXinline} from "./passiveRX"
import { punctuationRXglobal, punctuationRXinline} from "./punctuationRX"

export {APAcitationGlobal, 
        APAcitationInline,
        MLAcitationGlobal, 
        MLAcitationInline,
        APAtitle,
        APAjournal,
        passiveRXglobal,
        passiveRXinline,
        punctuationRXglobal,
        punctuationRXinline
};

export {default as concludingSentencesRX} from "./concludingSentencesRX";
export {default as outdated} from "./outdated.js";
export {default as factChecker} from "./factChecker";
export {default as conjunctionStart} from "./conjunctionStart";
export {default as prepositionalRX} from "./prepositionalRX";
export {default as repetitionsRX} from "./repetitionsRX";



export {default as determiner} from "./determiner";
export {default as wordOrderRX} from "./wordOrder";
export {default as thesisRX} from "./thesisRX";
export {default as well} from "./well";
export {default as uppercaseRX} from "./uppercaseRX";
export {default as pageForQuote} from "./pageForQuote"
export {default as headingRX} from "./headingRX";
export { default as topicSentencesRX } from "./topicSentencesRX";
export { default as questionsRX } from "./questionsRX";
export { default as apostrophes } from "./apostrophes";
export { default as isReference } from "./isReference";
export { default as which } from './which';

