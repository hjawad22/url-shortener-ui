export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
  .then(res => {
    if (!res.ok) {
      throw new Error("Oops! We seem to be having some technical issues, please try again later!");
    }
    return res.json();
  })
}
