import React from "react";
import { Editor, ContentState, EditorState, RichUtils, Modifier, CompositeDecorator, SelectionState, getDefaultKeyBinding, convertFromHTML } from "draft-js";
import {stateFromHTML} from 'draft-js-import-html'
import { commentActions } from '../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import docsSoap from 'docs-soap';
import htmlToDraft from 'html-to-draftjs';
import "draft-js/dist/Draft.css"

import "./rich.css";
//libs
import phrasalVerbs from "../libraries/phrasal-verbs";
import weakWords from "../libraries/weak-words";
import pronouns from "../libraries/pronouns";
import wordiness from "../libraries/wordiness";
import vague from "../libraries/vague";
import informal from "../libraries/informal";
import replace from "../libraries/replace";
import weasel from "../libraries/weasel";
import replacePV from "../libraries/replacePV";
import shortForms from "../libraries/short";
import british from "../libraries/british";
import prepositions from "../libraries/prepositions";
import countries from "../libraries/countries"
import conjunctions from "../libraries/conjunctions"
import auxiliary from "../libraries/auxiliary"
// regexp
import concludingSentencesRX from "../libraries/regex/concludingSentencesRX";
import {
  passiveRXglobal,
  passiveRXinline
} from "../libraries/regex/passiveRX";
import {
  punctuationRXglobal,
  punctuationRXinline
} from "../libraries/regex/punctuationRX";
import outdated from "../libraries/regex/outdated.js";
import factChecker from "../libraries/regex/factChecker";
import conjunctionStart from "../libraries/regex/conjunctionStart";
import prepositionalRX from "../libraries/regex/prepositionalRX";
import apostrophesRX from "../libraries/regex/apostrophesRX";
import repetitionsRX from "../libraries/regex/repetitionsRX";
import { APAcitationGlobal, APAcitationInline } from "../libraries/regex/APAcitationRX";
import { MLAcitationGlobal, MLAcitationInline } from "../libraries/regex/MLAcitationRX";
import { APAtitle, APAjournal } from "../libraries/regex/APAreference";
import determiner from "../libraries/regex/determiner";
import wordOrderRX from "../libraries/regex/wordOrder";
import thesisRX from "../libraries/regex/thesisRX";
import well from "../libraries/regex/well";
import uppercaseRX from "../libraries/regex/uppercaseRX";
import pageForQuote from "../libraries/regex/pageForQuote"
import headingRX from "../libraries/regex/headingRX";

import { verbs } from '../libraries/regex/passiveRX'
import { which } from '../libraries/regex/which'
// Modules
import clean from "../modules/clean";
import fixApaCitation from '../modules/fixApaCitation'
import fixMlaCitation from '../modules/fixMlaCitation'
import toTitleCase from '../modules/toTitleCase'

import {useSpring,animated} from 'react-spring'
import * as easings from 'd3-ease'

let replaceArray = replace.map(item => Object.keys(item)[0])
let regexes = []
  .concat(prepositionalRX)
  .concat(passiveRXglobal)
  .concat(punctuationRXglobal)
  .concat(conjunctionStart)
  .concat(apostrophesRX)
  .concat(determiner)
  .concat(headingRX)
  .concat(wordOrderRX)
  .concat(well)
  .concat(which)
  .concat(pageForQuote)
  .concat(uppercaseRX)
  .concat(APAcitationGlobal)
  .concat(MLAcitationGlobal)
  .concat(outdated)
  .concat(repetitionsRX)
  .concat(/^Introduction$/g)

let sentenceRX = []
  .concat(thesisRX)
  .concat(concludingSentencesRX)
  .concat(factChecker)
  .concat(APAtitle)
  .concat(APAjournal)


let mistakes = phrasalVerbs
  .concat(informal)
  .concat(pronouns)
  .concat(wordiness)
  .concat(vague)
  .concat(replaceArray)
  .concat(weasel)
  .concat(weakWords)
  .concat(shortForms)


