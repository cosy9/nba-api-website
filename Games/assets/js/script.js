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

//Game Display
//this function will run once the page has loaded
function homePage() {
  var data = null;
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      var object = JSON.parse(this.responseText)
      console.log(object);
      for (var i = 0; i < object['data'].length; i++) {
        var match_date = "Date : " + object['data'][i]['date'].substring(0, 10);
        var home_team = "Home Team : " + object['data'][i]['home_team']['full_name']
        var home_city = "City : " + object['data'][i]['home_team']['city']
        var homeTeam_score = "Home Team Score :" + object['data'][i]['home_team_score']
        var season = "Season : " + object['data'][i]['season']
        var visitor_team = "Visitor Team : " + object['data'][i]['visitor_team']['full_name']
        var visitor_city = "Visitor City : " + object['data'][i]['visitor_team']['city']
        var visitorTeam_score = "Visitor Team Score : " + object['data'][i]['visitor_team_score']
        var datatoAdd = '<li class ="teams"><p>' + match_date + '</p><p>' + season + '</p><p>' + home_team + '</p><p>' + home_city + '</p><p>' + homeTeam_score + '</p><p>Vs</p><p>' + visitor_team + '</p><p>' + visitor_city + '</p><p>' + visitorTeam_score + '</p></li>'
        var gameHtml = document.querySelector('.game-data')
        gameHtml.innerHTML += datatoAdd;//Adding data to unorder list
      }
    }
  });
  xhr.open("GET", "https://free-nba.p.rapidapi.com/games?per_page=100&page=0");
  xhr.setRequestHeader("x-rapidapi-key", "0041d2d4d9mshf15e63a22dd6fe5p106cd3jsn33e1a3bfaef5");
  xhr.setRequestHeader("x-rapidapi-host", "free-nba.p.rapidapi.com");
  xhr.send(data);
}

// checking the winner of game to apply different style to the winner team
function winner() {
  var Teams = document.getElementsByClassName('teams');
  Array.from(Teams).forEach(function (element) {
    var para1a = element.getElementsByTagName("p")[2];
    var para1b = element.getElementsByTagName("p")[3];
    var para1c = element.getElementsByTagName("p")[4];
    var para2a = element.getElementsByTagName("p")[6];
    var para2b = element.getElementsByTagName("p")[7];
    var para2c = element.getElementsByTagName("p")[8];
    var team_1_Score = element.getElementsByTagName("p")[4].innerText.substring(17, 21);
    var team_2_Score = element.getElementsByTagName("p")[8].innerText.substring(21, 24);
    var team1int = parseInt(team_1_Score)
    var team2int = parseInt(team_2_Score)
    if (team1int > team2int) {
      para1a.style.background = '#8fd0a6';
      para1b.style.background = '#8fd0a6';
      para1c.style.cssText = ' background:#8fd0a6; font-weight: 600;color: #2f2f2f;';
    } else {
      para2a.style.background = '#8fd0a6';
      para2b.style.background = '#8fd0a6';
      para2c.style.cssText = ' background:#8fd0a6; font-weight: 600;color: #2f2f2f;';
    }
  })
}

//waiting for sometime to appy the styling as api has been called
setTimeout(() => {
  winner()
}, 3000);


//games search by date
var button = document.querySelector("input[name='date-input']")
button.addEventListener('click', searchGames)
function searchGames() {
  var dateValue = document.querySelector("input[type='date']").value
  if (dateValue.length === 0) {
    errormsg()
    return false
  }
  //1 initialize AJAX
  var xhr = new XMLHttpRequest()
  //2 open object
  xhr.open('GET', 'https://www.balldontlie.io/api/v1/games?dates[]=' + dateValue + '', true)
  console.log(dateValue);
  //3 on load
  xhr.onload = function () {
    if (this.status === 200) {
      var object2 = JSON.parse(this.responseText)
      if (object2['data'].length === 0) {
        errormsg2()
        return false
      }
      var gameHtml = document.querySelector('.game-data')
      gameHtml.innerHTML = '' //clearing the unorderlist to populate it with the new data
      console.log(object2)
      for (var i = 0; i < object2['data'].length; i++) {
        var match_date1 = "Date : " + object2['data'][i]['date'].substring(0, 10);
        var home_team1 = "Home Team : " + object2['data'][i]['home_team']['full_name']
        var home_city1 = "City : " + object2['data'][i]['home_team']['city']
        var homeTeam_score1 = "Home Team Score :" + object2['data'][i]['home_team_score']
        var season1 = "Season : " + object2['data'][i]['season']
        var visitor_team1 = "Visitor Team : " + object2['data'][i]['visitor_team']['full_name']
        var visitor_city1 = "Visitor City : " + object2['data'][i]['visitor_team']['city']
        var visitorTeam_score1 = "Visitor Team Score : " + object2['data'][i]['visitor_team_score']
        var datatoAdd1 = '<li class ="teams"><p>' + match_date1 + '</p><p>' + season1 + '</p><p>' + home_team1 + '</p><p>' + home_city1 + '</p><p>' + homeTeam_score1 + '</p><p>Vs</p><p>' + visitor_team1 + '</p><p>' + visitor_city1 + '</p><p>' + visitorTeam_score1 + '</p></li>'
        var gameHtml = document.querySelector('.game-data')
        gameHtml.innerHTML += datatoAdd1; //adding new data to unorderlist
      }
      //waiting for sometime to appy the styling as api has been called
      setTimeout(() => {
        winner()
      }, 3000);
    }
    else { errormsg() }
  }
  //4 send request
  xhr.send()
}

