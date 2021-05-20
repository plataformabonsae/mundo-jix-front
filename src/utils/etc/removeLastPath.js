export const removeLastPath = (the_url) => {
  const the_arr = the_url.split("/");
  the_arr.pop();
  return the_arr.join("/");
};