let repetitions = [];
let concludingSentences = []
let thesisStatement = ''
let facts = []
let titles = []
let journals = []
let quotations = []
let citationStyle = 'APA'
let words = mistakes



// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function () {
  return this[0].toUpperCase() + this.substring(1, this.length);
};


const dragComment = (key, { clientY }) => {
  let comment = document.getElementById(key)

  if (comment) {
    comment.parentNode.scrollTo({ top: comment.offsetTop - comment.parentNode.offsetTop - clientY + 15, behavior: 'smooth' })
    comment.style.left = '-25px'
    comment.style.maxHeight = '525px'
    let children = comment.parentNode.childNodes
    for (var child of children) {
      if (child !== comment) {
        child.style.left = '0'
        child.style.maxHeight = '40px'

      }
    }

  }
}
function findAndReplace(mistake,repl,regex, contentBlock,callback) {
  let text = contentBlock.getText();
  let matchArr, start, end;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    end = start + matchArr[0].length;
    callback(start, end);
    text = text.replace(new RegExp(`\\b${mistake}\\b`,'i'),repl)
  }
   // Prevent text selection
   if(document.selection && document.selection.empty) {
    document.selection.empty();
  } else if(window.getSelection) {
    var sel = window.getSelection();
    sel.removeAllRanges();
  }
}

function findWithRegex(words, contentBlock, callback) {
  const text = contentBlock.getText();

  sentenceRX.forEach(sentenceRX => {
    const matches = [...text.matchAll(sentenceRX)];
    if (sentenceRX === thesisRX && text.includes('. ') && !thesisStatement) {
      if (matches.length) {
        thesisStatement = matches[0][0]
      }
      else {
        thesisStatement = '~!!!' 
        return
      }
    } else if (sentenceRX === thesisRX && text.includes('. ') && thesisStatement) {
      if (matches.length) {
        return
      }
    }
    
    matches.forEach(match => {
      switch (sentenceRX) {
        case concludingSentencesRX:
          concludingSentences.push(match[0])
        case factChecker:
          facts.push(match[0])
        case APAtitle:
          titles.push(match[0])
        case APAjournal:
          journals.push(match[0])
      }
        

      if (match) {
        callback(match.index, match.index + match[0].length);

      }
    })
  })
  words.forEach(word => {

    let regexp = new RegExp(`(?<!-|\/)\\b${word}\\b(?!-|\/)`, `gi`)
    if (word === 'us') {
      regexp = new RegExp(`(?<!-|\/)\\b${word}\\b(?!-|\/)`, `g`)
    }
    const matches = [...text.matchAll(regexp)];

    matches.forEach(match => {
      if (match) {
        callback(match.index, match.index + match[0].length);
      }
    })

  });
  regexes.forEach(regexp => {
    if (citationStyle === 'MLA' && regexp === APAcitationGlobal) return
    if (citationStyle === 'APA' && regexp === MLAcitationGlobal) return

    const matches = [...text.matchAll(regexp)];

    if (regexp === repetitionsRX) {
      matches.forEach(m => repetitions.push(m[0]))
    }
    if (regexp === APAtitle) {
      matches.forEach(m => titles.push(m[0]))
    }
    if (regexp === APAjournal) {
      matches.forEach(m => journals.push(m[0]))
    }

    matches.forEach(match => {
      if (match) {
        callback(match.index, match.index + match[0].length);
      }
    })



  })

}

const styles = {
  editor: {
    border: "1px solid gray",
    minHeight: "6em"
  }
};

