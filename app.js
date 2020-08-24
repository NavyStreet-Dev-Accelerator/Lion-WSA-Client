//Grabbing the URL and Query inputs
const url = document.querySelector("#url");
const query = document.querySelector("#query");
//Grabbing the form
const webScraperForm = document.querySelector("#web-scraper-form");
//Grabbing the results container
const resultsContainer = document.querySelector("#results-container");

// Here we build and return the dynamic API endpoint
// by grabbing the values of the URL and Query input field
const buildAPIEndPoint = () => {
  return `https://4kgxi9mav4.execute-api.us-west-1.amazonaws.com/default/LionScraper?url=${url.value}&query=${query.value}`;
};

//Here we fetch the reponse from our dynamic API endpoint and log it to the console.
const fetchMatchingOccurences = async (e) => {
  //Preventing the default form behavior
  e.preventDefault();
  //Creating our dynamicAPIendpoint
  const dynamicAPIEndpoint = await buildAPIEndPoint();

  ////Displays a simple loading text in the results container to let the user know their request is being processed.
  resultsContainer.innerHTML = `<p>Loading...</p>`;

  //Attemtpting the fetch request
  try {
    const response = await fetch(dynamicAPIEndpoint);
    const data = await response.json();

    //logging the data that come sback from our lambda function
    console.log(data);

    //setting the innerHTML of the results container with our data
    resultsContainer.innerHTML = `<p>Your query "${
      query.value
    }" appears ${data} time${data === 1 ? "" : "s"} on <a href="${
      url.value
    }" target="_blank">${url.value}</a>.`;

    //Clearing out the form
    url.value = "";
    query.value = "";

    //catching and logging any errors
  } catch (error) {
    console.log(error);
  }
};

//Event Listeners

//Attaching an onsumbit listener to the form which then invokes our fetch function.
webScraperForm.addEventListener("submit", fetchMatchingOccurences);
