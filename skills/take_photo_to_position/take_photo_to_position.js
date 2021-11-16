misty.RegisterUserEvent("take_photo", true);

function _take_photo(data) {
    // INPUT PARAMETERS
    const command_data = JSON.parse(data.guardian_data);
    const uploadUrl = command_data.upload_url;
    const head_position = command_data.head_position || 0;
    //const picture = "GuardianImage"

    // LOCAL VARIABLES
    misty.Set("currentUploadUrl", uploadUrl, false);
    misty.Debug("start movement");
    misty.MoveHeadDegrees(0, 0, head_position, 100);
    misty.Pause(3000);
    misty.Debug("take picture");
    misty.TakePicture("GuardianImage", 1600, 1200, false, true);
}

function _TakePicture(data) {
    misty.Debug("taken picture");
    const upload_url = misty.Get("currentUploadUrl");
    misty.SendExternalRequest("PUT", upload_url, null, null, data.Result.Base64);
}