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
  WhenpageLoad()
},0);

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
        errormsg('No Stats Found')
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

        var datatoAdd = '<li class ="teams not-active-list" ><p>' + date + '</p><p>' + season + '</p><p>' + pfirstName + '</p><p>' + plastName + '</p><p>' + position + '</p><p>' + team + '</p><p>' + assist + '</p><p>' + blocks + '</p><p>' + def_rebound + '</p><p>' + three_pgpercent + '</p><p>' + three_pgpattempt + '</p><p>' + three_pgpmade + '</p><p>' + field_goalpercent + '</p><p>' + field_goalattempted + '</p><p>' + field_goalmade + '</p><p>' + free_throwpercent + '</p><p>' + free_throwattemt + '</p><p>' + free_throwmade + '</p><p>' + points + '</p><p>' + rebound + '</p><p>' + steal + '</p></li>'
        var statsHtml = document.querySelector('.stats-data')
        statsHtml.innerHTML += datatoAdd;
      }
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

//Search Stats Display
//This function will trigger on submit
var inputSubmit = document.querySelector("input[name='name-submit1']")
inputSubmit.addEventListener('click',searchPlayer)

function searchPlayer(e) {
  e.preventDefault();
  var inputValue = document.querySelector("input[name='player-input1']").value
  if (inputValue.length == 0) {
    errormsg('Please Enter a Player Name')
    return false
  }
    var season_sValue = document.querySelector("select[name='seasons-1']");
  var seasonsVal = season_sValue.options[season_sValue.selectedIndex].text;
  if (seasonsVal === 'Select Seasons') {
    errormsg('Please Select a Season') 
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
        errormsg('Player did not play that season')
        return false
      }
      console.log(object2)
      var playerId = object2['data'][0]['id'];
      console.log(playerId);
      data1(playerId) //passing player id to another function
    } else {
      errormsg('Wrong Input')
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
    errormsg('Please Select a Season') 
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
        errormsg('No player of That name Exist')
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
      errormsg('Wrong Input')
    }
  }
  //4 send request
  xhr.send()
}




// load more results on click of loadMore button
function loadMore() {
      var elementList = [...document.querySelectorAll('.stats-data .teams')];
        for (let i = 0; i <= 4; i++) {
            if (elementList[i]) {
                elementList[i].classList.remove('not-active-list');
            }
        }

    var loadmore = document.querySelector('#fetchBtn');
    loadmore.classList.remove('not-active-list');
    var currentItems = 5;
    loadmore.addEventListener('click', (e) => {
        var elementList = [...document.querySelectorAll('.stats-data .teams')];
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


var seasonValidation = document.querySelector('select[name = "seasons-1"]')

seasonValidation.onblur = function(e){
//season  validation
  var season2 = e.target
  if (season2.value == 'Default') {
    var html = 'Please select a season'
    var popUpPara = document.querySelector('.pop-up2')
    popUpPara.innerText=html
    season2.focus()
    return false
  }
 var popUpPara = document.querySelector('.pop-up2')
  if (popUpPara.childNodes.length) {
    popUpPara.innerHTML=''
  }
}


//valid input checking
var playerInputListen = document.querySelector("input[name='player-input1']")

playerInputListen.onblur = function (e){
//valid input checking
  console.log('fired')
  var playerInput = e.target
  if (playerInput.value.length === 0){
    var html = 'Name should not be empty'
    var inputPara = document.querySelector('.pop-up3')
    inputPara.innerText= html
    playerInput.focus()
    return false
  }
  var letters = /\b[^\d\W]+\b/
  
    if (!playerInput.value.match(letters)) 
   {
    var html = 'Name should not  contain numbers'
    var inputPara = document.querySelector('.pop-up3')
    inputPara.childNodes.length != 0  ? inputPara.innerHTML ='' : (inputPara.innerText += html)
    playerInput.focus()
    return false
  }

  if(playerInput.value.match(letters)) 
  {
    var inputPara = document.querySelector('.pop-up3')
    if (inputPara.childNodes.length !=0) {
      inputPara.innerHTML =''
    }
    return true
  }
}
