var robotCode = misty.Get('robot_code');
misty.Debug(robotCode);
if(typeof robotCode == 'string' || robotCode.length > 12){
   
	misty.GetDeviceInformation()
}
function _GetDeviceInformation(data) {
    misty.Debug(JSON.stringify(data.Result));
    misty.Set('robot_code', data.Result.SerialNumber, true );
   
}
_count = 5;
//misty.MoveHeadDegrees(0, 0, 0, 100);
//misty.Pause(1000);
registerActuatorPosition();
misty.Set("headYaw",0)

function registerActuatorPosition(){
    misty.Debug("position")
    misty.AddReturnProperty("ActuatorPosition", "SensorId");
    misty.AddReturnProperty("ActuatorPosition", "Value");
    misty.AddPropertyTest("ActuatorPosition", "SensorId", "==", "ahy", "string");
    misty.RegisterEvent("ActuatorPosition", "ActuatorPosition", 1000, true);

}
 function _ActuatorPosition(data){
     misty.Debug(data);
     misty.Debug('registro');
     if (data.AdditionalResults[0] == 'ahy'){
        misty.Debug(data.AdditionalResults[1]);
       var headYaw= data.AdditionalResults[1];
       misty.Set("headYaw",headYaw);
       misty.UnregisterEvent("ActuatorPosition");
     }

 }
    

misty.RegisterUserEvent("guardian", true);

// TimerEvent callback
function _guardian(data) {
    if (data["guardian_command"] !== "record_audio"){
        return; 
    }
    if (_count > 0)
    {
        // Change LED to random color
        misty.Debug("Start Recording Audio");
        misty.SendExternalRequest("POST", "http://localhost/api/audio/raw/record/start", null, null, JSON.stringify({"filename":"test_raw_audio_file.wav"}), true, false, null, null);
    //the pause command allow to determine the duration of the recorded audio signal. Modify the time to determine the duration 
        registerActuatorPosition();
        misty.Pause(10000);
        misty.Debug("audio registrato!!");
        misty.StopRecordingAudio();
        misty.Debug("stop recording audio"); 
        //misty.Pause(2000);
        _count -= 1;
        misty.Debug("https://api.guardian.jef.it/dev/upload-url/audio/"+ misty.Get('robot_code'))
        misty.SendExternalRequest("GET","https://api.guardian.jef.it/dev/upload-url/audio/"+ misty.Get('robot_code')+ "_" + misty.Get("headYaw"), null, null, null, false, false, null, null, 'afterGettingUrl');

       
       // var the_data = misty.Get("event_data");
       // misty.TriggerEvent("guardian", "demo", the_data, "");
        //misty.RegisterTimerEvent("audiorecording", 60000, false);
    } else {
        //misty.UnregisterEvent("TimerEvent");
        var the_data = JSON.parse(misty.Get("event_data"));
        the_data["guardian_data"]="off";
        misty.TriggerEvent("guardian", "demo", JSON.stringify(the_data), "");
        misty.Debug("Finished raising events.");
    }
}


function afterGettingUrl(data){
    misty.Debug("afterGettingUrl");
    misty.Debug(JSON.stringify(data));
    var decoded= JSON.parse(data.Result.ResponseObject.Data);
    
    misty.Debug(decoded);
    misty.Set("currentUrl", decoded.signedUrl, false);
    misty.Debug(misty.Get("currentUrl"));
   
    misty.SendExternalRequest("GET", "http://localhost/api/audio?FileName=test_raw_audio_file.wav&Base64=false", null, null, null, false, false, null, null, 'afterAudioGet');
}
  
  
  
function afterAudioGet(data){
    misty.Debug("afterAudioGet");
    //var decoded= JSON.parse(data.Result.ResponseObject.Data);
    //misty.Debug(decoded.result.base64);
    //var verydecoded=Base64.decode(decoded.result.base64);
    
    misty.Debug(misty.Get("currentUrl"));
    //misty.Debug(JSON.stringify(data));
    
    misty.SendExternalRequest("PUT", misty.Get("currentUrl"), null, null, data.Result.ResponseObject.Data);
    //misty.Debug("bella");
    
  
}