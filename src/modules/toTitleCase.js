import prepositions from '../libraries/prepositions'
import conjunctions from '../libraries/conjunctions'

// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function () {
  return this[0].toUpperCase() + this.substring(1, this.length);
};
export default function(mistake) {
    let exceptions = [...conjunctions.split('|'),...prepositions.split('|'),'the','a',]
    return mistake.split(" ")[0].capitalize() +
    " " +
    mistake
      .split(" ")
      .slice(1)
      .map(w => (exceptions.includes(w) ? w : w.capitalize()))
      .join(" ");
}