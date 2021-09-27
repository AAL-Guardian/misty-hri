misty.Debug("Speak from url skill");
startSkill();

function startSkill()
{
    RegisterGuardianEvent();
}

// Respond to User events
function RegisterGuardianEvent()
{
    misty.SetDefaultVolume(50);
    misty.RegisterUserEvent("speak_from_url", true);
}

function _speak_from_url(data)
{
    const received = data["guardian_data"];
    const decoded = JSON.parse(received);
    misty.PlayAudio(decoded.url, decoded.volume);
}