Team 17
Jesse Halbach
Kevin Pham
Alex Tieman

CSS3 Features used:
canvas: rounded corners
website header: text shadow
background: linear gradient
footer text color: utilized hsl()

We didn't implement any JavaScript libraries.

Implementing the ability to move with both keys for us to move diagonally
took a significant amount of time. There was a bug in chrome where it wouldn't
always recognize key up events. We fixed this by clearing movement in the
opposite direction when a key is pressed. It was also a bear to debug why the
coordinates of where we click were significantly offset. We learned that the
canvas' pixels were being stretched and we were actually getting coordinates
from the screen itself. Collision detection between zombies, zombies and the
player, and zombies and bullets took the most time to implement for this project.

We believe we deserve 100 points because the game is functional and entertaining.
We spent a significant amount of time on it and also learned a bunch from it.
