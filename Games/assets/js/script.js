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
var loadDiv = document.querySelector('.fetch')
loadDiv.classList.add('not-active-list')

setTimeout(function () {
  homePage()
},0);
//Game Display
//this function will run once the page has loaded
function homePage() {
  var data = null
  var xhr = new XMLHttpRequest()
  xhr.withCredentials = true
  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === this.DONE) {
      var object = JSON.parse(this.responseText)
      console.log(object)
      for (var i = 0; i < object['data'].length; i++) {
        var match_date = 'Date : ' + object['data'][i]['date'].substring(0, 10)
        var home_team =
          'Home Team : ' + object['data'][i]['home_team']['full_name']
        var home_city = 'City : ' + object['data'][i]['home_team']['city']
        var homeTeam_score =
          'Home Team Score :' + object['data'][i]['home_team_score']
        var season = 'Season : ' + object['data'][i]['season']
        var visitor_team =
          'Visitor Team : ' + object['data'][i]['visitor_team']['full_name']
        var visitor_city =
          'Visitor City : ' + object['data'][i]['visitor_team']['city']
        var visitorTeam_score =
          'Visitor Team Score : ' + object['data'][i]['visitor_team_score']
        var datatoAdd =
          '<li class ="teams not-active-list"><p>' +
          match_date +
          '</p><p>' +
          season +
          '</p><p>' +
          home_team +
          '</p><p>' +
          home_city +
          '</p><p>' +
          homeTeam_score +
          '</p><p>Vs</p><p>' +
          visitor_team +
          '</p><p>' +
          visitor_city +
          '</p><p>' +
          visitorTeam_score +
          '</p></li>'
        var gameHtml = document.querySelector('.game-data')
        gameHtml.innerHTML += datatoAdd //Adding data to unorder list
        var loadDiv = document.querySelector('.fetch')
          loadDiv.classList.remove('not-active-list')
      loadMore()
      }
    }
  })
  xhr.open('GET', 'https://free-nba.p.rapidapi.com/games?per_page=100&page=0')
  xhr.setRequestHeader(
    'x-rapidapi-key',
    '0041d2d4d9mshf15e63a22dd6fe5p106cd3jsn33e1a3bfaef5'
  )
  xhr.setRequestHeader('x-rapidapi-host', 'free-nba.p.rapidapi.com')
  xhr.send(data)
}

// checking the winner of game to apply different style to the winner team
function winner() {
  var Teams = document.getElementsByClassName('teams')
  Array.from(Teams).forEach(function (element) {
    var para1a = element.getElementsByTagName('p')[2]
    var para1b = element.getElementsByTagName('p')[3]
    var para1c = element.getElementsByTagName('p')[4]
    var para2a = element.getElementsByTagName('p')[6]
    var para2b = element.getElementsByTagName('p')[7]
    var para2c = element.getElementsByTagName('p')[8]
    var team_1_Score = element
      .getElementsByTagName('p')[4]
      .innerText.substring(17, 21)
    var team_2_Score = element
      .getElementsByTagName('p')[8]
      .innerText.substring(21, 24)
    var team1int = parseInt(team_1_Score)
    var team2int = parseInt(team_2_Score)
    if (team1int > team2int) {
      para1a.classList.add('winner-team')
      para1b.classList.add('winner-team')
      para1c.classList.add('winner-team-score')
    } else {
      para2a.classList.add('winner-team')
      para2b.classList.add('winner-team')
      para2c.classList.add('winner-team-score')
    }
  })
}

//waiting for sometime to appy the styling as api has been called
setTimeout(() => {
  winner()
}, 3000)

//games search by date
var button = document.querySelector("input[name='date-input']")
button.addEventListener('click', searchGames)
function searchGames(e) {
  e.preventDefault();
  var dateValue = document.querySelector("input[type='date']").value
  if (dateValue.length === 0) {
    errormsg('Please Enter a Date')
    return false
  }
  //1 initialize AJAX
  var xhr = new XMLHttpRequest()
  //2 open object
  xhr.open(
    'GET',
    'https://www.balldontlie.io/api/v1/games?dates[]=' + dateValue + '',
    true
  )
  console.log(dateValue)
  //3 on load
  xhr.onload = function () {
    if (this.status === 200) {
      var object2 = JSON.parse(this.responseText)
      if (object2['data'].length === 0) {
        errormsg('No Games were Played')
        return false
      }
      var gameHtml = document.querySelector('.game-data')
      gameHtml.innerHTML = '' //clearing the unorderlist to populate it with the new data
      console.log(object2)
      for (var i = 0; i < object2['data'].length; i++) {
        var match_date1 =
          'Date : ' + object2['data'][i]['date'].substring(0, 10)
        var home_team1 =
          'Home Team : ' + object2['data'][i]['home_team']['full_name']
        var home_city1 = 'City : ' + object2['data'][i]['home_team']['city']
        var homeTeam_score1 =
          'Home Team Score :' + object2['data'][i]['home_team_score']
        var season1 = 'Season : ' + object2['data'][i]['season']
        var visitor_team1 =
          'Visitor Team : ' + object2['data'][i]['visitor_team']['full_name']
        var visitor_city1 =
          'Visitor City : ' + object2['data'][i]['visitor_team']['city']
        var visitorTeam_score1 =
          'Visitor Team Score : ' + object2['data'][i]['visitor_team_score']
        var datatoAdd1 =
          '<li class ="teams not-active-list"><p>' +
          match_date1 +
          '</p><p>' +
          season1 +
          '</p><p>' +
          home_team1 +
          '</p><p>' +
          home_city1 +
          '</p><p>' +
          homeTeam_score1 +
          '</p><p>Vs</p><p>' +
          visitor_team1 +
          '</p><p>' +
          visitor_city1 +
          '</p><p>' +
          visitorTeam_score1 +
          '</p></li>'
        var gameHtml = document.querySelector('.game-data')
        gameHtml.innerHTML += datatoAdd1 //adding new data to unorderlist
      }
      //waiting for sometime to appy the styling as api has been called
      setTimeout(() => {
        winner()
      }, 3000)
      var loadDiv = document.querySelector('.fetch')
          loadDiv.classList.remove('not-active-list')
      loadMore()
    } else {
      errormsg('Wrong Input')
    }
  }
  //4 send request
  xhr.send()
}

