# misty-hri
Skills for misty's HRI functionality

# Description
Currently, there is only one skill that is actively developed:
skills/eyecontact.js

The current skill took plenty of inspiration from the misty-community:
https://github.com/MistySampleSkills/mistySeesYou
https://github.com/MistySampleSkills/LooksAtFace
https://github.com/MistySampleSkills/lookAround
https://github.com/CPsridharCP/MistySkills

## Functionality
Misty looks for a face, when it sees a face it changes the eyes to "Joy" and tracks the 
face by moving its head. If it can no longer see a face, it will revert to its normal 
state and keep looking for a face. After some time it will stop doing so and go to sleep
by changing the eyes again.
Misty can wake up again by touching its head or an external event.

## To do:
- Listen and react to external events
- listen and react to "Hey, Misty"
- Decide whether to implement face recognition
- Decide whether Misty should turn towards sound https://github.com/MistySampleSkills/TurnToSound



