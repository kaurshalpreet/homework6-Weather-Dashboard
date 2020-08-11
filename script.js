var APIKey = "d3e71252fa567040aa1498a9d77f6b77";
var searchButton = $(".searchButton");
var searchInputBox = $(".searchInputBox");

var cityNameEl = $(".cityName");
var currentDateEl = $(".currentDate");
var weatherIconEl = $(".weatherIcon");
var searchHistoryEl = $(".searchHistory");

var temperatureEl = $(".temperature");
var humidityEl = $(".humidity");
var windSpeedEl = $(".windSpeed");
var uvIndexEl = $(".uvIndex");
var cardRow = $(".card-row");

var citiesArray = [];

var dateDisplay = moment().format('MM/D/YYYY');

searchButton.on("click", function(event){
  event.preventDefault();
  var cityName = searchInputBox.val();

  if (cityName  === "") {
    alert("You must enter a city");
    return;
  }


  citiesArray.push(cityName);
  searchInputBox.value = "";

  storeCities();

  renderCities();
   
  function storeCities() {
    localStorage.setItem("searchHistory", JSON.stringify(citiesArray));
  }

  function renderCities() {
    searchHistoryEl.empty();
    var searchHistoryArr = JSON.parse(localStorage.getItem("searchHistory"));
    for (var i = 0; i < citiesArray.length; i++) {
      var cities = citiesArray[i];
  
      var li = $("<li>").attr("class", "historyEntry");
      li.text(cities);
      searchHistoryEl.prepend(li);

    }
  }
//   if (JSON.parse(localStorage.getItem("searchHistory")) === null) {
//     console.log("searchHistory not found")
// }else{
//     console.log("searchHistory loaded into searchHistoryArr");
//     renderSearchHistory();
// }
  
  
//   localStorage.setItem("searchHistory", JSON.stringify(citiesArray));

//   function renderSearchHistory(cityName) {
//     searchHistoryEl.empty();
//     var citiesArray = JSON.parse(localStorage.getItem("searchHistory"));
//     for (let i = 0; i < citiesArray.length; i++) {
//         // We put newListItem in loop because otherwise the text of the li element changes, rather than making a new element for each array index
//         let newListItem = $("<li>").attr("class", "historyEntry");
//         newListItem.text(citiesArray[i]);
//         searchHistoryEl.prepend(newListItem);
//     }
// }

  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey +"&units=imperial";
  $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
      console.log(response);
      cityNameEl.text(response.name);
      var temp = response.main.temp;
      var humidity = response.main.humidity;
      var windSpeed = response.wind.speed;
      var lat = response.coord.lat;
      var lon = response.coord.lon;
      var weatherIcon = response.weather[0].icon;

      var renderedWeatherIcon = "https:///openweathermap.org/img/w/" + weatherIcon + ".png";

      currentDateEl.text("(" + dateDisplay + ")");
      weatherIconEl.attr("src", renderedWeatherIcon);
      temperatureEl.text("Temperature: " + temp +" °F");
      humidityEl.text("Humidity: " + humidity + "%");
      windSpeedEl.text("Wind Speed: " + windSpeed + "MPH");

      /**********************************************************/

    
      var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;
      $.ajax({
        url: queryURL,
        method: "GET"
       }).then(function(response) {
        var uvIndex = response.value;
        uvIndexEl.text("UV Index: " + uvIndex);

        if ( uvIndex >=8 ) {
          uvIndexEl.html('UV Index: '+'<span style= "background-color: red; color: white; border-radius: 5px; padding: 5px;"> '+uvIndex+' </span>');
        }

        if ( uvIndex >=6 && uvIndex <=7 ) {
          uvIndexEl.html('UV Index: '+'<span style= "background-color: orange; color: white; border-radius: 5px;"> '+uvIndex+' </span>');
        }

        if ( uvIndex >=3 && uvIndex <=5 ) {
          uvIndexEl.html('UV Index: '+'<span style= "background-color: yellow; color: white; border-radius: 5px;"> '+uvIndex+' </span>');
        }

        if ( uvIndex >=0 && uvIndex <=2 ) {
          uvIndexEl.html('UV Index: '+'<span style= "background-color: green; color: white; border-radius: 5px;"> '+uvIndex+' </span>');
        }

      });

    });

        cardRow.empty();
        var queryUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey + "&units=imperial";
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response) {
          console.log(response)

          for (var i = 0; i < 5; i++) {
            var date = response.list[i].dt_txt.substring(0, 10);
            var icon = response.list[i].weather[0].icon;
            var temp = response.list[i].main.temp;
            var humidity = response.list[i].main.humidity;

            var fiveDivs = $("<div>").attr("class", "five-day-card");
            var cardDate = $("<h3>").attr("class", "card-text");
            var cardIcon = $("<img>").attr("class", "weatherIcon");
            var cardTemp = $("<p>").attr("class", "card-text");
            var cardHumidity = $("<p>").attr("class", "card-text");
            var weatherIcon = "https:///openweathermap.org/img/w/" + icon + ".png";
        
            cardRow.append(fiveDivs);
            cardDate.text(date);
            cardIcon.attr("src", weatherIcon);
            cardTemp.text("Temp: " + temp + " °F");
            cardHumidity.text("Humidity: " +  humidity + "%");
            fiveDivs.append(cardDate, cardIcon, cardTemp, cardHumidity);
          }

        });

        

       








  
});



  
