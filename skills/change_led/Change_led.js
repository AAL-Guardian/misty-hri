misty.RegisterUserEvent("change_led", true);
misty.Debug("Ho inziato la skill")
function _change_led() {
    misty.ChangeLED(155,244,4); 
    misty.DisplayImage("e_Joy2.jpg",4); 
}