misty.RegisterUserEvent("listen_answers", true);

function _listen_answers(data) {

    //CONSTATS:
    const filename = 'answerAudio.wav';

    // INPUT PARAMETERS
    const command_data = JSON.parse(data.guardian_data);

    const uploadUrl = command_data.upload_url;

    const time = command_data.time || 0;
    
   

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
    misty.Debug(Object.keys(data.Result));
    const uploadUrl = misty.Get("currentUploadUrl");
    try {
        misty.Debug(uploadUrl);
        misty.SendExternalRequest("PUT", uploadUrl, null, null, data.Result.Base64);
        misty.Debug("Audio Inviato");
        } catch (e) {
        misty.Debug(e)
    }
    
}
