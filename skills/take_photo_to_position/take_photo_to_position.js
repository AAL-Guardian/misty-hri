misty.RegisterUserEvent("listen_answers", true);

function _listen_answers(data) {
    //CONSTATS:
    const filename = 'answerAudio.wav';

    // INPUT PARAMETERS
    const uploadUrl = data['upload_url'];
    const head_position = data['head_position'] || 0;
    
    // LOCAL VARIABLES
    misty.Set("currentUploadUrl", uploadUrl, false);
    
    //START WORK
    //MOVE TO POSITION
    //TAKE PICTURE

}

function _TakePicture(data){
    //SEND PICTURE
    misty.SendExternalRequest("PUT", misty.Get("currentUploadUrl"), null, null, data.Result.Base64);
}
