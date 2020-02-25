/* eslint-disable */
export default mistake => mistake.replace(/and/, "&")
                        .replace(/(?<=\w+),(?=\d{4})/,', ')
                        .replace(/(?<!,) (?=\d{4})/, ", ")
                        .replace(/(?<=(\w+, ){1,4}\w+) &/, ", &")
                        .replace(/(?<=\d+) (?=p)/, ", ")
                        .replace(
                        /(?<=\d{4}(,\s)?)(?:page|pg)(?:\.|,)? (?=\d+)/,
                        "p. "
                        )
                        .replace(
                        /(?<=\(\w+)((,)? \w+(, &)?){4,}(?=, \d{4})/,
                        " et al."
                        )
                        .replace(/(?<=\w+, )\b\d{1,3}\b(?!\-\d+)/, "2019")
                        .replace(/(?<=\w+)\s(?=\b\d{1,3}\-\d{1,3})/, ", 2019, pp. ")
                        .replace(/(?<=\w+),\s(?=\b\d{1,3}\-\d{1,3})/, ", 2019, pp. ")
                        .replace(/,&/,', &')
                        .replace(/(?<=\(\w+), &/, " &")
                        .replace(/”,/,',”')
                        .replace(/",/,',"')
                        .replace(/(?<=et al)\,/,'.,')
                        .replace(/&(?=\w+)/,'& ')
                        .replace(/(?<=\,)&/,' &')
                        .replace(/(?<=\()\s{1,9}/,'')
                        .replace(/\s{1,9}(?=\))/,'')