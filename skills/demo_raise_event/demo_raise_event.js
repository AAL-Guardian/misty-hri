const event_name = "guardian";
const event_data = JSON.stringify({"guardian-command": "eye_contact", "guardian-data": "sleep"});
const the_source = "demo_raise_event";
const receiving_skills = ""; //["5d3e55e9-c878-4fbc-8d62-172fbdd9c48c"]; // use empty string "" instead of list to broadcast to all skills

_count = 5;

misty.Debug("Raising event -> "+ event_name);
misty.TriggerEvent(event_name, the_source, event_data, receiving_skills);
misty.RegisterTimerEvent("TimerEvent", 5000, false);
misty.Set("event_data", event_data);

// TimerEvent callback
function _TimerEvent() {
    if (_count > 0)
    {
        // Change LED to random color
        let value1 = Math.floor(Math.random() * (256));
        let value2 = Math.floor(Math.random() * (256));
        let value3 = Math.floor(Math.random() * (256));
        misty.ChangeLED(value1, value2, value3);

        _count -= 1;
        var the_data = misty.Get("event_data");
        misty.TriggerEvent("guardian", "demo", the_data, "");
        misty.RegisterTimerEvent("TimerEvent", 5000, false);
    } else {
        //misty.UnregisterEvent("TimerEvent");
        var the_data = JSON.parse(misty.Get("event_data"));
        the_data["guardian-data"]="off";
        misty.TriggerEvent("guardian", "demo", JSON.stringify(the_data), "");
        misty.Debug("Finished raising events.");
    }
}