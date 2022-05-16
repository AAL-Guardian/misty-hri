// Registers touch skill of Misty and sends events to the internal bus and listens to events from the cloud

misty.Debug("Sense touch skill has started.");

misty.Set("_touch_active", true);

startSkill();

function message(the_message, sensor_name)
{
    return JSON.stringify({ "skill" : "sense_touch",
                            "state" : misty.Get("_touch_active"),
                            "message": the_message,
                            "sensor": sensor_name});
}

function startSkill()
{
  
    RegisterGuardianEvent();
    RegisterTouch();

}

// Respond to User events
function RegisterGuardianEvent(data)
{
    //misty.AddPropertyTest("guardian", "guardian_command", "==", "sense_touch", "string");
    //misty.AddReturnProperty("guardian", "guardian_data");
    misty.RegisterUserEvent("sense_touch", true);
}

function _sense_touch(data)
{
     //let command = data["guardian_command"];    
    let received = data["guardian_data"];
    misty.Debug("sense_touch: External command received -> " + received);
    

    
    //if (command == "sense_touch")
    //{
        switch (received)
        {
            case "on":
                misty.Set("_touch_active", true);
                break;
            case "off":
                misty.Set("_touch_active", false);
                break;
            case "default":
        }
    //}
    
    misty.TriggerEvent("guardian", "sense_touch", message("command_received",""), "");
    
    
}

// Respond to touch events
function RegisterTouch()
{
    misty.Debug("Registering Touch");
    misty.AddReturnProperty("Touched", "SensorPosition");
    misty.AddReturnProperty("Touched", "IsContacted");
    misty.AddReturnProperty("Touched", "created")
    misty.RegisterEvent("Touched", "TouchSensor", 50 ,true);
}

function _Touched(data)
{
    var sensor = data.AdditionalResults[0];
    var isPressed = data.AdditionalResults[1];
    var time_stamp = data.AdditionalResults[2];
    isPressed ? misty.Debug(sensor+" is Touched") : misty.Debug(sensor+" is Released");
    if (misty.Get("_touch_active"))
    {
        if (isPressed)
        {
            _last_sensor = {"sensor":sensor, "is_pressed":true, "time_stamp":created};

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
    
        //misty.Pause(100);
        the_message = message("touch detected", sensor);
        misty.TriggerEvent("eye_contact", "sense_touch", the_message , "");
        misty.TriggerEvent("guardian", "sense_touch", the_message, "");
        }
        else
        {
            if (sensor == _last_sensor.sensor)
            {
                current_time = created;
                last_time = _last_sensor.time_stamp;
                if (current_time-last_tame > 3)
                {
                    // goto sleep mode
                    the_message = message("sleep_activated", sensor);
                    misty.TriggerEvent("eye_contact", "sense_touch", the_message , "");
                    misty.TriggerEvent("guardian", "sense_touch", the_message, "");                    
                }
            }
        }

        }
    }    
} 
