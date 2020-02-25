/* eslint-disable */
export default mistake => mistake.replace(/&/, "and")
                            .replace(/p\.\s?/i,'')
                            .replace(/, (?=\d+)/, " ")
                            .replace(/, (?=and)/, " ")
                            .replace(
                            /(?<=\(\w+)((,)? \w+( and)?){3,5}(?= \d+)/,
                            " et al."
                            )
                            .replace(/ [1-2][0-9][0-9][0-9](?=\))/, "") // (Author, 2015) => (Author)
                            .replace(/(?<=\d+)[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/\s]{1,}(?=\)$)/,'') // (Author 14...),
                            .replace(/(?<=\()[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/\s]{1,}/,'') // (...Author 14),
                            
                            