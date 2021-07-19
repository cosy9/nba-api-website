//hamburger menu
var navbar = document.querySelector('.nav-list')
var ham = document.querySelector('.hambur')
// toggles hamburger menu in and out when clicking on the hamburger
function toggleHamburger() {
  navbar.classList.toggle('display')
  ham.classList.toggle('active')
}
ham.addEventListener('click', toggleHamburger)
// toggle when clicking on links
var menuLinks = document.querySelectorAll('.nav-list li')
menuLinks.forEach(function (menuLink) {
  menuLink.addEventListener('click', toggleHamburger)
})

//Teams Display 
//This function will run once the page has been loaded
function homePage() {
  const data = null;
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
      var object = JSON.parse(this.responseText)
      for (var i = 0; i < object['data'].length; i++) {
        var teamf_Name = "Team :" + object['data'][i]['full_name']
        var team_Name = "Name :" + object['data'][i]['name']
        var team_city = "City : " + object['data'][i]['city']
        var team_conf = "Conference :" + object['data'][i]['conference']
        var team_divison = "Division : " + object['data'][i]['division']
        var datatoAdd = '<li class="team-list"><p>' + teamf_Name + '</p><p>' + team_Name + '</p><p>' + team_city + '</p><p>' + team_conf + '</p><p>' + team_divison + '</p></li>'
        var teamHtml = document.querySelector('.team-data')//selecting unorderlist
        teamHtml.innerHTML += datatoAdd; //adding data to unorder list
      }
    }
  });
  xhr.open("GET", "https://free-nba.p.rapidapi.com/teams?page=0");
  xhr.setRequestHeader("x-rapidapi-key", "0041d2d4d9mshf15e63a22dd6fe5p106cd3jsn33e1a3bfaef5");
  xhr.setRequestHeader("x-rapidapi-host", "free-nba.p.rapidapi.com");
  xhr.send(data);
}

//team search
//searching for specific team with respect to team name if team name matches then display is eqaul to 'block' else 'none'
var inputData = document.querySelector("input[type='text']")

inputData.addEventListener('input', showSpecificData)
function showSpecificData() {
  var inputValue = document.querySelector("input[type='text']")
  var inputval = inputValue.value.toLowerCase();
  var listItem = document.getElementsByClassName('team-list');
  Array.from(listItem).forEach(function (element) {
    var listTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
    if (listTxt.includes(inputval)) {
      element.classList.remove('list-not-active')
      element.classList.add('list-active')
    } else {
      element.classList.remove('list-active')
      element.classList.add('list-not-active')
    }
  })
}

