////////////////////////////////////////
/*       Initialisation               */
//////////////////////////////////////// 
misty.Set("_listen_voices", true);
misty.Set("_listen_answers", false);
misty.Set("_record_audio", false);

misty.RegisterUserEvent("listen_voices", true);
misty.RegisterUserEvent("listen_answers",true);
misty.RegisterUserEvent("record_audio",true);

StartListening();

function message(the_message)
{
    let _listen_voices = misty.Get("_listen_voices"); 
    return JSON.stringify({ "skill" : "listen_voices",
                            "state" : _listen_voices,
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
        misty.Debug("listen_voices: External command received -> " + the_data);
        
        if (the_data == "on")
        {
            StartListening();    
        }
        else if(the_data == "off")
        {
            StopListening();
        }

        the_message = message("command received");
        misty.TriggerEvent("guardian", "listen_voices", the_message, ""); // reply to cloud a message is received
    } catch (e)
    {
        misty.Debug(e);
        misty.Debug("JSON {\"guardian_data\":<some data>} expected");
    }

}

function StartListening()
{
        misty.RegisterEvent("KeyPhraseRecognized","KeyPhraseRecognized", 20, false);
        misty.StartKeyPhraseRecognition();
        misty.Set("_listen_voices", true);
}

function StopListening()
{
        misty.StopKeyPhraseRecognition();
        misty.UnregisterEvent("KeyPhraseRecognition");
        misty.Set("_listen_voices", false);
        misty.Pause(100);
}

////////////////////////////////////////
/*       Record audio                 */
//////////////////////////////////////// 
function _record_audio(guardian_data) {
    let _record_audio = misty.Get("_record_audio");
    let _listen_answers = misty.Get("_listen_answers");
    let _listen_voices = misty.Get("_listen_voices");

    if (!_listen_answers && !_record_audio)
    {
        misty.Set("_record_audio", true);      
        if (_listen_voices == true)
        {
            StopListening();
        }

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

        if (_listen_voices == true)
        {
            StartListening();
        }
        misty.Set("_record_audio", false);
    }
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
function _KeyPhraseRecognized()
{
    let _record_audio = misty.Get("_record_audio");
    let _listen_answers = misty.Get("_listen_answers");
    let _listen_voices = misty.Get("_listen_voices");

   if (_listen_voices)
    {
        if (!_listen_answers && !_record_audio)
        {        
            misty.Debug("Key phrase recognized!");
            the_message = message("key_phrase_detected");
            misty.TriggerEvent("eye_contact", "listen_voices", the_message, "");
            misty.TriggerEvent("guardian", "listen_voices", the_message, ""); // reply to cloud what is received
            //misty.TriggerEvent("hey_misty","listen_voices", the_message,""); 
            waveRightArm();
        }
        StartListening(); //listen for next key phrase

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
function _listen_answers(data) {
    let _record_audio = misty.Get("_record_audio");
    let _listen_answers = misty.Get("_listen_answers");
    let _listen_voices = misty.Get("_listen_voices");

    if (!_record_audio && !_listen_answers)
    {
        misty.Set("_listen_answers", true);
        if (_listen_voices == true)
        {
            StopListening()
        }

        
            //CONSTANTS:
        const filename = 'answerAudio.wav';

        // INPUT PARAMETERS
        const command_data = JSON.parse(data.guardian_data);
        const uploadUrl = command_data.upload_url;
        const time = command_data.time || 0;

        // LOCAL VARIABLES
        misty.Set("currentUploadUrl", uploadUrl, false);

        // START WORK
        misty.Debug("Start Recording Audio Answer");
        misty.StartRecordingAudio(filename, 0, time * 1000)
        // misty.Pause(time * 1000);
        misty.StopRecordingAudio();
        misty.Debug("audio registrato!!");
        misty.GetAudioFile(filename);

 
        if (_listen_voices == true)
        {
            StartListening();
        }
        misty.Set("_listen_answers", false)
    }
}

function _GetAudioFile(data) {
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