export default (text) => {
  const regEx = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;
  return (text.match(regEx) || []).map((char) => char.toLowerCase()).join('-');
};
