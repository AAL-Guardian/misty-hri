misty.Debug("Speak to user skill");
startSkill();

function startSkill()
{
    RegisterGuardianEvent();
}

// Respond to User events
function RegisterGuardianEvent()
{
    misty.SetDefaultVolume(50);
    misty.RegisterUserEvent("guardian", true);
}

function _guardian(data)
{
    if (data["guardian_command"] === "speak_to_user")
    {
        let received = data["guardian_data"];
        misty.Debug("External command received -> " + received);
        misty.Speak(received);
    }
}