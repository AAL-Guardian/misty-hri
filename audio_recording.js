misty.RegisterUserEvent("record_audio", true);

// TimerEvent callback
function _record_audio(data) {
    //CONSTATS:
    const filename = 'recordAudio.wav';

    // INPUT PARAMETERS
    const command_data = JSON.parse(data.guardian_data);

    const uploadUrl = command_data.upload_url;

    const time = command_data.time || 0;
    

    // LOCAL VARIABLES
    misty.Set("currentUploadUrl", uploadUrl, false);

    // Change LED to random color
    misty.Set("currentUrl", decoded.signedUrl, false);
    misty.Debug("Start Recording Audio");
    misty.SendExternalRequest("POST", "http://localhost/api/audio/raw/record/start", null, null, JSON.stringify({ filename }), true, false, null, null);
    //the pause command allow to determine the duration of the recorded audio signal. Modify the time to determine the duration 
    misty.Pause(time * 1000);
    misty.Debug("audio registrato!!");
    misty.StopRecordingAudio();
    misty.Debug("stop recording audio");

    misty.SendExternalRequest("GET", "http://localhost/api/audio?FileName=" + filename + "&Base64=false", null, null, null, false, false, null, null, 'afterAudioGet');

}

function afterAudioGet(data) {
    misty.Debug("afterAudioGet");

    const upload_url = misty.Get("currentUploadUrl");
    misty.SendExternalRequest("PUT", uploadUrl, null, null, data.Result.Base64);
}