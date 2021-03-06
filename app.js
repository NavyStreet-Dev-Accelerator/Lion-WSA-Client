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

//Here we fetch the reponse from our dynamic API endpoint and log it to the console.
const fetchMatchingOccurences = async (e) => {
  e.preventDefault();
  const captchaSuccess = captchaCheck();

  if (!captchaSuccess) {
    return false;
  }

  //Creating our dynamicAPIendpoint
  const dynamicAPIEndpoint = `https://4kgxi9mav4.execute-api.us-west-1.amazonaws.com/default/LionScraper?url=${url.value}&query=${query.value}`;

  ////Displays a simple loading text in the results container to let the user know their request is being processed.
  resultsContainer.innerHTML = `<p>Scanning...</p>`;

  //Attempting the fetch request
  try {
    const response = await fetch(dynamicAPIEndpoint);

    //Checks for bad responses
    if (response.status >= 400) {
      resultsContainer.innerHTML =
        '<p>This web page is: <span class="invalid">invalid!</span></p><p>Please make sure the URL is correct.</p>';
      return;
    }

    const data = await response.json();

    //logging the data that come sback from our lambda function
    console.log(data);

    //setting the innerHTML of the results container with our data
    resultsContainer.innerHTML = `<p>This web page is: <span class="valid">valid!</span></p>
    <p>Your phrase "${query.value}" was found ${data} time${
      data === 1 ? "" : "s"
    }.`;

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