//games search by Season
var button = document.querySelector("input[name='seasons-input']")
button.addEventListener('click', searchSeason)

function searchSeason(e) {
  e.preventDefault()
  var seasonValue = document.querySelector("select[name='seasons']")
  var seasonVal = seasonValue.options[seasonValue.selectedIndex].text
  if (seasonVal.length === 0) {
    errormsg('Please Select a Season')
    return false
  }

  //1 initialize AJAX
  var xhr = new XMLHttpRequest()
  //2 open object
  xhr.open(
    'GET',
    'https://www.balldontlie.io/api/v1/games?seasons[]=' + seasonVal + '',
    true
  )
  console.log(seasonValue)
  //3 onload object
  xhr.onload = function () {
    if (this.status === 200) {
      var object3 = JSON.parse(this.responseText)
      if (object3['data'].length === 0) {
        errormsg('No Games were Played that season')
        return false
      }
      var gameHtml = document.querySelector('.game-data')
      gameHtml.innerHTML = '' //clearing the unorderlist to populate it with the new data
      console.log(object3)
      for (var i = 0; i < object3['data'].length; i++) {
        var match_date2 =
          'Date : ' + object3['data'][i]['date'].substring(0, 10)
        var home_team2 =
          'Home Team : ' + object3['data'][i]['home_team']['full_name']
        var home_city2 = 'City : ' + object3['data'][i]['home_team']['city']
        var homeTeam_score2 =
          'Home Team Score :' + object3['data'][i]['home_team_score']
        var season2 = 'Season : ' + object3['data'][i]['season']
        var visitor_team2 =
          'Visitor Team : ' + object3['data'][i]['visitor_team']['full_name']
        var visitor_city2 =
          'Visitor City : ' + object3['data'][i]['visitor_team']['city']
        var visitorTeam_score2 =
          'Visitor Team Score : ' + object3['data'][i]['visitor_team_score']
        var datatoAdd2 =
          '<li class ="teams not-active-list"><p>' +
          match_date2 +
          '</p><p>' +
          season2 +
          '</p><p>' +
          home_team2 +
          '</p><p>' +
          home_city2 +
          '</p><p>' +
          homeTeam_score2 +
          '</p><p>Vs</p><p>' +
          visitor_team2 +
          '</p><p>' +
          visitor_city2 +
          '</p><p>' +
          visitorTeam_score2 +
          '</p></li>'
        var gameHtml = document.querySelector('.game-data')
        gameHtml.innerHTML += datatoAdd2 //adding new data to unorderlist
      }
      //waiting for sometime to appy the styling as api has been called
      setTimeout(() => {
        winner()
      }, 3000)
      var loadDiv = document.querySelector('.fetch')
          loadDiv.classList.remove('not-active-list')
      loadMore()
    } else {
      errormsg('Wrong Input')
    }
  }
  //4 send request
  xhr.send()
}



// load more results on click of loadMore button
function loadMore() {
      var elementList = [...document.querySelectorAll('.game-data .teams')];
        for (let i = 0; i <= 4; i++) {
            if (elementList[i]) {
                elementList[i].classList.remove('not-active-list');
            }
        }

    var loadmore = document.querySelector('#fetchBtn');
    loadmore.classList.remove('not-active-list');
    var currentItems = 5;
    loadmore.addEventListener('click', (e) => {
        var elementList = [...document.querySelectorAll('.game-data .teams')];
        for (let i = currentItems; i <= currentItems + 4; i++) {
            if (elementList[i]) {
                elementList[i].classList.remove('not-active-list');
            }
        }
        currentItems += 4;
        // Load more button will be hidden after list fully loaded
        if (currentItems >= elementList.length) {
            e.target.classList.add('not-active-list');
            currentItems = 5;
        }
    })
}


//if any error occured
function errormsg(errMsg) {
  // Get the modal
  var paraClass = document.querySelector('.pop')
  paraClass.innerHTML += ''
  paraClass.innerText = errMsg
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


var seasonValidation = document.querySelector('select[name = "seasons"]')

seasonValidation.onblur = function (e){
//season validation
  var seasons = e.target
  if (seasons.value == 'Default') {
    var html = 'Please select a season'
    var popUpPara = document.querySelector('.pop-up')
    popUpPara.innerText=html
    seasons.focus()
    return false
  }
  var popUpPara = document.querySelector('.pop-up')
  if (popUpPara.childNodes.length) {
    popUpPara.innerHTML=''
  }
}

var dateValidation = document.querySelector('input[name = "date"]')

dateValidation.onblur = function (e){
//date validation
  var date = e.target
  if (date.value.length == 0) {
    var html = 'Please enter proper date'
    var popUpPara2 = document.querySelector('.pop-up2')
    popUpPara2.innerText=html
    date.focus()
    return false
  }
  var popUpPara2 = document.querySelector('.pop-up2')
  if (popUpPara2.childNodes.length) {
    popUpPara2.innerHTML=''
  }
}