//games search by Season
var button = document.querySelector("input[name='seasons-input']")
button.addEventListener('click', searchSeason)

function searchSeason() {
  var seasonValue = document.querySelector("select[name='seasons']");
  var seasonVal = seasonValue.options[seasonValue.selectedIndex].text;
  if (seasonVal.length === 0) {
    errormsg()
    return false
  }

  //1 initialize AJAX
  var xhr = new XMLHttpRequest()
  //2 open object
  xhr.open('GET', 'https://www.balldontlie.io/api/v1/games?seasons[]=' + seasonVal + '', true)
  console.log(seasonValue);
  //3 onload object
  xhr.onload = function () {
    if (this.status === 200) {
      var object3 = JSON.parse(this.responseText)
      if (object3['data'].length === 0) {
        errormsg3()
        return false
      }
      var gameHtml = document.querySelector('.game-data')
      gameHtml.innerHTML = '' //clearing the unorderlist to populate it with the new data
      console.log(object3)
      for (var i = 0; i < object3['data'].length; i++) {
        var match_date2 = "Date : " + object3['data'][i]['date'].substring(0, 10);
        var home_team2 = "Home Team : " + object3['data'][i]['home_team']['full_name']
        var home_city2 = "City : " + object3['data'][i]['home_team']['city']
        var homeTeam_score2 = "Home Team Score :" + object3['data'][i]['home_team_score']
        var season2 = "Season : " + object3['data'][i]['season']
        var visitor_team2 = "Visitor Team : " + object3['data'][i]['visitor_team']['full_name']
        var visitor_city2 = "Visitor City : " + object3['data'][i]['visitor_team']['city']
        var visitorTeam_score2 = "Visitor Team Score : " + object3['data'][i]['visitor_team_score']
        var datatoAdd2 = '<li class ="teams"><p>' + match_date2 + '</p><p>' + season2 + '</p><p>' + home_team2 + '</p><p>' + home_city2 + '</p><p>' + homeTeam_score2 + '</p><p>Vs</p><p>' + visitor_team2 + '</p><p>' + visitor_city2 + '</p><p>' + visitorTeam_score2 + '</p></li>'
        var gameHtml = document.querySelector('.game-data')
        gameHtml.innerHTML += datatoAdd2; //adding new data to unorderlist
      }
      //waiting for sometime to appy the styling as api has been called
      setTimeout(() => {
        winner()
      }, 3000);
    }
    else { errormsg() }
  }
  //4 send request
  xhr.send()
}

//if any error occured
function errormsg() {
  // Get the modal
  modal.style.display = 'block'
}
var modal = document.querySelector('.modal')
// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0]
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none'
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (element) {
  if (element.target == modal) {
    modal.style.display = 'none'
  }
}

//if any error occured in date
function errormsg2() {
  // Get the modal
  modal1.style.display = 'block'
}
var modal1 = document.querySelector('.modal1')
// Get the <span> element that closes the modal
var span1 = document.getElementsByClassName('close1')[0]
// When the user clicks on <span> (x), close the modal
span1.onclick = function () {
  modal1.style.display = 'none'
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (element) {
  if (element.target == modal1) {
    modal1.style.display = 'none'
  }
}

//if any error occured in seasons
function errormsg3() {
  // Get the modal
  modal2.style.display = 'block'
}
var modal2 = document.querySelector('.modal2')
// Get the <span> element that closes the modal
var span2 = document.getElementsByClassName('close2')[0]
// When the user clicks on <span> (x), close the modal
span2.onclick = function () {
  modal2.style.display = 'none'
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (element) {
  if (element.target == modal2) {
    modal2.style.display = 'none'
  }
}

//season validation
function Season_valid() {
  var seasons = document.querySelector('select[name = "seasons"]')
  if (seasons.value == 'Default') {
    var html = '<p class="pop-up">Please select a season</p>'
    var Label = document.querySelector('label[for ="seasons"]')
    var p = document.querySelector('.pop-up')
    Label.contains(p) ? '' : (Label.innerHTML += html)
    seasons.focus()
    return false
  }
  var p = document.querySelector('.pop-up')
  var contains = document.querySelector('label[for ="seasons"]').contains(p)
  if (contains) {
    p.remove()
  }
}

//date validation
function date_valid() {
  var date = document.querySelector('input[name = "date"]')
  if (date.value.length == 0) {
    var html = '<p class="pop-up2">Please enter proper date</p>'
    var Label = document.querySelector('label[for ="date"]')
    var p = document.querySelector('.pop-up2')
    Label.contains(p) ? '' : (Label.innerHTML += html)
    date.focus()
    return false
  }
  var p = document.querySelector('.pop-up2')
  var contains = document.querySelector('label[for ="date"]').contains(p)
  if (contains) {
    p.remove()
  }
}