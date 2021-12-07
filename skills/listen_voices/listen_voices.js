_current_state = "on";
_current_data = "";
_audio_recording = false;

////////////////////////////////////////
/*       Initialisation               */
//////////////////////////////////////// 
misty.RegisterEvent("KeyPhraseRecognized","KeyPhraseRecognized", 10, false);
misty.RegisterUserEvent("listen_voices", true);
set_current_state(_current_state, _current_data);

////////////////////////////////////////
/*       User events                  */
////////////////////////////////////////     
function _listen_voices(data)
{
     //let command = data["guardian_command"];    
    let received = data["guardian_data"];
    misty.Debug("External command received -> " + received);
    the_message = JSON.stringify({"listen_voices": _listen_active, "received_command": received}); //echo what is received
    misty.TriggerEvent("guardian", "listen_voices", the_message, ""); // reply to cloud what is received
    
    set_current_state(received, data);
}

////////////////////////////////////////
/*       Record audio                 */
//////////////////////////////////////// 
function record_audio(data) {

     // INPUT PARAMETERS
    data = JSON.parse(data.guardian_data);
    const uploadUrl = data.upload_url;
    const time = data.time || 10;
    // LOCAL VARIABLES
    misty.Set("currentUploadUrl", uploadUrl, false);
    const filename = "test_raw_audio_file.wav";
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
    const uploadUrl = misty.Get("currentUploadUrl");
    misty.SendExternalRequest("PUT", uploadUrl, null, null, data.Result.ResponseObject.Data);
}

////////////////////////////////////////
/*          Keyphrase detection       */
////////////////////////////////////////
// Callback function to execute when Misty hears the key phrase
function _KeyPhraseRecognized() {
    misty.Debug("Key phrase recognized!");
    misty.TriggerEvent("eye_contact", "listen_voices", JSON.stringify({"message" : "key_phrase_detected"}), "");
    waveRightArm();   
}

// Helper function to wave Misty's arm
function waveRightArm() {
   misty.MoveArmDegrees("left", 90, 45); // Left arm fully down
   misty.Pause(50);
   misty.MoveArmDegrees("right", 90, 45); // Right arm fully down
   misty.Pause(50); // Pause for 3 seconds
   misty.MoveArmDegrees("right", -45, 45); // Right arm fully up
   misty.Pause(1000); // Pause with arm up for 5 seconds (wave!)
   misty.MoveArmDegrees("right", 90, 45); // Right arm fully down
}

////////////////////////////////////////
/*               Listen Answers       */
////////////////////////////////////////

function listen_answers(data) {

    //CONSTATS:
    const filename = 'answerAudio.wav';

    // INPUT PARAMETERS
    const command_data = JSON.parse(data.guardian_data);
    const uploadUrl = data.upload_url;
    const time = data.time || 0;

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

function GetAudioFile(data){
    // SEND FILE
    misty.Debug("Invio Audio");
    const uploadUrl = misty.Get("currentUploadUrl");
    try {
        misty.Debug(uploadUrl);
        misty.SendExternalRequest("PUT", uploadUrl, null, null, data.Result.Base64);
        misty.Debug("Audio Inviato");
        } catch (e) {
        misty.Debug(e)
    }
    
}

////////////////////////////////////////
/*          State machine             */
////////////////////////////////////////
function set_current_state(received, data)
{

    switch (received)
    {
        case "on":
            misty.StartKeyPhraseRecognition();
            break;
        case "off":
            misty.StopKeyPhraseRecognition();
            break;
        case "record_audio":
            if (!_audio_recording)
            {
                misty.StopKeyPhraseRecognition();
                misty.Pause(100);
                _audio_recording = true;            
                record_audio(data); // blocking call, so it shouldn't be possible to get multiple recordings at the same time?
                _audio_recording = false;
                misty.Pause(100);
                misty.StartKeyPhraseRecognition();
            }
            break;
        case "listen_answers":
            if (!_audio_recording)
            {
                misty.StopKeyPhraseRecognition();
                misty.Pause(100);
                _audio_recording = true;            
                listen_answers(data); // blocking call, so it shouldn't be possible to get multiple recordings at the same time?
                _audio_recording = false;
                misty.Pause(100);
                misty.StartKeyPhraseRecognition();
            }
            break;
        case "default":
    }
    _current_state = received;
    
}