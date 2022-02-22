////////////////////////////////////////
/*       Initialisation               */
//////////////////////////////////////// 
_current_state = "on";
_audio_recording = false;
_default_data = {"guardian_data": _current_state};

//misty.RegisterEvent("KeyPhraseRecognized","KeyPhraseRecognized", 10, false);
misty.RegisterUserEvent("listen_voices", true);
//misty.RegisterTimerEvent("time_out_logic", 30000, false);
set_current_state(_current_state, _default_data);
/* 
function _time_out_logic(data)
{
    //misty.Debug(">> " + _current_state);
    set_current_state(_current_state);
    // make sure the skill does not die
    misty.RegisterTimerEvent("time_out_logic", 30000, false);   
} */

function message(the_message)
{
    return JSON.stringify({ "skill" : "listen_voices",
                            "state" : _current_state,
                            "message": the_message});
}

////////////////////////////////////////
/*       User events                  */
////////////////////////////////////////     
function _listen_voices(data)
{
     //let command = data["guardian_command"];    
     //misty.Debug("> "+data.guardian_data);
     try{
        the_data = data.guardian_data;
        
        if ((the_data == "on") || (the_data == "off"))
        {
            received = the_data; 
        } else {
            the_data = JSON.parse(the_data);
            received = the_data.command;
        }
        misty.Debug("listen_voices: External command received -> " + received);

        the_message = message("command received");
        misty.TriggerEvent("guardian", "listen_voices", the_message, ""); // reply to cloud a message is received
        set_current_state(received, data.guardian_data);
    } catch (e)
    {
        misty.Debug(e);
        misty.Debug("JSON {\"guardian_data\":<some data>} expected");
    }

}

////////////////////////////////////////
/*       Record audio                 */
//////////////////////////////////////// 
function record_audio(guardian_data) {

     // INPUT PARAMETERS
    data = JSON.parse(guardian_data);
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
    if (_current_state == "on" && !_audio_recording)
    {
        misty.Debug("Key phrase recognized!");
        the_message = message("key_phrase_detected");
        misty.TriggerEvent("eye_contact", "listen_voices", the_message, "");
        misty.TriggerEvent("guardian", "listen_voices", the_message, ""); // reply to cloud what is received
        waveRightArm();
        set_current_state(_current_state, ""); //registers key event again
    }
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

function listen_answers(guardian_data) {

    //CONSTATS:
    const filename = 'answerAudio.wav';

    // INPUT PARAMETERS
    const data = JSON.parse(guardian_data);
    const uploadUrl = data.upload_url;
    const time = data.time || 5;
    misty.Debug(">> "+ time + ", " + uploadUrl)
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
function set_current_state(received, received_data)
{
   // misty.Debug("> " + received + ", " + received_data);
    switch (received)
    {
        case "on":
            misty.RegisterEvent("KeyPhraseRecognized","KeyPhraseRecognized", 10, false);
            misty.StartKeyPhraseRecognition();
            _current_state = "on";
            break;
        case "off":
            misty.StopKeyPhraseRecognition();
            misty.UnregisterEvent("KeyPhraseRecognition");
            _current_state = "off";
            break;
        case "record_audio":
            if (!_audio_recording)
            {
                old_state = _current_state;
                misty.StopKeyPhraseRecognition();
                misty.UnregisterEvent("KeyPhraseRecognition");
                misty.Pause(100);
                _current_state = "record_audio";
                _audio_recording = true;

                record_audio(received_data); // blocking call, so it shouldn't be possible to get multiple recordings at the same time?
                
                misty.Pause(100);
                _current_state = old_state;
                _audio_recording = false;
                set_current_state(_current_state, received_data);
            }
            break;
        case "listen_answers":
            //misty.Debug("> "+ _audio_recording+ ", "+ _current_state +", "+ received + ", "+ JSON.stringify(received_data));
            if (!_audio_recording)
            {
                old_state = _current_state;
                misty.StopKeyPhraseRecognition();
                misty.UnregisterEvent("KeyPhraseRecognition");
                misty.Pause(100);
                _current_state = "listen_answers";
                _audio_recording = true;

                listen_answers(received_data); // blocking call, so it shouldn't be possible to get multiple recordings at the same time?
                
                misty.Pause(100);
                _current_state = old_state;
                _audio_recording = false;
                set_current_state(_current_state, received_data);
            }
            break;
        case "default":    
    }
}
