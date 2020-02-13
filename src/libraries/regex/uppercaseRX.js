/* eslint-disable no-useless-escape */
const uppercaseRX = /^(?<!\()(?:[A-Z][A-Z ]{6,}|DOI)(?!\)|\.|\,|[a-z])$/g
export default uppercaseRX