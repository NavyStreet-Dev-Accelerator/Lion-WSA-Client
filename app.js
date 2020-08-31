//Grabbing the URL and Query inputs
const url = document.querySelector("#url");
const query = document.querySelector("#query");
//Grabbing the form
const webScraperForm = document.querySelector("#web-scraper-form");
//Grabbing the results container
const resultsContainer = document.querySelector("#results-container");

//Captcha Check
const captchaCheck = () => {
  //grabbing the response from Google Captcha
  const response = grecaptcha.getResponse();
  if (response.length == 0) {
    return false;
  }
  grecaptcha.reset();
  return true;
};

// Here we build and return the dynamic API endpoint
// by grabbing the values of the URL and Query input field
const buildAPIEndPoint = () => {
  return `https://4kgxi9mav4.execute-api.us-west-1.amazonaws.com/default/LionScraper?url=${url.value}&query=${query.value}`;
};

//Here we fetch the reponse from our dynamic API endpoint and log it to the console.
const fetchMatchingOccurences = async (e) => {
  e.preventDefault();
  const captchaSuccess = captchaCheck();

  if (!captchaSuccess) {
    return false;
  }

  //Creating our dynamicAPIendpoint
  const dynamicAPIEndpoint = await buildAPIEndPoint();

  ////Displays a simple loading text in the results container to let the user know their request is being processed.
  resultsContainer.innerHTML = `
  <div class="result">
    <p>Loading...</p>
  </div>
  `;

  //Attempting the fetch request
  try {
    const response = await fetch(dynamicAPIEndpoint);

    //Checks for bad responses
    if (response.status >= 400) {
      resultsContainer.innerHTML = `
  <div class="result">
    <p>Invalid URL</p>
  </div>
  `;
      return;
    }

    const data = await response.json();

    //logging the data that come sback from our lambda function
    console.log(data);

    //setting the innerHTML of the results container with our data
    resultsContainer.innerHTML = `
    <div class="result">
    <p>Your query "${query.value}" appears ${data} time${
      data === 1 ? "" : "s"
    } on <a href="${url.value}" target="_blank">${url.value}</a>.
    </div>
    `;

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
