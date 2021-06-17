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

function WhenpageLoad() {
  //1 initialize AJAX
  var xhr = new XMLHttpRequest()
  //2 open object
  //inputting  user data and player id to get all stats
  xhr.open('GET', 'https://www.balldontlie.io/api/v1/stats?per_page=100&page=0', true)
  //3 onload object
  xhr.onload = function () {
    if (this.status === 200) {
      var object2 = JSON.parse(this.responseText)
      if (object2['data'].length === 0) {
        errormsg()
        return false
      }
      var statsHtml = document.querySelector('.stats-data')
      statsHtml.innerHTML = ''
      console.log(object2)
      for (var i = 0; i < object2['data'].length; i++) {
        var date = "Date : " + object2['data'][i]['game']['date'].substring(0, 10)
        var season = "Season : " + object2['data'][i]['game']['season']
        var pfirstName = "First Name : " + object2['data'][i]['player']['first_name']
        var plastName = "Last Name : " + object2['data'][i]['player']['last_name']
        var positionVerify = object2['data'][i]['player']['position']
        var posVerified = positionVerify.length == 0 ? 'Not Available' : positionVerify
        var position = "Position :" + posVerified
        var team = "Team : " + object2['data'][i]['team']['full_name']
        var assistverify = object2['data'][i]['ast'] == null ? 'Not Available' : object2['data'][i]['ast']
        var assist = "Assist : " + assistverify
        var blocksverify = object2['data'][i]['blk'] == null ? 'Not Available' : object2['data'][i]['blk']
        var blocks = "Blocks : " + blocksverify
        var def_verify = object2['data'][i]['dreb'] == null ? 'Not Available' : object2['data'][i]['dreb']
        var def_rebound = "Defencive Rebound : " + def_verify
        var threeprecent_verify = object2['data'][i]['fg3_pct'] == null ? 'Not Available' : object2['data'][i]['fg3_pct']
        var three_pgpercent = "3 point Percentage (%) : " + threeprecent_verify
        var threeattemt_verify = object2['data'][i]['fg3a'] == null ? 'Not Available' : object2['data'][i]['fg3a']
        var three_pgpattempt = "3 point Attempts : " + threeattemt_verify
        var threemade_verify = object2['data'][i]['fg3m'] == null ? 'Not Available' : object2['data'][i]['fg3m']
        var three_pgpmade = "3 point Made : " + threemade_verify
        var goalpercent_verify = object2['data'][i]['fg_pct'] == null ? 'Not Available' : object2['data'][i]['fg_pct']
        var field_goalpercent = "Field Goal Percentage (%) : " + goalpercent_verify
        var goalattempt_verify = object2['data'][i]['fga'] == null ? 'Not Available' : object2['data'][i]['fga']
        var field_goalattempted = "Field Goal Attempts : " + goalattempt_verify
        var goalmade_verify = object2['data'][i]['fgm'] == null ? 'Not Available' : object2['data'][i]['fgm']
        var field_goalmade = "Field Goal Made : " + goalmade_verify
        var freethrowpercent_verify = object2['data'][i]['ft_pct'] == null ? 'Not Available' : object2['data'][i]['ft_pct']
        var free_throwpercent = "Free Throw Percentage (%)  : " + freethrowpercent_verify
        var freethrowattempt_verify = object2['data'][i]['fta'] == null ? 'Not Available' : object2['data'][i]['fta']
        var free_throwattemt = "Free Throw Attempt  : " + freethrowattempt_verify
        var freethrowmade_verify = object2['data'][i]['ftm'] == null ? 'Not Available' : object2['data'][i]['ftm']
        var free_throwmade = "Free Throw Made  : " + freethrowmade_verify
        var points_verify = object2['data'][i]['pts'] == null ? 'Not Available' : object2['data'][i]['pts']
        var points = "Points by Player  : " + points_verify
        var rebound_verify = object2['data'][i]['reb'] == null ? 'Not Available' : object2['data'][i]['reb']
        var rebound = "Rebound: " + rebound_verify
        var steal_verify = object2['data'][i]['stl'] == null ? 'Not Available' : object2['data'][i]['stl']
        var steal = "Steal : " + steal_verify

        var datatoAdd = '<li><p>' + date + '</p><p>' + season + '</p><p>' + pfirstName + '</p><p>' + plastName + '</p><p>' + position + '</p><p>' + team + '</p><p>' + assist + '</p><p>' + blocks + '</p><p>' + def_rebound + '</p><p>' + three_pgpercent + '</p><p>' + three_pgpattempt + '</p><p>' + three_pgpmade + '</p><p>' + field_goalpercent + '</p><p>' + field_goalattempted + '</p><p>' + field_goalmade + '</p><p>' + free_throwpercent + '</p><p>' + free_throwattemt + '</p><p>' + free_throwmade + '</p><p>' + points + '</p><p>' + rebound + '</p><p>' + steal + '</p></li>'
        var statsHtml = document.querySelector('.stats-data')
        statsHtml.innerHTML += datatoAdd;
      }
    } else {
      errormsg()
    }
  }
  //4 send request
  xhr.send()
}

