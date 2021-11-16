misty.RegisterUserEvent("take_photo", true);

function _take_photo(data) {
    //CONSTATS:

    // INPUT PARAMETERS
    const uploadUrl = data['upload_url'];
    const head_position = data['head_position'];
    head_position = parseInt(head_position); 
    misty.Debug("head_position"); 
    //const picture = "GuardianImage"
    
    // LOCAL VARIABLES
    misty.Set("currentUploadUrl", uploadUrl, false);
    misty.Debug("Start the skill");
    misty.Debug("start movement");
    misty.MoveHeadDegrees(0, 0, head_position, 100);
    misty.Pause(3000);
    misty.TakePicture("GuardianImage", 1600,1200,false,true); 
    misty.Debug("take picture")
    //START WORK
    //MOVE TO POSITION
    //TAKE PICTURE
    misty.SendExternalRequest("PUT", misty.Get("currentUploadUrl"), null, null, data.Result.Base64);
}
