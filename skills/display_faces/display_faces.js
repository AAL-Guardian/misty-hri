misty.Debug("display_faces skill has started.");
_default_eye_state = {"image":"e_DefaultContent.jpg",
 //               "led_color":{"red":255,"green":255,"blue":255},
                "blinking":true,
                "time_out": 0};
           
misty.Set("_current_state",JSON.stringify({"image": null,
//               "led_color":null,
               "blinking": null,
               "time_out": null}));


change_face(_default_eye_state);


RegisterGuardianEvent();

// Respond to User events
function message(the_message)
{
    return JSON.stringify({ "skill" : "display_faces",
                            "state" : JSON.parse(misty.Get("_current_state")),
                            "message": the_message});
}

function RegisterGuardianEvent()
{
    //misty.AddPropertyTest("guardian", "guardian_command", "==", "eye_contact", "string");
    //misty.AddReturnProperty("guardian", "guardian_data");
    misty.RegisterUserEvent("display_faces", true);
}

// callback for timer event
function _time_out(callbackData)
{
    misty.Debug("display_faces: time_out event received");
    _default_eye_state = {"image":"e_DefaultContent.jpg",
    //               "led_color":{"red":255,"green":255,"blue":255},
                   "blinking":true,
                   "time_out": 0};
    change_face(_default_eye_state);
}


function change_face(new_state)
{
    _current_state = JSON.parse(misty.Get("_current_state"));

    if (_current_state.image != new_state.image) // necessary to prevent flashing due to repeated calls
    {
        misty.DisplayImage(new_state.image); // Change eyes
        _current_state.image = new_state.image;
    }
    if (_current_state.blinking != new_state.blinking)
    {
        misty.SetBlinking(new_state.blinking); // turn blinking on/off
        _current_state.blinking = new_state.blinking;
    }
    
    misty.Set("_current_state", JSON.stringify(_current_state));
}

function _display_faces(data)
{
    //if (data["guardian_command"] == "eye_contact")
    //{
   // misty.Debug(JSON.stringify(data));
    misty.Debug("display_faces: External command received from Source -> " + data.Source + ", Event -> " + data.EventName);
    let received = data["guardian_data"];

    switch (data.Source)
    {
        case "sense_touch":
        case "listen_voices":
        case "eye_contact":
        case "cloud_connector":
        case "MyRobotApplication":
            change_face(received);
            if (received.time_out > 0)
            {
                misty.RegisterTimerEvent("time_out", received.time_out * 1000, false);
            }

            var the_message = message("command received"); //"External command received"
            misty.TriggerEvent("guardian", "display_faces", the_message, "");
            break;
        default:
            break;
    
    }
}
