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
    misty.SetBlinking(true); // turn blinking on/off


} 


misty.RegisterUserEvent("medication", true);
function _medication(data) {

    // INPUT PARAMETERS
    misty.MoveHead(0, 0, 0, 100);
    misty.DisplayImage("e_Amazement.jpg");
    misty.Pause(3000);
    misty.DisplayImage("e_DefaultContent.jpg");
    misty.SetBlinking(true); // turn blinking on/off

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
    misty.SetBlinking(true); // turn blinking on/off
    misty.Pause(3000);
    misty.DisplayImage("e_DefaultContent.jpg");

} 

misty.RegisterUserEvent("meal", true);
function _meal(data) {

    misty.DisplayImage("e_EcstacyStarryEyed.jpg");
    misty.SetBlinking(true); // turn blinking on/off
    misty.Pause(3000);
    misty.DisplayImage("e_DefaultContent.jpg");
    misty.MoveArmsDegrees(-90, -90, 100, 100);
    misty.Pause(4000)
    misty.MoveArmsDegrees(0, 0, 100, 100);
} 

misty.RegisterUserEvent("sleep", true);
function _sleep(data) {

    
    misty.DisplayImage("e_Sleeping.jpg");
    misty.SetBlinking(false); // turn blinking on/off
    misty.MoveArmsDegrees(0, -90, 100, 100);
    misty.Pause(4000)
    misty.MoveArmsDegrees(-90, -90, 100, 100);
    misty.Pause(4000)
    misty.MoveArmsDegrees(0, 0, 100, 100);
} 


misty.RegisterUserEvent("activitysuggestion", true);
function _activitysuggestion(data) {

    
    misty.DisplayImage("e_DefaultContent.jpg");
    misty.SetBlinking(true); // turn blinking on/off

    misty.MoveArmsDegrees(-90, -90, 100, 100);
    misty.Pause(4000)
    misty.MoveArmsDegrees(0, 0, 100, 100);
} 

misty.RegisterUserEvent("wake_up",true);
function _wake_up(data)
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

misty.RegisterUserEvent("go_to_standby",true);
function _go_to_sleep(data)
{
    misty.DisplayImage("e_Sleep2.jpg"); // Change eyes
    misty.SetBlinking(false); // turn blinking on/off
}

misty.RegisterUserEvent("enjoy",true);
function _enjoy(data)
{
    misty.DisplayImage("e_Pride.jpg"); // Change eyes
    misty.Pause(5000);
    misty.DisplayImage("e_DefaultContent.jpg"); // Change eyes
    misty.SetBlinking(true); // turn blinking on/off    
}
