_enable_head_position_reporting();
misty.RegisterUserEvent("enable_head_position_reporting", true);
misty.RegisterUserEvent("disable_head_position_reporting", true);
misty.RegisterUserEvent("head_position_reporting", true);

function _enable_head_position_reporting() {
    misty.AddReturnProperty("ActuatorPosition", "SensorId");
    misty.AddReturnProperty("ActuatorPosition", "Value");
    misty.AddPropertyTest("ActuatorPosition", "SensorId", "==", "ahy", "string");
    misty.RegisterEvent("ActuatorPosition", "ActuatorPosition", 5000, true);
}

function _disable_head_position_reporting() {
    misty.UnregisterEvent("ActuatorPosition");
}

function _head_position_reporting(data) {
    if(data) {
        _enable_head_position_reporting()
    } else {
        _disable_head_position_reporting()
    }
    
}

function _ActuatorPosition(data) {
    if (data.AdditionalResults[0] == 'ahy') {
        var headYaw = data.AdditionalResults[1];
        
        const old = misty.Get("currentUploadUrl")
        if(old != headYaw) {
            misty.Debug('robot moved head', headYaw);
            misty.Set("currentUploadUrl", headYaw, false);
            misty.TriggerEvent('guardian', 'head_position_changed', JSON.stringify({headYaw}),"");
        }
    }
}