//Search Stats Display
//This function will trigger on submit
function searchPlayer() {

  var inputValue = document.querySelector("input[name='player-input1']").value
  if (inputValue.length == 0) {
    errormsg()
    return false
  }
  //1 initialize AJAX
  var xhr = new XMLHttpRequest()
  //2 open object
  xhr.open('GET', 'https://www.balldontlie.io/api/v1/players?search=' + inputValue + '', true) //getting player id by inputting name
  console.log(inputValue);
  xhr.onload = function () {
    if (this.status === 200) {
      var object2 = JSON.parse(this.responseText)
      if (object2['data'].length === 0) {
        errormsg()
        return false
      }
      console.log(object2)
      var playerId = object2['data'][0]['id'];
      console.log(playerId);
      data1(playerId) //passing player id to another function
    } else {
      errormsg()
    }
  }
  //5 send request
  xhr.send()
}

// this function will accept player id and search stats with respect to that id.
function data1(id) {
  var season_sValue = document.querySelector("select[name='seasons-1']");
  var seasonsVal = season_sValue.options[season_sValue.selectedIndex].text;
  if (seasonsVal === 'Select Seasons') {
    errormsg() 
    return false
  }
  //1 initialize AJAX
  var xhr = new XMLHttpRequest()
  //2 open object
  //inputting  user data and player id to get all stats
  xhr.open('GET', 'https://www.balldontlie.io/api/v1/season_averages?season=' + seasonsVal + '&player_ids[]=' + id + '', true)
  //3 onload object
  xhr.onload = function () {
    if (this.status === 200) {
      var object2 = JSON.parse(this.responseText)
      if (object2['data'].length === 0) {
        errormsg2()
        return false
      }
      var statsHtml = document.querySelector('.stats-data')
      statsHtml.innerHTML = ''
      console.log(object2)
      for (var i = 0; i < object2['data'].length; i++) {
        var season = "Season : " + object2['data'][i]['season']
        var games = "Games Played : " + object2['data'][i]['games_played']
        var assistverify = object2['data'][i]['ast'] == null ? 'Not Available' : object2['data'][i]['ast']
        var assist = "Assist : " + assistverify
        var blocksverify = object2['data'][i]['blk'] == null ? 'Not Available' : object2['data'][i]['blk']
        var blocks = "Blocks : " + blocksverify
        var def_verify = object2['data'][i]['dreb'] == null ? 'Not Available' : object2['data'][i]['dreb']
        var def_rebound = "Defencive Rebound : " + def_verify
        var threeprecent_verify = object2['data'][i]['fg3_pct'] == null ? 'Not Available' : object2['data'][i]['fg3_pct']
        var three_pgpercent = "3 point Percentage (%) : " + threeprecent_verify
        var threeattemt_verify = object2['data'][i]['fg3a'] == null ? 'Not Available' : object2['data'][i]['fg3a']
        var three_pgpattempt = "3 point Attempts : " + threeattemt_verify
        var threemade_verify = object2['data'][i]['fg3m'] == null ? 'Not Available' : object2['data'][i]['fg3m']
        var three_pgpmade = "3 point Made : " + threemade_verify
        var goalpercent_verify = object2['data'][i]['fg_pct'] == null ? 'Not Available' : object2['data'][i]['fg_pct']
        var field_goalpercent = "Field Goal Percentage (%) : " + goalpercent_verify
        var goalattempt_verify = object2['data'][i]['fga'] == null ? 'Not Available' : object2['data'][i]['fga']
        var field_goalattempted = "Field Goal Attempts : " + goalattempt_verify
        var goalmade_verify = object2['data'][i]['fgm'] == null ? 'Not Available' : object2['data'][i]['fgm']
        var field_goalmade = "Field Goal Made : " + goalmade_verify
        var freethrowpercent_verify = object2['data'][i]['ft_pct'] == null ? 'Not Available' : object2['data'][i]['ft_pct']
        var free_throwpercent = "Free Throw Percentage (%)  : " + freethrowpercent_verify
        var freethrowattempt_verify = object2['data'][i]['fta'] == null ? 'Not Available' : object2['data'][i]['fta']
        var free_throwattemt = "Free Throw Attempt  : " + freethrowattempt_verify
        var freethrowmade_verify = object2['data'][i]['ftm'] == null ? 'Not Available' : object2['data'][i]['ftm']
        var free_throwmade = "Free Throw Made  : " + freethrowmade_verify
        var points_verify = object2['data'][i]['pts'] == null ? 'Not Available' : object2['data'][i]['pts']
        var points = "Points by Player  : " + points_verify
        var rebound_verify = object2['data'][i]['reb'] == null ? 'Not Available' : object2['data'][i]['reb']
        var rebound = "Rebound: " + rebound_verify
        var steal_verify = object2['data'][i]['stl'] == null ? 'Not Available' : object2['data'][i]['stl']
        var steal = "Steal : " + steal_verify

        var datatoAdd = '<li><p>' + season + '</p><p>' + games + '</p><p>' + assist + '</p><p>' + blocks + '</p><p>' + def_rebound + '</p><p>' + three_pgpercent + '</p><p>' + three_pgpattempt + '</p><p>' + three_pgpmade + '</p><p>' + field_goalpercent + '</p><p>' + field_goalattempted + '</p><p>' + field_goalmade + '</p><p>' + free_throwpercent + '</p><p>' + free_throwattemt + '</p><p>' + free_throwmade + '</p><p>' + points + '</p><p>' + rebound + '</p><p>' + steal + '</p></li>'
        var statsHtml = document.querySelector('.stats-data')
        statsHtml.innerHTML += datatoAdd;
      }
    } else {
      errormsg()
    }
  }
  //4 send request
  xhr.send()
}

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

