misty.RegisterUserEvent("record_audio", true);

// TimerEvent callback
function _record_audio(data) {

    // INPUT PARAMETERS
    data = JSON.parse(data.guardian_data);
    const uploadUrl = data.upload_url;
    const time = data.time || 10;
    // LOCAL VARIABLES
    misty.Set("currentUploadUrl", uploadUrl, false);
    const filename = "test_raw_audio_file.wav";
    misty.Debug("Start Recording Audio");
    misty.SendExternalRequest("POST", "http://localhost/api/audio/raw/record/start", null, null, JSON.stringify({ filename }), true, false, null, null, null, null, null, 0, time * 1000);
    //the pause command allow to determine the duration of the recorded audio signal. Modify the time to determine the duration 
    // misty.Pause(time * 1000);
    misty.Debug("audio registrato!!");
    misty.StopRecordingAudio();
    misty.Debug("stop recording audio");

    misty.SendExternalRequest("GET", "http://localhost/api/audio?FileName=" + filename + "&Base64=false", null, null, null, false, false, null, null, 'afterAudioGet');

}

function afterAudioGet(data) {
    misty.Debug("afterAudioGet");
    const uploadUrl = misty.Get("currentUploadUrl");
    misty.SendExternalRequest("PUT", uploadUrl, null, null, data.Result.ResponseObject.Data);
}