# misty-hri
Skills for misty's HRI functionality

# Description
The main that is developed is skills/eye_contact/eyecontact.js; The demo_raise_event skill serves as a demo for triggering Misty's eye_contact behaviour using an external event.
[Functionality](#Functionality)


The eye_contact skill took plenty of inspiration from the misty-community:
https://github.com/MistySampleSkills/mistySeesYou
https://github.com/MistySampleSkills/LooksAtFace
https://github.com/MistySampleSkills/lookAround
https://github.com/CPsridharCP/MistySkills

## Functionality
Misty looks for a face, when it sees a face it changes the eyes to "Joy" and tracks the 
face by moving its head. If it can no longer see a face, it will revert to its normal 
state and keep looking for a face. After some time it will stop doing so and go to sleep
by changing the eyes again.

The chest led changes colour accordingly:
- Off: misty sleeps or eye contact is off
- White: misty is awake and looks for a face
- Green: face detected and tracking face

When asleep, Misty can wake up again by
- touching its head
- ~~- calling "Hey Misty!"~~  (This is currently disabled)
- raising a user event named "eye_contact" and event data

event_data = {"guardian_data"   : "state"};
 
, where "state" can be "off", "sleep", or "normal".

## To do:
- Decide whether to implement face recognition
- Decide whether Misty should turn towards sound https://github.com/MistySampleSkills/TurnToSound



