misty.Debug("Speak to user skill");
startSkill();

function startSkill()
{
    RegisterGuardianEvent();
}

// Respond to User events
function RegisterGuardianEvent(data)
{
    //misty.AddPropertyTest("guardian", "guardian_command", "==", "speak_to_user", "string");
    //misty.AddReturnProperty("guardian", "guardian_data");
    misty.RegisterUserEvent("guardian", true);
}

function _guardian(data)
{
    if (data["guardian_command"] == "speak_to_user")
    {
        let received = data["guardian_data"];
        misty.Debug("External command received -> " + received);
        //misty.Debug(JSON.stringify(data));

        misty.Speak(received);
    }
}