//season  validation
function Season_valid() {
  var season2 = document.querySelector('select[name = "seasons-1"]')
  if (season2.value == 'Default') {
    var html = '<p class="pop-up2">Please select a season</p>'
    var Label = document.querySelector('label[for ="seasons-1"]')
    var p = document.querySelector('.pop-up2')
    Label.contains(p) ? '' : (Label.innerHTML += html)
    season2.focus()
    return false
  }
  var p = document.querySelector('.pop-up2')
  var contains = document.querySelector('label[for ="seasons-1"]').contains(p)
  if (contains) {
    p.remove()
  }
}

//valid input checking
function player_validation1() {
  var PlayerName = document.querySelector("input[name='player-input1']")
  var pname_len = PlayerName.value.length
  if (pname_len == 0) {
    var html = '<p class="pop-up3">Name should not be empty </p>'
    var inputDiv = document.querySelector('.player-input1')
    var p = document.querySelector('.pop-up3')
    inputDiv.contains(p) ? '' : (inputDiv.innerHTML += html)
    PlayerName.focus()
    return false
  }
  var p = document.querySelector('.pop-up3')
  var contains = document.querySelector('.player-input1').contains(p)
  if (contains) {
    p.remove()
  }
  var letters = /\b[^\d\W]+\b/
  if (PlayerName.value.match(letters)) {
    var p = document.querySelector('.pop-up3')
    var contains = document.querySelector('.player-input1').contains(p)
    if (contains) {
      p.remove()
    }
  } else if (!PlayerName.value.match(letters)) {
    var html = '<p class="pop-up3">Name should not  contain numbers </p>'
    var inputDiv = document.querySelector('.player-input1')
    var p = document.querySelector('.pop-up3')
    inputDiv.contains(p) ? '' : (inputDiv.innerHTML += html)
    PlayerName.focus()
    return false
  }
}
