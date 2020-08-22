//Grabbing the URL and Query inputs
const url = document.querySelector("#url");
const query = document.querySelector("#query");
//Grabbing the form
const webScraperForm = document.querySelector("#web-scraper-form");

// Here we build and return the dynamic API endpoint
// by grabbing the values of the URL and Query inout field
const buildAPIEndPoint = () => {
  return `https://4kgxi9mav4.execute-api.us-west-1.amazonaws.com/default/LionScraper?url=${url.value}&query=${query.value}`;
};