function handleStrategy(contentBlock, callback) {
  findWithRegex(words, contentBlock, callback);
}
function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    case 'left':
      return 'align-left';
    case 'center':
      return 'align-center';
    case 'right':
      return 'align-right';
    default:
      return null;
  }
}
function findReplaceOptions(mistake,replace,replaceOptions) {
  try {
    if (mistake.charAt(0) ===  mistake.charAt(0).toLowerCase() || mistake === 'America') {
      replaceOptions = Object.values(replace.find(i => new RegExp(`^\\b${Object.keys(i)[0]}\\b$`, 'gi').test(mistake)))[0]
    } else if (mistake.charAt(0) ===  mistake.charAt(0).toUpperCase()) {
      replaceOptions = Object.values(replace.find(i => new RegExp(`^\\b${Object.keys(i)[0]}\\b$`, 'gi').test(mistake)))[0].split(',').map(w => w.trim().capitalize()).join(',')
    }
  } catch {

  }
  
  return replaceOptions
}
export default class RichEditorExample extends React.Component {
  constructor(props) {
    super(props);
    const Decorated = (props) => {
      let { children, decoratedText, offsetKey } = props,
        name = '*',
        comment = 'Mistake',
        color = 'yellow',
        replaceOptions = '',
        readMore = '',
        mistake = decoratedText
      
     
      
      // Punctuation

      if (punctuationRXinline.test(mistake)) {
        name = "Punctuation"
        if (mistake.charAt(0) === mistake.charAt(0).toUpperCase()) {
          comment = `Do not forget to use a comma after introductory ${mistake.includes(' ') ? 'phrase' : 'word'}.`
          replaceOptions = mistake + ','
        } else {
          comment = `Do not forget use commas to separate inserts.`
          replaceOptions = ', ' + mistake + ','
        }

      }

      // Weak words

      else if (weakWords.find(v => new RegExp(`^\\b${v}\\b$`,'i').test(mistake))) {
        name = 'Weak Word'
        comment = `Avoid using weak words in academic writing: since they have numerous meanings, they might be ambiguous and unclear in your context. Moreover, poor vocabulary has always been one the most unpleasant writers' disadvantages. <div>Click to see synonyms for "<a class='comment__thesaurus-link' target='_blank' href=https://www.thesaurus.com/browse/${mistake.replace(/\s/g,'%20')}?s=t>${mistake}</a>" at thesaurus.</div>`
        replaceOptions = findReplaceOptions(mistake,replace,replaceOptions)

      }
      // Phrasal Verbs
      else if (phrasalVerbs.find(pv => new RegExp(`^\\b${pv}\\b$`,'i').test(mistake))) {
        name = 'Phrasal Verb'
        comment = `Do not use phrasal verbs as they are considered informal. Click to see synonyms for "<a class='comment__thesaurus-link' target='_blank' href=https://www.thesaurus.com/browse/${mistake.replace(/\s/g,'%20')}?s=t>${mistake}</a>" at thesaurus.`
        replaceOptions = findReplaceOptions(mistake,replace,replaceOptions)

      }
      
      // Passive voice
      else if (passiveRXinline.test(mistake)) {
        name = "Passive Voice"
        comment = "Consider rephrasing the sentence using active voice."
        readMore = 'https://owl.purdue.edu/owl/general_writing/academic_writing/active_and_passive_voice/changing_passive_to_active_voice.html'
      }
      // Pronouns 
      else if (/^\b(?:you|your(self)?|we|our(selves)?|)\b$/i.test(mistake) || /^\bus\b$/.test(mistake)) {
        name = "Inappropriate Pronoun"
        comment = "Academic writing requires objectivity. In terms of pronouns use, it means that you have to use preferably the third person perspective <div class='example'><span class='example__correct'>he, she, it, they</span></div> rather than first or second <div class='example'><span class='example__wrong'>we, us, our, you, your</span></div>"
        readMore = 'https://www.scribbr.com/academic-writing/pronouns/'
      }
      // Short Forms
      else if (shortForms.split('|').find(s => s === mistake.toLowerCase())) {
        name = 'Contraction'
        comment = 'Do not ever use contractions (short forms) in academic writing as they are considered informal.'
        replaceOptions = findReplaceOptions(mistake,replace,replaceOptions)
       
      }
      // Informal
      else if (informal.find(i => new RegExp(`^\\b${i}\\b$`,'i').test(mistake))) {
        name = "Informal"
        comment = "Such writing might be considered inappropriate in terms of academic writing. Please, consider finding a formal equivalent or rephrasing the sentence."
        readMore = 'https://www.uts.edu.au/current-students/support/helps/self-help-resources/grammar/formal-and-informal-language'
      }
      // Wordiness 
      else if (wordiness.includes(mistake.toLowerCase())) {
        name = "Wordiness"
        comment = "This phrase might be unnecessarily wordy. Academic writing requires concise word choice meaning that you should not use exceedingly wordy phrases that are, in fact, not necessary for the developing of your thought."
        readMore = 'https://proofreadingpal.com/proofreading-pulse/essays/how-to-avoid-wordiness/'
      }
      // Vague 
      else if (vague.find(v => new RegExp(`^\\b${v}\\b$`,'i').test(mistake))) {
        name = "Vague"
        comment = `It might be unclear what exactly you intend to express. Such wording might be interpreted in a variety of ways depriving your argument of much needed details. <div>Click to find synonyms for "<a class='comment__thesaurus-link' target='_blank' href=https://www.thesaurus.com/browse/${mistake.replace(/\s/g,'%20')}?s=t>${mistake}</a>" at Thesaurus.</div>`
        readMore = 'https://writingcommons.org/article/vague-language/'
        replaceOptions = findReplaceOptions(mistake,replace,replaceOptions)

      }

      // Weasel
      else if (weasel.find(w => new RegExp(`^\\b${w}\\b$`, 'gi').test(mistake))) {
        name = "Weasel Words"
        comment = `Weasel words are tricky: they present a claim as an undoubtful truth or a proven fact, while not providing eny evidence supporting it. Academic writing does not allow such wording: you must provide specific evidence by credible authors.
          For example: <div class='example'><span class='example__wrong'>Scientists claim that</span></div>
          <div class='example'><span class='example__wrong'>Many people say that...</span></div>
          <div class='example'><span class='example__wrong'>It is obvious that...</span></div>
          `
      }
      // Passive Voice 2
      else if (passiveRXinline.test(mistake)) {
        name = "Passive Voice"
        comment = "Consider rephrasing the sentence using active voice."
        readMore = 'https://owl.purdue.edu/owl/general_writing/academic_writing/active_and_passive_voice/changing_passive_to_active_voice.html'
      }
      // Punctuation 2
      else if (punctuationRXinline.test(mistake)) {
        name = "Punctuation"
        if (mistake.charAt(0) === mistake.charAt(0).toUpperCase()) {
          comment = `Do not forget to use a comma after introductory ${mistake.includes(' ') ? 'phrase' : 'word'}.`
          replaceOptions = mistake + ','
        } else {
          comment = `Do not forget use commas to separate inserts.`
          replaceOptions = ', ' + mistake + ','
        }

      }

      // Uppercase
      else if (uppercaseRX.test(mistake)) {
        name = "Uppercase"
        comment = "Do not use uppercase in academic writing."
        try {
          replaceOptions = toTitleCase(mistake.toLowerCase())
        } catch {}

      }
      else if (mistake === 'Introduction') {
        name = "APA Format"
        comment = `According to the latest APA formatting standards, you must not include the "Introduction" heading`
        readMore = 'https://owl.purdue.edu/owl/research_and_citation/apa_style/apa_formatting_and_style_guide/apa_headings_and_seriation.html'
      }
      // Outdated
      else if (/^\d{4}$/.test(mistake)) {
        name = "Outdated Source"
        comment = "In most cases, you have to use the most relevant sources available on the topic. If the customer do not require specific sources, use those published within the last 10 years."
      }
      // Word Order
      else if (prepositionalRX.test(mistake)) {
        name = "Prepositions"
        comment = `Overusing prepositions might negatively affect text readability. I recommend you to rephrase it using fewer prepositions.`
        readMore='https://www.dailywritingtips.com/5-ways-to-reduce-use-of-prepositions/'
      }
      else if (wordOrderRX.test(mistake)) {
        name = "Word Order"
        comment = `Do not put adverbs between the "to" and the infinitive verb.`
        replaceOptions = mistake.split(' ')[0] + ' ' + mistake.split(' ')[2] + ' ' + mistake.split(' ')[1] + ',' + mistake.split(' ')[1] + ' ' + mistake.split(' ')[0] + ' ' + mistake.split(' ')[2]
      }
      // Determiner
      else if (/^(?:This|These|Those)$/.test(mistake)) {
        name = "Unclear Antecedent"
        comment = `Avoid beginning a new sentence with a determiner or pronoun without its corresponding noun as it might be ambiguous what or who it refers to.`
      }
      // Thesis Statement 
      else if (thesisStatement === mistake) {
        name = "Thesis Statement"
        comment = "Thesis statement has to present the central argument of the paper or an expected result of research depending on the assignment type. Do not just provide what you are going to discuss: explain the issue and and how its solution."
        readMore = 'https://writingcenter.unc.edu/tips-and-tools/thesis-statements/'
      }
      // Concluding Sentences
      else if (concludingSentences.includes(mistake) && mistake !== thesisStatement) {
        name = "Concluding Sentence"
        comment = "A concluding sentence is supposed to summarize the key finding of the paragraph and/or make a transition to the next theme. Never include examples, citations, or new ideas at the end."
        readMore = 'https://www.ntid.rit.edu/sea/processes/paragraph/process/concluding'
      }
      // Facts 
      else if (facts.includes(mistake)) {
        name = "No Citation"
        comment = "Any factual information such as statistics, dates, historical events, figures, facts, and similar must have citations provided. Otherwise, found plagiarism is just a matter of time."
        readMore = '#'
      }
      // Which
      else if (mistake === 'which') {
        name = "Which/That"
        comment = `In restrictive clauses, use <b>that</b> rather than <b>which</b>. "Which" should appear in nonrestrictive clauses.`
        replaceOptions = 'that'
        readMore = 'https://www.grammarly.com/blog/which-vs-that/'
      }
      // APA
      else if (citationStyle === 'APA' && (APAcitationInline.test(mistake) || /\(\d{4}, \w+ \d+\)/i.test(mistake))) {
        name = "APA Formatting"
        comment = "Consider correcting the citation formatting according to the APA guidelines."
        replaceOptions = fixApaCitation(mistake) !== mistake ? fixApaCitation(mistake) : ''
        readMore = 'https://owl.purdue.edu/owl/research_and_citation/apa_style/apa_formatting_and_style_guide/in_text_citations_the_basics.html'
      }
      // MLA
      else if (citationStyle === 'MLA' && MLAcitationInline.test(mistake)) {
        name = "MLA Formatting"
        comment = "Consider correcting the citation formatting according to the MLA guidelines."
        replaceOptions = fixMlaCitation(mistake)
        readMore = 'https://owl.purdue.edu/owl/research_and_citation/mla_style/mla_formatting_and_style_guide/mla_in_text_citations_the_basics.html'
      }
      // APA title
      else if (citationStyle === 'APA' && titles.includes(mistake)) {
        name = "APA Title Formatting"
        comment = "Consider that in APA, reference title must have sentence-case formatting. It means that you should only capitalize the initial word, proper names, and the first word after the colon (in case there is a colon)."
        try {
          replaceOptions = mistake.includes(':') 
          ? mistake.toLowerCase().split(': ')[0].capitalize() + ': ' + mistake.toLowerCase().split(': ')[1].capitalize() 
          : mistake.toLowerCase().capitalize()
          replaceOptions = replaceOptions.replace(/\bus\b/g,'US').replace(/\bamerica\b/g,'America').replace(/\bamerican\b/g,'American').replace(/\bamericans\b/g,'Americans').replace(/\beurope\b/g,'Europe')
        } catch {
          
          try {
            replaceOptions = mistake.toLowerCase().capitalize()
          }
          catch {
            console.log('error while dealing with title')
          }
        }

        readMore = 'https://owl.purdue.edu/owl/research_and_citation/apa_style/apa_formatting_and_style_guide/reference_list_articles_in_periodicals.html'
      }
      // Journals
      else if (journals.includes(mistake)) {
        name = "APA Journal Formatting"
        comment = "Consider that in APA, journal title must have title-case formatting. It means that you should capitalize each major word of the title (except for prepositions, articles, and conjunctions)."
        try {
          replaceOptions = toTitleCase(mistake) !== mistake ? toTitleCase(mistake) : ''
        } catch { }

        readMore = 'https://owl.purdue.edu/owl/research_and_citation/apa_style/apa_formatting_and_style_guide/reference_list_articles_in_periodicals.html'
      }

      // Quote 
      else if (citationStyle === 'APA' && quotations.includes(mistake)) {
        name = "APA Formatting"
        comment = "Direct quotations require you to include the number of page where the quote can be found. For example:"
        try {
          replaceOptions = mistake.split(')')[0] + ', p. 146)'
        } catch { }

        readMore = 'https://owl.purdue.edu/owl/research_and_citation/apa_style/apa_formatting_and_style_guide/reference_list_articles_in_periodicals.html'
      }
      // Replace

      else if (replaceArray.find(i => new RegExp(`^\\b${i}\\b$`, 'gi').test(mistake))) {
        name = "Replace"
        comment = "I would recommend you replace this with one of the following options since the word does not fit the norms or academic writing"
        replaceOptions = Object.values(replace.find(i => new RegExp(`^\\b${Object.keys(i)[0]}\\b$`, 'gi').test(mistake)))[0]
        
        replaceOptions = findReplaceOptions(mistake,replace,replaceOptions)
      }
          // Repetitions
      else if (repetitions.includes(mistake) && mistake !== 'which') {
        color = '#c9daf8'
        comment = `Avoid repeating the same words. Click to find synonyms for "<a class='comment__thesaurus-link' target='_blank' href=https://www.thesaurus.com/browse/${mistake}?s=t>${mistake}</a>" at Thesaurus.`
        name = 'Repetition'
    }
     


      let spanAnimation = useSpring({
        to: {paddingLeft: 0,backgroundColor: color},
        from: {paddingLeft: '-45px',backgroundColor: 'rgba(0,0,0,0)'},
        config: {duration: 400}
      })

      return <animated.span className='highlight'
        style={spanAnimation}
        onMouseOver={(e) => dragComment(offsetKey, e)}
        onDoubleClick={(e) => this.replaceOnDoubleClick(offsetKey, e)}
        comment={comment}
        name={name}
        commentkey={offsetKey}
        readmore={readMore}
        replaceoptions={replaceOptions}>
        {children}
      </animated.span>;
    };
    const createDecorator = () =>
      new CompositeDecorator([
        {
          strategy: handleStrategy,
          component: Decorated
        }
      ]);
    this.state = { editorState: EditorState.createEmpty(createDecorator()),comments:[] };
    this.focus = () => this.refs.editor.focus();
    this.onChange = editorState => this.setState({ editorState });
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    this.onTab = this.onTab.bind(this);
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        5 /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      e.preventDefault();
    }
    return getDefaultKeyBinding(e);
  }
  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }
  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }
  componentDidMount() {
    let editor = document.getElementsByClassName('RichEditor-root')[0]
    let comments = document.getElementsByClassName('comments')[0]
    let textarea = document.querySelector("#root > div > div.RichEditor-root > div.RichEditor-editor > div > div > div")
   
    

    if (textarea) textarea.focus()
    if (editor && comments) {
      editor.onscroll = function () {
        comments.scrollTop = this.scrollTop // Synchronize editor and comments scroll
      }
    }
  }
  findWithRegex = (words, contentBlock, callback) => {
    const text = contentBlock.getText();
    sentenceRX.forEach(sentence => {

      const matches = [...text.matchAll(sentence)];

      matches.forEach(match => {
        if (match) {
          callback(match.index, match.index + match[0].length);

        }
      })
    })
    words.forEach(word => {
      let regexp = word === 'us' ? new RegExp(`\\b${word}\\b`, 'g') : new RegExp(`\\b${word}\\b`, 'gi')

      const matches = [...text.matchAll(regexp)];

      matches.forEach(match => {
        if (match) {
          callback(match.index, match.index + match[0].length);
        }
      })

    });
    regexes.forEach(regexp => {

      const matches = [...text.matchAll(regexp)];
      
      if (regexp === repetitionsRX) {
        matches.forEach(match => {
          if (!repetitions.includes(match[0]))
            repetitions.push(match[0])
        })
      }
      if (regexp === pageForQuote) {
        matches.forEach(match => {
          if (!quotations.includes(match[0]))
            quotations.push(match[0])
        })
      }

      matches.forEach(match => {
        if (match) {
          callback(match.index, match.index + match[0].length);
        }
      })



    })
  }
  showHighlight = (id) => {

    if (id !== 'off') {
      let highlight = document.querySelector(`span[commentKey="${id}"]`)
      let otherHighlights = document.querySelectorAll(`span[commentKey]:not([commentKey="${id}"])`)

      let comment = document.querySelector(`.comment[id="${id}"]`)


      if (highlight) highlight.style.backgroundColor = 'rgb(255,117,107)'
      otherHighlights.forEach(h => {
          if (h) {
            if (h.attributes.name.value === 'Repetition') {
              h.style.backgroundColor = '#c9daf8'
            }
            else {
              h.style.backgroundColor = 'yellow'
            }
          }
        
       
      })
    } else {
      let otherHighlights = document.querySelectorAll(`span[commentKey]`)
      if (otherHighlights.length) {
        for (let h of otherHighlights) {
          if (h.attributes.name.value === 'Repetition') {
            h.style.backgroundColor = '#c9daf8'
          }
          else if (h.attributes.name.value !== 'Repetition') {
            h.style.backgroundColor = 'yellow'
          }
        }
      }

    }

  }
  replaceById = ({ text, repl }) => {
   
    let regex = new RegExp(`\\b${text}\\b`, 'g');
    if (text.charAt(0) === '(') {
      regex = new RegExp(`${text.replace(/\(/,'\\(').replace(/\)/,'\\)')}`, 'g');
      
      repl = `(${repl.replace(/(?:\(|\))/g,'')})`
      
    }
    const { editorState } = this.state;
    const selectionsToReplace = [];
    const blockMap = editorState.getCurrentContent().getBlockMap();
    blockMap.forEach((contentBlock) => (
      findAndReplace(text,repl,regex, contentBlock, (start, end) => {
        const blockKey = contentBlock.getKey();
        const blockSelection = SelectionState
          .createEmpty(blockKey)
          .merge({
            anchorOffset: start,
            focusOffset: end,
          });

        selectionsToReplace.push(blockSelection)
      })
    ));

    let contentState = editorState.getCurrentContent();

    selectionsToReplace.forEach(selectionState => {
      contentState = Modifier.replaceText(
        contentState,
        selectionState,
        repl,
      )
    });

    this.setState({
      editorState: EditorState.push(
        editorState,
        contentState,
      )
    })

    this.props.killReplaceTarget()
  }
  replaceOnDoubleClick = (key, { clientY, clientX, target }) => {
   
    
    let comment = document.getElementById(key)
    let span = target.parentNode.parentNode
    let value = span.attributes.replaceoptions.value
    let text = target.innerText
    if (value) {
      // Got buttons
      if (value.includes('[')) {
        value = value.split('[')[0]
        
      }
      if (!['APA Formatting','Punctuation'].includes(span.attributes.name.value)) {
        value = value.split(',')[0]
      } else {
        value = value.replace(/\(|\)/g,'')
        if (span.attributes.name.value === 'Punctuation' && value.charAt(0) === ',') {
          text = ' '+text
        }
      }
     
      this.replaceById({ text: text, repl: value })
    }
    else {
      // No replace buttons
      console.log('no value')

    }
  }
  onTab = (e) => {
    e.preventDefault();
    let tabCharacter = '        '
    let currentState = this.state.editorState;
    let newContentState = Modifier.replaceText(
      currentState.getCurrentContent(),
      currentState.getSelection(),
      tabCharacter
    );

    this.setState({
      editorState: EditorState.push(currentState, newContentState, 'insert-characters')
    });
  }
  handlePastedText = (text, html,editorState) => {
        if (!editorState.getCurrentContent().getPlainText('\u0001')) {
            repetitions = []
            concludingSentences = []
            thesisStatement = ''
            facts = []
            titles = []
            journals = []
            quotations = []
            citationStyle = /works? cited/i.test(text) ? 'MLA' : 'APA'
          const blocksFromHTML = convertFromHTML(html.replace(/<b/g,'<p').replace(/<\/b/,'</p'));
          const newState = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap,
          );
  
          this.onChange(EditorState.push(editorState, newState, 'insert-fragment'))
          return true
        }          
  }
  render() {
    setTimeout(() => {
      
      let highlights = document.getElementsByClassName('highlight')
      let comments = []
      
      let stateComments = this.props.stateComments.comments
      if (this.props.replaceTarget) {
      
        this.replaceById(this.props.replaceTarget)
  
      }
      if (this.props.highlightTarget) {
        this.showHighlight(this.props.highlightTarget)
  
      }
      for (let highlight of highlights) {
        let c = highlight.attributes
        let commentObject = { id: c.commentkey.value, name: c.name.value, text: c.comment.value, replaceOptions: c.replaceoptions.value, readMore: c.readmore.value, mistake: highlight.innerText }
        comments.push(commentObject)
      }
      if (comments.length && stateComments.length !== comments.length) {
        this.props.addComments(comments)
      } else if (stateComments.length > 0 && comments.length === 0) {
        this.props.addComments([])
      }
    },0)
  
    const { editorState } = this.state;
    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();

    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== "unstyled"
      ) {
        className += " RichEditor-hidePlaceholder";
      }
    }
    return (
      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <div className={className} onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            onTab={this.onTab}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            handlePastedText={this.handlePastedText}
            onChange={this.onChange}
            placeholder=""
            ref="editor"
            spellCheck={true}
          />
        </div>
      </div>
    );
  }
}
// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = e => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }
  render() {
    let className = "RichEditor-styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}
const BLOCK_TYPES = [
  // { label: "left", style: "header-one" },
  // { label: "H1", style: "header-one" },
  // { label: "H2", style: "header-two" },
  // { label: "H3", style: "header-three" },
  // { label: "H4", style: "header-four" },
  // { label: "H5", style: "header-five" },
  // { label: "H6", style: "header-six" },
  // { label: "Blockquote", style: "blockquote" },
  // { label: "UL", style: "unordered-list-item" },
  // { label: "OL", style: "ordered-list-item" },
  // { label: "Code Block", style: "code-block" }
];
const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};
var INLINE_STYLES = [
  // { label: "Bold", style: "BOLD" },
  // { label: "Italic", style: "ITALIC" },
  // { label: "Underline", style: "UNDERLINE" },
  // { label: "Monospace", style: "CODE" }
];
const InlineStyleControls = props => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};
