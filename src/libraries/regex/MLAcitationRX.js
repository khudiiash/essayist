/* eslint-disable no-useless-escape */
export const MLAcitationGlobal = /(?!(?:\(((qtd\.\sin )?(?:[A-Z][a-z]+|[A-Z][a-z]+\-[A-Z][a-z]+)(\set\sal\.)?(\s\band\b\s(?:[A-Z][a-z]+|[A-Z][a-z]+\-[A-Z][a-z]+))?(\s\d+(\-\d+)?)?(;\s)?){1,4}\)|\(\d+(;\sch\.\s\d+)?\)|\((?:"|“)(\w+\s?){1,5}(?:"|”)(\s\d+)?\)))\((?![A-Z]{2,})[^\)]+\)/g



export const MLAcitationInline = /^(?!(?:\(((qtd\.\sin )?(?:[A-Z][a-z]+|[A-Z][a-z]+\-[A-Z][a-z]+)(\set\sal\.)?(\s\band\b\s(?:[A-Z][a-z]+|[A-Z][a-z]+\-[A-Z][a-z]+))?(\s\d+(\-\d+)?)?(;\s)?){1,4}\)|\(\d+(;\sch\.\s\d+)?\)|\((?:"|“)(\w+\s?){1,5}(?:"|”)(\s\d+)?\)))\((?![A-Z]{2,})[^\)]+\)$/

