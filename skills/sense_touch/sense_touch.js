// Registers touch skill of Misty and sends events to the internal bus and listens to events from the cloud

misty.Debug("Sense touch skill has started.");

_touch_active = true;

startSkill();

function message(status, sensor_name, is_pressed)
{
    return JSON.stringify({"sense_touch": status, "sensor": sensor_name});
}

function startSkill()
{
  
    RegisterGuardianEvent();
    RegisterTouch();

}

// Respond to User events
function RegisterGuardianEvent(data)
{
    //misty.AddPropertyTest("guardian", "guardian_command", "==", "eye_contact", "string");
    //misty.AddReturnProperty("guardian", "guardian_data");
    misty.RegisterUserEvent("sense_touch", true);
}

function _sense_touch(data)
{
     //let command = data["guardian_command"];    
    let received = data["guardian_data"];
    misty.Debug("External command received -> " + received);
    

    
    //if (command == "sense_touch")
    //{
        switch (received)
        {
            case "on":
                _touch_active = true;
                break;
            case "off":
                _touch_active = false;
                break;
            case "default":
        }
    //}
    
    misty.TriggerEvent("guardian", "sense_touch", message(received, ""), "");
    
    
}

// Respond to touch events
function RegisterTouch()
{
    misty.Debug("Registering Touch");
    misty.AddReturnProperty("Touched", "SensorPosition");
    misty.AddReturnProperty("Touched", "IsContacted");
    misty.RegisterEvent("Touched", "TouchSensor", 50 ,true);
}

function _Touched(data)
{
    var sensor = data.AdditionalResults[0];
    var isPressed = data.AdditionalResults[1];
	isPressed ? misty.Debug(sensor+" is Touched") : misty.Debug(sensor+" is Released");
    if (_touch_active)
    {
        if (isPressed)
        {
    
            switch (sensor)
            {
                case "Chin":
                    //misty.Speak("That tickles.");
                    misty.PlayAudio("010-Uhm.wav");
                    break;
                case "HeadRight":
                    misty.PlayAudio("010-Uhm.wav");
                    break;
                case "HeadLeft":
                    misty.PlayAudio("010-Uhm.wav");
                    break;
                case "HeadFront":
                    misty.PlayAudio("010-Uhm.wav");
                    break;
                case "HeadBack":
                    misty.PlayAudio("010-Uhm.wav");
                    break;
                case "Scruff":
                    misty.PlayAudio("010-Uhm.wav");
                    break;
                default:
                    misty.Debug("Sensor Name '" + sensor + "' is unknown.");
            }
    
        misty.TriggerEvent("guardian", "sense_touch", message("on", sensor), "");
        misty.TriggerEvent("eye_contact", "sense_touch", JSON.stringify({"message" : "sensor_touched"}), "");
        misty.pause(100);
        }
    }
    
} 
