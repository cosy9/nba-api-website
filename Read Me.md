#Player Page

player page when loaded will display players cards 
which contains basic info of the players i.e name,team name etc.

When searched for a specific player it will display specific players
card and if there are multiple players it will show multiple player. card

If there is an error while inputting text a para tag will appear below
mentioning the error.




#Team Page

Team page loads all the team once the page is loaded
Search bar takes text as input and matches the inputted value 
with the team name and changes its property to block or none 
via css styling.



#Game Page

Game page loads the game once the pages is loaded.
It highlights the winner of the game also in light green
background.

There is also a option to search by date 
or
Search by Seasons

** note : Sometime on search by date if there is no game on that date ERROR WRONG INPUT POP UP will appear**



#Stats Page

Stats page will load a function which shows stats of some random players.

there are 3 options
1)Select start season 
2)Select end season 
3)Player Name


When all 3 inputted correctly then stats of specific player will apper.cf
This happens via 2 funtions namely

1)HomePage function
2) Data function

when home page loads it will grab player's ID by name.

Which is then inputted onto Data function as argument and then the 
Data function fetchs player stats for range of seasons for that specific 
player. 


