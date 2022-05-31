misty.RegisterUserEvent("emotion_how_are_you", true);

// TimerEvent callback
function _emotion_how_are_you(data) {

    // INPUT PARAMETERS
    data = JSON.parse(data.guardian_data);
    misty.MoveHead(0, 40, 0, 100);
    misty.Pause(3000);
    misty.MoveHead(0, 0, 0, 100);
}


misty.RegisterUserEvent("emotion_yes", true);

// TimerEvent callback
function _emotion_yes(data) {

    // INPUT PARAMETER
    data = JSON.parse(data.guardian_data);
    misty.MoveHead(-40, 0, 0, 100);
    misty.MoveHead(26, 0, 0, 100);
    misty.MoveHead(0, 0, 0, 100);
    misty.DisplayImage("e_Amazement.jpg");
    misty.Pause(3000);
    misty.DisplayImage("e_DefaultContent.jpg");

} 


misty.RegisterUserEvent("emotion_medication", true);
function _emotion_medication(data) {

    // INPUT PARAMETERS
    misty.MoveHead(0, 0, 0, 100);
    misty.DisplayImage("e_Amazement.jpg");
    misty.Pause(3000);
    misty.DisplayImage("e_DefaultContent.jpg");

} 
misty.RegisterUserEvent("emotion_yesmedication", true);

// TimerEvent callback
function _emotion_yesmedication(data) {

    // INPUT PARAMETERS
    data = JSON.parse(data.guardian_data);
    misty.MoveHead(-40, 0, 0, 100);
    misty.MoveHead(26, 0, 0, 100);
    misty.MoveHead(0, 0, 0, 100);
    misty.DisplayImage("e_Joy.jpg");
    misty.Pause(3000);
    misty.DisplayImage("e_DefaultContent.jpg");

} 

misty.RegisterUserEvent("emotion_meal", true);
function _emotion_meal(data) {

    misty.DisplayImage("e_EcstacyStarryEyed.jpg");
    misty.Pause(3000);
    misty.DisplayImage("e_DefaultContent.jpg");
    misty.MoveArmsDegrees(-90, -90, 100, 100);
    misty.Pause(4000)
    misty.MoveArmsDegrees(0, 0, 100, 100);
} 

misty.RegisterUserEvent("emotion_sleep", true);
function _emotion_sleep(data) {

    
    misty.DisplayImage("e_DefaultContent.jpg");
    misty.MoveArmsDegrees(0, -90, 100, 100);
    misty.Pause(4000)
    misty.MoveArmsDegrees(-90, -90, 100, 100);
    misty.Pause(4000)
    misty.MoveArmsDegrees(0, 0, 100, 100);
} 


misty.RegisterUserEvent("emotion_activitysuggestion", true);
function _emotion_activitysuggestion(data) {

    
    misty.DisplayImage("e_DefaultContent.jpg");

    misty.MoveArmsDegrees(-90, -90, 100, 100);
    misty.Pause(4000)
    misty.MoveArmsDegrees(0, 0, 100, 100);
} 

misty.RegisterUserEvent("emotion_dormi", true);

// TimerEvent callback
function _emotion_dormi(data) {
    misty.DisplayImage("e_SleepingZZZ.jpg");
    misty.MoveHead(40, 0, 0, 100);
 
}


misty.RegisterUserEvent("emotion_sveglia", true);

// TimerEvent callback
function _emotion_sveglia(data) {
    misty.DisplayImage("e_DefaultContent.jpg");
    misty.MoveHead(0, 0, 0, 100);
 
}


misty.RegisterUserEvent("emotion_happy", true);

// TimerEvent callback
function _emotion_happy(data) {
    misty.DisplayImage("e_Joy2.jpg");
    misty.Pause(4000)
    misty.DisplayImage("e_DefaultContent.jpg");
}


misty.RegisterUserEvent("emotion_sad", true);

// TimerEvent callback
function _emotion_happy(data) {
    misty.DisplayImage("e_Terror.jpg");
    misty.Pause(4000)
    misty.DisplayImage("e_DefaultContent.jpg");
}

misty.RegisterUserEvent("emotion_ecstacy", true);

// TimerEvent callback
function _emotion_ecstacy(data) {
    misty.DisplayImage("e_EcstacyHilarious.jpg");
    misty.Pause(4000)
    misty.DisplayImage("e_DefaultContent.jpg");
}

misty.RegisterUserEvent("emotion_sadness", true);

// TimerEvent callback
function _emotion_sadness(data) {
    misty.DisplayImage("e_Sadness.jpg");
    misty.Pause(4000)
    misty.DisplayImage("e_DefaultContent.jpg");
}