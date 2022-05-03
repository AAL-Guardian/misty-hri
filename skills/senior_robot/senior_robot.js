misty.RegisterUserEvent("how_are_you", true);

// TimerEvent callback
function _how_are_you(data) {

    // INPUT PARAMETERS
    data = JSON.parse(data.guardian_data);
    misty.MoveHead(0, 40, 0, 100);
}


misty.RegisterUserEvent("yes", true);

// TimerEvent callback
function _yes(data) {

    // INPUT PARAMETERS
    data = JSON.parse(data.guardian_data);
    misty.MoveHead(-40, 0, 0, 100);
    misty.MoveHead(26, 0, 0, 100);
    misty.MoveHead(0, 0, 0, 100);
    misty.DisplayImage("e_Amazement.jpg");
    misty.Pause(3000);
    misty.DisplayImage("e_DefaultContent.jpg");

} 


misty.RegisterUserEvent("medication", true);
function _medication(data) {

    // INPUT PARAMETERS
    misty.MoveHead(0, 0, 0, 100);
    misty.DisplayImage("e_Amazement.jpg");
    misty.Pause(3000);
    misty.DisplayImage("e_DefaultContent.jpg");

} 
misty.RegisterUserEvent("yesmedication", true);

// TimerEvent callback
function _yesmedication(data) {

    // INPUT PARAMETERS
    data = JSON.parse(data.guardian_data);
    misty.MoveHead(-40, 0, 0, 100);
    misty.MoveHead(26, 0, 0, 100);
    misty.MoveHead(0, 0, 0, 100);
    misty.DisplayImage("e_Joy.jpg");
    misty.Pause(3000);
    misty.DisplayImage("e_DefaultContent.jpg");

} 

misty.RegisterUserEvent("meal", true);
function _meal(data) {

    misty.DisplayImage("e_EcstacyStarryEyed.jpg");
    misty.Pause(3000);
    misty.DisplayImage("e_DefaultContent.jpg");
    misty.MoveArmsDegrees(-90, -90, 100, 100);
    misty.Pause(4000)
    misty.MoveArmsDegrees(0, 0, 100, 100);
} 

misty.RegisterUserEvent("sleep", true);
function _sleep(data) {

    
    misty.DisplayImage("e_DefaultContent.jpg");
    misty.MoveArmsDegrees(0, -90, 100, 100);
    misty.Pause(4000)
    misty.MoveArmsDegrees(-90, -90, 100, 100);
    misty.Pause(4000)
    misty.MoveArmsDegrees(0, 0, 100, 100);
} 


misty.RegisterUserEvent("activitysuggestion", true);
function _activitysuggestion(data) {

    
    misty.DisplayImage("e_DefaultContent.jpg");

    misty.MoveArmsDegrees(-90, -90, 100, 100);
    misty.Pause(4000)
    misty.MoveArmsDegrees(0, 0, 100, 100);
} 
