// eslint-disable-next-line no-useless-escape
const factChecker = /(?<!\.\s\(\d{4}\)\s)(?<!U\.S\. )(?!\d{1,3}\-\d+|\d{1,2}\(\d{1,3}\))((?<=^|\.\s(\s)?|\n)(((?!\.\s|"|“|\(([^\)]+)?\d{4}\)).)*)?(\%|percent|(?:m|b|tr)illions?|According to|Studies (?:reveal|suggest|propose|state|claim)|research (ha(s|d) )?prove(n|d)|author(s)? \w+ that|\d{3,}(?!\)))(((?!\.\s|\(\w+\)|\(([^\)]+)?\d{4}\)).)*)(?<!\sp+|\d)\.(?=\s))(?!\n)/g

export default factChecker
