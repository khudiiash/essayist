

// eslint-disable-next-line
export let APAtitle = /(?<=\(\d{4}(\, \w+ \d+)?\)\. )(?:[A-Z0-9—|-][^\.\s]*\s?| & |\b(?:and|but|of|with|within|to|on|out|among|in|for|a|the|from|is|or) )+(?=(?:\(\d+(?:st|nd|rd|th) ed(\.)?\)\.|\.(?: |$)))/g
export let APAjournal = /(?<=\.\s|^)(\w+\s){0,3}[^A-Z]+?(?=, \d+\(\d+\))/g
