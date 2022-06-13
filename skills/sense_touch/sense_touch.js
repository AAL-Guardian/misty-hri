// Registers touch skill of Misty and sends events to the internal bus and listens to events from the cloud

misty.Debug("Sense_touch skill has started.");

misty.Set("_touch_active", true);
misty.Set("_last_sensor","");

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
    //misty.AddPropertyTest("guardian", "guardian_command", "==", "sense_touch", "string");
    //misty.AddReturnProperty("guardian", "guardian_data");
    misty.RegisterUserEvent("sense_touch", true);
    RegisterTouch();

}

// Respond to User events
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
    misty.AddReturnProperty("Touched", "created");
    misty.RegisterEvent("Touched", "TouchSensor", 20 ,false);
}

function _Touched(data)
{
    let sensor = data.AdditionalResults[0];
    let isPressed = data.AdditionalResults[1];
    let time_stamp = data.AdditionalResults[2];
    isPressed ? misty.Debug(sensor+" is Touched") : misty.Debug(sensor+" is Released");

    if (misty.Get("_touch_active"))
    {
        if (isPressed)
        {
            misty.Set("_last_sensor", JSON.stringify({"sensor":sensor, "is_pressed":true, "time_stamp":time_stamp}));

            switch (sensor)
            {
                case "Chin":
                    //misty.Speak("That tickles.");
                    misty.PlayAudio("037-Eurrt.wav");
 //                   the_message = JSON.stringify({"image":"e_Pride.jpg","blinking":true, "time_out":5});
 //                   misty.TriggerEvent("display_faces", "sense_touch", the_message, "");
 //                   misty.TriggerEvent("emotion_enjoy","sense_touch","","");
                    misty.DisplayImage("e_Admiration.jpg"); // Change eyes
                    misty.Pause(3000);
                    misty.DisplayImage("e_DefaultContent.jpg"); // Change eyes
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
        misty.TriggerEvent("behavior_go_to_normal", "sense_touch", "", "");
        the_message = message("touch detected", sensor);
        misty.TriggerEvent("eye_contact", "sense_touch", JSON.stringify({"message":"wake_up"}), "");
        //misty.TriggerEvent("guardian", "sense_touch", the_message, "");
        }
        else
        {
            var _last_sensor = misty.Get("_last_sensor");
            if (_last_sensor != "")
            {
                var _last_sensor = JSON.parse(_last_sensor);
                if (sensor == _last_sensor.sensor)
                {
                    //misty.Debug("--> "+_last_sensor.sensor+" , "+_last_sensor.time_stamp);
                    var t_last_time = Date.parse(_last_sensor.time_stamp) //.valueOf();
                    //misty.Debug("--->> " + t_last_time);
                    var t_current_time = Date.parse(time_stamp) //.valueOf();
                    //misty.Debug("--->> " + t_current_time);
                    var delta_t =  t_current_time - t_last_time;
                    //misty.Debug("--->> " + delta_t);
                    if (delta_t > 3000)
                    {
                        // goto sleep mode
                        //misty.TriggerEvent("display_faces", "sense_touch", JSON.stringify({"image":'e_Sleep.jpg', "blinking":false, "time_out":0}), "");
                        misty.TriggerEvent("behavior_go_to_sleep", "sense_touch", "", "");
                        the_message = message("standby_activated", sensor);
                        misty.TriggerEvent("eye_contact", "sense_touch", JSON.stringify({"message":"go_to_sleep"}) , "");
                        misty.TriggerEvent("guardian", "sense_touch", the_message, "");                    
                    }
                }
                misty.Set("_last_sensor",""); // reset time tracking of sensor pressed
            }
        }
    }
    RegisterTouch();    
} 