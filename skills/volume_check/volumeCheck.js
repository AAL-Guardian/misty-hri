misty.Debug("Play Sound skill");
startSkill();

function startSkill()
{
    RegisterGuardianEvent();
}

// Respond to User events
function RegisterGuardianEvent()
{
    misty.RegisterUserEvent("volume_check", true);
}

function _volume_check(data)
{
    const received = data["guardian_data"];
    misty.Debug("External command received -> " + received);
    misty.PlayAudio('audioFile.mp3', received['volume']);
}