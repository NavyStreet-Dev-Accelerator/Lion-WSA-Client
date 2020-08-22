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

//Here we fetch the reponse from our dynamic API endpoint and log it to the console.
const fetchMatchingOccurences = async (e) => {
  //Preventing the default form behavior
  e.preventDefault();
  //Creating our dynamicAPIendpoint
  const dynamicAPIEndpoint = await buildAPIEndPoint();

  //Attemtpting the fetch request
  try {
    const response = await fetch(dynamicAPIEndpoint);

    const data = await response.json();

    console.log(data);

    //catching and logging any errors
  } catch (error) {
    console.log(error);
  }
};

//Event Listeners

//Attaching an onsumbit listener to the form which then invokes our fetch function.
webScraperForm.addEventListener("submit", fetchMatchingOccurences);
