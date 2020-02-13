


export let APAtitle = /(?<=\(\d{4}(\, \w+ \d+)?\)\. )(?:[A-Z][^\.\s]*\s?| & |\b(?:and|but|of|with|to|on|out|among|in|for|a|the|from|is|or) )+(?=(?:\(\d+(?:st|nd|rd|th) ed(\.)?\)\.|\.(?: |\n)))/g
export let APAjournal = /(?<=\.\s|^)(\w+\s){0,3}[^A-Z]+?(?=, \d+\(\d+\))/g
