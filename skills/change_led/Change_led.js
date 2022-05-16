misty.RegisterUserEvent("change_led", true);
misty.Debug("Ho inziato la skill")
function _change_led() {
    misty.ChangeLED(155,244,4); 
    misty.DisplayImage("e_Joy2.jpg",4);
    misty.Pause(2000);
    misty.ChangeLED(0,0,225); 
    misty.DisplayImage("e_DefaultContent.jpg",4);
    
}
