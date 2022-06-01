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
    misty.SetBlinking(true); // turn blinking on/off

}


misty.RegisterUserEvent("emotion_medication", true);
function _emotion_medication(data) {

    // INPUT PARAMETERS
    misty.MoveHead(0, 0, 0, 100);
    misty.DisplayImage("e_Amazement.jpg");
    misty.Pause(3000);
    misty.DisplayImage("e_DefaultContent.jpg");
    misty.SetBlinking(true); // turn blinking on/off

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
    misty.SetBlinking(true); // turn blinking on/off
    misty.Pause(3000);
    misty.DisplayImage("e_DefaultContent.jpg");
    misty.SetBlinking(true); // turn blinking on/off

}

misty.RegisterUserEvent("emotion_meal", true);
function _emotion_meal(data) {

    misty.DisplayImage("e_EcstacyStarryEyed.jpg");
    misty.SetBlinking(true); // turn blinking on/off
    misty.Pause(3000);
    misty.DisplayImage("e_DefaultContent.jpg");
    misty.SetBlinking(true); // turn blinking on/off
    misty.MoveArmsDegrees(-90, -90, 100, 100);
    misty.Pause(4000)
    misty.MoveArmsDegrees(0, 0, 100, 100);
}

misty.RegisterUserEvent("emotion_sleep", true);
function _emotion_sleep(data) {

    misty.DisplayImage("e_Sleeping.jpg");
    misty.SetBlinking(false); // turn blinking on/off
    misty.MoveArmsDegrees(0, -90, 100, 100);
    misty.Pause(4000)
    misty.MoveArmsDegrees(-90, -90, 100, 100);
    misty.Pause(4000)
    misty.MoveArmsDegrees(0, 0, 100, 100);
}


misty.RegisterUserEvent("emotion_activitysuggestion", true);
function _emotion_activitysuggestion(data) {

    misty.DisplayImage("e_DefaultContent.jpg");
    misty.SetBlinking(true); // turn blinking on/off
    misty.MoveArmsDegrees(-90, -90, 100, 100);
    misty.Pause(4000)
    misty.MoveArmsDegrees(0, 0, 100, 100);
}

misty.RegisterUserEvent("emotion_dormi", true);

// TimerEvent callback
function _emotion_dormi(data) {
    misty.DisplayImage("e_SleepingZZZ.jpg");
    misty.SetBlinking(false); // turn blinking on/off
    misty.MoveHead(40, 0, 0, 100);

}


misty.RegisterUserEvent("emotion_sveglia", true);

// TimerEvent callback
function _emotion_sveglia(data) {
    misty.DisplayImage("e_DefaultContent.jpg");
    misty.SetBlinking(true); // turn blinking on/off
    misty.MoveHead(0, 0, 0, 100);

}


misty.RegisterUserEvent("emotion_happy", true);

// TimerEvent callback
function _emotion_happy(data) {
    misty.DisplayImage("e_Joy2.jpg");
    misty.Pause(4000)
    misty.DisplayImage("e_DefaultContent.jpg");
    misty.SetBlinking(true); // turn blinking on/off
}


misty.RegisterUserEvent("emotion_sad", true);

// TimerEvent callback
function _emotion_happy(data) {
    misty.DisplayImage("e_Terror.jpg");
    misty.Pause(4000)
    misty.DisplayImage("e_DefaultContent.jpg");
    misty.SetBlinking(true); // turn blinking on/off
}

misty.RegisterUserEvent("emotion_ecstacy", true);

// TimerEvent callback
function _emotion_ecstacy(data) {
    misty.DisplayImage("e_EcstacyHilarious.jpg");
    misty.Pause(4000)
    misty.DisplayImage("e_DefaultContent.jpg");
    misty.SetBlinking(true); // turn blinking on/off
}

misty.RegisterUserEvent("emotion_sadness", true);

// TimerEvent callback
function _emotion_sadness(data) {
    misty.DisplayImage("e_Sadness.jpg");
    misty.Pause(4000)
    misty.DisplayImage("e_DefaultContent.jpg");
    misty.SetBlinking(true); // turn blinking on/off
}

misty.RegisterUserEvent("behavior_wake_up",true);
function _behavior_wake_up(data)
{
    misty.DisplayImage("e_DefaultContent.jpg"); // Change eyes
    misty.SetBlinking(true); // turn blinking on/off

    misty.MoveArmDegrees("left", 90, 45); // Left arm fully down
    misty.Pause(50);
    misty.MoveArmDegrees("right", 90, 45); // Right arm fully down
    misty.Pause(50); // Pause for 3 seconds
    misty.MoveArmDegrees("right", -45, 45); // Right arm fully up
    misty.Pause(1000); // Pause with arm up for 5 seconds (wave!)
    misty.MoveArmDegrees("right", 90, 45); // Right arm fully down
}

misty.RegisterUserEvent("behavior_go_to_standby",true);
function _behavior_go_to_standby(data)
{
    misty.DisplayImage("e_Sleep2.jpg"); // Change eyes
    misty.SetBlinking(false); // turn blinking on/off
}

misty.RegisterUserEvent("emotion_enjoy",true);
function _emotion_enjoy(data)
{
    misty.DisplayImage("e_Admiration.jpg"); // Change eyes
    misty.Pause(3000);
    misty.DisplayImage("e_DefaultContent.jpg"); // Change eyes
    misty.SetBlinking(true); // turn blinking on/off
}
