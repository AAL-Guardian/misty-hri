misty.RegisterUserEvent("take_photo", true);

function _take_photo(data) {
    //CONSTATS:
    
    misty.Debug("data");
    misty.Debug(data); 
    const command_data = JSON.parse(data.guardian_data);

    const uploadUrl = command_data.upload_url;

    const head_position = command_data.head_position || 0;
    // INPUT PARAMETERS
    misty.Debug(JSON.stringify(data));
    
    
    misty.Debug("upload_url: " + uploadUrl);



    //const picture = "GuardianImage"
    
    // LOCAL VARIABLES
    misty.Set("currentUploadUrl", uploadUrl, false);
    misty.Debug("Start the skill");
    misty.Debug("start movement");
    misty.MoveHeadDegrees(0, 0, head_position, 100);
    misty.Pause(3000);
    misty.TakePicture("GuardianImage", 1600,1200,false,true); 
    misty.Debug("take picture")


    }
 
    function _TakePicture(data) {
        misty.Debug("taken picture");
        const upload_url = misty.Get("currentUploadUrl");
        misty.SendExternalRequest("PUT", upload_url, null, null, data.Result.Base64);
    }


