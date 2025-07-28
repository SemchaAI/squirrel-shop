import LinkifyIt from "linkify-it";

const linkify = new LinkifyIt();

export const containsLink = (text: string) => linkify.test(text);
export const findLinks = (text: string) => linkify.match(text);
