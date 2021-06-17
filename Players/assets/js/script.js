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

//Player Display
//This function will run once the page is loaded.
function homePage() {
  var data = null;
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      var object = JSON.parse(this.responseText)
      for (var i = 0; i < object['data'].length; i++) {
        var first_Name = "First Name :" + object['data'][i]['first_name']
        var last_Name = "Last Name :" + object['data'][i]['last_name']
        var positionVerify = object['data'][i]['position'].length == 0 ? 'Not Available' : object['data'][i]['position']
        var position = "Position :" + positionVerify
        var city = "City :" + object['data'][i]['team']['city']
        var team_Name = "Team :" + object['data'][i]['team']['full_name']
        var height_feetverify = object['data'][i]['height_feet'] == null ? 'Not Available' : object['data'][i]['height_feet'] + ' ft'
        var height_feet = "Height in feet : " + height_feetverify
        var height_inchesverify = object['data'][i]['height_inches'] == null ? 'Not Available' : object['data'][i]['height_inches'] + ' In'
        var height_inches = "Height in inches : " + height_inchesverify
        var weightverify = object['data'][i]['weight_pounds'] == null ? 'Not Available' : object['data'][i]['weight_pounds'] + ' Lbs'
        var weight = "Height in feet : " + weightverify
        var datatoAdd = '<li><p>' + first_Name + '</p><p>' + last_Name + '</p><p>' + position + '</p><p>' + city + '</p><p>' + height_feet + '</p><p>' + height_inches + '</p><p>' + weight + '</p><p>' + team_Name + '</p></li>'
        var playerHtml = document.querySelector('.player-data') //selecting unorder list to add data
        playerHtml.innerHTML += datatoAdd;//adding data
      }
    }
  });
  xhr.open("GET", "https://free-nba.p.rapidapi.com/players?per_page=100&page=0");
  xhr.setRequestHeader("x-rapidapi-key", "0041d2d4d9mshf15e63a22dd6fe5p106cd3jsn33e1a3bfaef5");
  xhr.setRequestHeader("x-rapidapi-host", "free-nba.p.rapidapi.com");
  xhr.send(data);
}

//player search

var button = document.querySelector("input[type='button']")

function searchPlayers() {
  var inputValue = document.querySelector("input[type='text']").value
  if (inputValue.length === 0) {
    errormsg()
    return false
  }
  //1 initialize AJAX
  var xhr = new XMLHttpRequest()
  //2 open object
  xhr.open('GET', 'https://www.balldontlie.io/api/v1/players?search=' + inputValue + '', true)
  //3 on load object
  xhr.onload = function () {
    if (this.status === 200) {
      var object2 = JSON.parse(this.responseText)
      if (object2['data'].length === 0) {
        errormsg1()
        return false
      }
      console.log(object2)
      var playerHtml = document.querySelector('.player-data')
      playerHtml.innerHTML = '' //clearing unorder list before adding new data.
      for (var i = 0; i < object2['data'].length; i++) {
        var first_Name1 = "First Name :" + object2['data'][i]['first_name']
        var last_Name1 = "Last Name :" + object2['data'][i]['last_name']
        var posVerified = object2['data'][i]['position'].length == 0 ? 'Not Available' : object2['data'][i]['position']
        var position1 = "Position :" + posVerified
        var city1 = "City :" + object2['data'][i]['team']['city']
        var height_feetverify1 = object2['data'][i]['height_feet'] == null ? 'Not Available' : object2['data'][i]['height_feet'] + ' ft'
        var height_feet1 = "Height in feet : " + height_feetverify1
        var height_inchesverify1 = object2['data'][i]['height_inches'] == null ? 'Not Available' : object2['data'][i]['height_inches'] + ' In'
        var height_inches1 = "Height in inches : " + height_inchesverify1
        var weightverify1 = object2['data'][i]['weight_pounds'] == null ? 'Not Available' : object2['data'][i]['weight_pounds'] + ' Lbs'
        var weight1 = "Height in feet : " + weightverify1
        var team_Name1 = "Team :" + object2['data'][i]['team']['full_name']
        var datatoAdd1 = '<li><p>' + first_Name1 + '</p><p>' + last_Name1 + '</p><p>' + position1 + '</p><p>' + city1 + '</p><p>' + height_feet1 + '</p><p>' + height_inches1 + '</p><p>' + weight1 + '</p><p>' + team_Name1 + '</p></li>'
        playerHtml.innerHTML += datatoAdd1; //Adding new data
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


//error for wrong input
function errormsg1() {
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

//valid input checking
function player_validation() {
  var PlayerName = document.querySelector("input[type='text']")
  var pname_len = PlayerName.value.length
  if (pname_len == 0) {
    var html = '<p class="pop-up">Name should not be empty </p>'
    var inputDiv = document.querySelector('.player-input')
    var p = document.querySelector('.pop-up')
    inputDiv.contains(p) ? '' : (inputDiv.innerHTML += html)
    PlayerName.focus()
    return false
  }
  var p = document.querySelector('.pop-up')
  var contains = document.querySelector('.player-input').contains(p)
  if (contains) {
    p.remove()
  }
  var letters = /\b[^\d\W]+\b/
  if (PlayerName.value.match(letters)) {
    var p = document.querySelector('.pop-up')
    var contains = document.querySelector('.player-input').contains(p)
    if (contains) {
      p.remove()
    }
  } else if (!PlayerName.value.match(letters)) {
    var html = '<p class="pop-up">Name should not  contain numbers </p>'
    var inputDiv = document.querySelector('.player-input')
    var p = document.querySelector('.pop-up')
    inputDiv.contains(p) ? '' : (inputDiv.innerHTML += html)
    PlayerName.focus()
    return false
  }
}
