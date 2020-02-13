export default function clean(data) {
    if (Array.isArray(data)) {
        return data.map(el => el.replace(/.*\)(?!.*\))(?!$|\?)|\\{1,2}[a-b]|(?<=^)\(\?[^\)]+\)|\(\?[^\)]+\)(?=$)|\)(?=\?)|\((\s)?|\?|<\/?span>|\\{1,2}[a-z]|\+ed|\+|\)/g,''))
    }
    if (typeof data === 'string') {
        return data.replace(/.*\)(?!.*\))(?!$|\?)|\\{1,2}[a-b]|(?<=^)\(\?[^\)]+\)|\(\?[^\)]+\)(?=$)|\)(?=\?)|\((\s)?|\?|<\/?span>|\\{1,2}[a-z]|\+ed|\+|\)/g,'').replace(/\\b/)
    }
    
}