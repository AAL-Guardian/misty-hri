misty.RegisterUserEvent("listen_answers", true);

function _listen_answers(data) {
    //CONSTATS:
    const filename = 'answerAudio.wav';

    // INPUT PARAMETERS
    data = JSON.parse(data);
    const uploadUrl = data.upload_url;
    const time = data.time || 5;

    // LOCAL VARIABLES
    misty.Set("currentUploadUrl", uploadUrl, false);
    
    // START WORK
    misty.Debug("Start Recording Audio Answer");
    misty.StartRecordingAudio(filename)
    misty.Pause(time * 1000);
    misty.StopRecordingAudio();
    misty.Debug("audio registrato!!");
    misty.GetAudioFile(filename);
}

function _GetAudioFile(data){
    // SEND FILE
    misty.Debug("Invio Audio");
    misty.Debug(data);
    misty.SendExternalRequest("PUT", misty.Get("currentUploadUrl"), null, null, data.Result.Base64);
    misty.Debug("Audio Inviato");
}
