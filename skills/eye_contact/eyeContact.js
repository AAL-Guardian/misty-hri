// Sets Misty's arms and head to a neutral position, and prints a debug
// message that the movement is underway.
misty.Debug("Eye contact skill");
misty.Set("enable_keyphrase_recognition", false);

startSkill();

function startSkill()
{
    
    misty.Set("yawRight", -81.4, false);
    misty.Set("yawLeft", 83.6, false);
    misty.Set("pitchUp", -37.8, false);
    misty.Set("pitchDown", 24.6, false);
    misty.Set("state", ""); // make sure the initial state is void
    misty.Set("state_data", "");
    

    initHeadPose();

    var current_state = "sleep"; //create a default state variable on Misty
    var default_data    ={"off":{},
                        "sleep":{"time_out":300000},
                        "normal":{"time_out":15000, "look_around":5},
                        "track_face":{"time_out":5000, "look_around":10},
                        "default":{"time_out":5000},
                        "eye_image":"e_DefaultContent.jpg",
                        "blinking": true
                        };
                        
    
    RegisterGuardianEvent();
    stateMachine(current_state, default_data); // sets and stores new state
}

// Respond to User events
function RegisterGuardianEvent(data)
{
    //misty.AddPropertyTest("guardian", "guardian_command", "==", "eye_contact", "string");
    //misty.AddReturnProperty("guardian", "guardian_data");
    misty.RegisterUserEvent("eye_contact", true);
}

function _eye_contact(data)
{
    //if (data["guardian_command"] == "eye_contact")
    //{
        let received = data["guardian_data"];
        misty.Debug("External command received -> " + received);
        //misty.Debug(JSON.stringify(data));
    
        var current_state = misty.Get("state");
        var state_data  = JSON.parse(misty.Get("state_data"));

        if (current_state != received) stateMachine(received, state_data);
    //}
}

// Wake on key phrase event
function StartKeyPhraseRecognition() {
    misty.Debug("Starting key phrase recognition...");
    // Starts Misty listening for the "Hey, Misty" key phrase
    misty.StartKeyPhraseRecognition();
    // Registers for KeyPhraseRecognized events
    misty.RegisterEvent("KeyPhraseRecognized","KeyPhraseRecognized", 10, false);
    misty.Debug("KeyPhraseRecognition started. Misty will play a sound and wave when she hears 'Hey Misty'.");
}

// Callback function to execute when Misty hears the key phrase
function _KeyPhraseRecognized() {
    misty.Debug("Key phrase recognized!");
    waveRightArm();

   
   var current_state = misty.Get("state");
   var state_data = JSON.parse(misty.Get("state_data"));
   if (current_state == "sleep")
   {
        if (misty.Get("enable_keyphrase_recognition")) {
    // stop keyphrase detection and deregister callback
            misty.UnregisterEvent("KeyPhraseRecognised");
            misty.StopKeyPhraseRecognition();
        }
        current_state = "normal";
        //state_data[next_state].time_out = 5000;
        //state_date[next_state].look_around = 5;
        stateMachine(current_state, state_data); // updates eyes and registers events based on the state
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


// Respond to touch events
function registerTouch()
{
    misty.Debug("Registering Touch");
    misty.AddReturnProperty("Touched", "SensorPosition");
    misty.AddReturnProperty("Touched", "IsContacted");
    misty.RegisterEvent("Touched", "TouchSensor", 50 ,true);
}

function _Touched(data)
{
    var sensor = data.AdditionalResults[0];
    var isPressed = data.AdditionalResults[1];
	isPressed ? misty.Debug(sensor+" is Touched") : misty.Debug(sensor+" is Released");
    
    if (isPressed)
    {

        if (sensor == "Chin")
        {            
            misty.PlayAudio("010-Uhm.wav");   
        } 
        else if (sensor == "HeadRight")
        {
            misty.PlayAudio("010-Uhm.wav");   
        } 
        else if (sensor == "HeadLeft")
        {
            misty.PlayAudio("010-Uhm.wav");   
        } 
        else if (sensor == "HeadFront")
        {
            misty.PlayAudio("010-Uhm.wav");
        } 
        else if (sensor == "HeadBack")
        {
            misty.PlayAudio("010-Uhm.wav");
        } 
        else if (sensor == "Scruff")
        {
            misty.PlayAudio("010-Uhm.wav");
        } 
        else 
        {
            misty.Debug("Sensor Name Unknown");
        }

        // wake up if sleeping
        var current_state = misty.Get("state");
        var state_data = JSON.parse(misty.Get("state_data"));
        if (current_state == "sleep")
        {
            current_state = "normal";
            stateMachine(current_state, state_data);
            
        }
    }
} 



// Start registering Actuator position of the head
// ========================= Reading Head Yaw and Pitch ==========================

function registerYaw() 
{
    misty.AddReturnProperty("headYaw", "SensorId");
    misty.AddReturnProperty("headYaw", "Value");
    misty.AddPropertyTest("headYaw", "SensorId", "==", "ahy", "string");
    misty.RegisterEvent("headYaw", "ActuatorPosition", 200, true);
}

function registerPitch() 
{
    misty.AddReturnProperty("headPitch", "SensorId");
    misty.AddReturnProperty("headPitch", "Value");
    misty.AddPropertyTest("headPitch", "SensorId", "==", "ahp", "string");
    misty.RegisterEvent("headPitch", "ActuatorPosition", 200, true);
}

function registerRoll() 
{
    misty.AddReturnProperty("headRoll", "SensorId");
    misty.AddReturnProperty("headRoll", "Value");
    misty.AddPropertyTest("headRoll", "SensorId", "==", "ahr", "string");
    misty.RegisterEvent("headRoll", "ActuatorPosition", 200, true);
}

function _headYaw(data) 
{
    var headYaw = data.AdditionalResults[1];
    // misty.Debug(headYaw);
    if (!isNaN(headYaw)) misty.Set("headYaw", headYaw, false);
}

function _headPitch(data) 
{
    var headPitch = data.AdditionalResults[1];
    // misty.Debug(headPitch);   
    if (!isNaN(headPitch)) misty.Set("headPitch", headPitch, false);
}

function _headRoll(data) 
{
    var headRoll = data.AdditionalResults[1];
    // misty.Debug(headRoll);   
    if (!isNaN(headRoll)) misty.Set("headRoll", headRoll, false);
}


// ================================ Calibrate =================================
// Misty moves the head right left down up and records the max reachable angles.

// The calibration is not mandatory everytime. Run this once and look at the debug console 
// for the pitch and yaw min max range limits. Update the four global variables 
// listed below with the limits and comment out the call to calibrate funtion 
// "_ = caliberate();"

/*
misty.Pause(2000);

function caliberate()
{
    misty.MoveHead(0, 0, -90, null, 2);
    misty.Pause(4000);
    misty.Set("yawRight", misty.Get("headYaw"), false);
    misty.Debug("Yaw Right Recorded :" + misty.Get("yawRight").toString());

    misty.MoveHead(0, 0, 90, null, 2);
    misty.Pause(4000);
    misty.Set("yawLeft", misty.Get("headYaw"), false);
    misty.Debug("Yaw Left Recorded :" + misty.Get("yawLeft").toString());

    misty.MoveHead(90, 0, 0, null, 2);
    misty.Pause(4000);
    misty.Set("pitchDown", misty.Get("headPitch"), false);
    misty.Debug("Pitch Down Recorded :" + misty.Get("pitchDown").toString());

    misty.MoveHead(-90, 0, 0, null, 2);
    misty.Pause(4000);
    misty.Set("pitchUp", misty.Get("headPitch"), false);
    misty.Debug("Pitch Up Recorded :" + misty.Get("pitchUp").toString());

    misty.Debug("CALIBRATION COMPLETE");
    misty.MoveHead(0, 0, 0, null, 2);
    
    return 0;
}
_ = caliberate();
 */


// Sets up our FaceRecognition event listener.
function registerFaceDetection() {
    // Creates a property test for FaceDetect event messages to check
    // whether the message has a "Label" value before passing
    // the event message into the callback.
    misty.AddPropertyTest("FaceDetect", "Label", "exists", "", "string");

/*
    FaceRecognition{
    "EventName":"MyFaceRecognition",
    "Message":{
      "Bearing":-3,
      "Created":"2018-07-02T16:26:20.1718422Z",
      "Distance":71,
      "Elevation":3,
      "Expiry":"2018-07-02T16:26:20.9218446Z",
      "PersonName":"Face_1",
      "Label": "Face_1",
      "SensorId":null,
      "SensorID":null,
      "TrackId":0
    },
    "Type":"FaceRecognition"
}
*/

    misty.AddReturnProperty("FaceDetect", "Label");
    misty.AddReturnProperty("FaceDetect", "Bearing");
    misty.AddReturnProperty("FaceDetect", "Elevation");
    misty.AddReturnProperty("FaceDetect", "Distance");

    // Registers a new event listener for FaceRecognition events. (We
    // call this event listener FaceDetect, but you can use any name
    // you like. Giving event listeners a custom name means you can
    // create multiple event listeners for the same type of event in a
    // single skill.) Our FaceDetect event listener has a debounce of
    // 1000 ms, and we set the fourth argument (keepAlive) to true,
    // which tells the system to keep listening for FaceDetect events
    // after the first message comes back.
    misty.RegisterEvent("FaceDetect", "FaceRecognition", 1000, true);
}

// Defines how Misty should respond to FaceDetect event messages. Data
// from each FaceDetect event is passed into this callback function.
function _FaceDetect(data) {
    // Stop reading actuators during computation and movevement of head?
    //misty.UnregisterEvent("HeadYaw"); 
    //misty.UnregisterEvent("HeadPitch"); 
    //misty.UnregisterEvent("HeadRoll"); 
    //misty.UnregisterEvent("FaceDetect"); // stop misty from responding to new events
    
    let label = data.AdditionalResults[0]; // or data.PropertyTestResults[0].PropertyParent.Label etc.
    let bearing = data.AdditionalResults[1];
    let elevation = data.AdditionalResults[2];
    let distance = data.AdditionalResults[3];
   // misty.Debug("Label: " + label + ", Bearing: " + bearing+ ", Elevation: " + elevation+ ", Distance: " + distance);

    
    const headYaw = misty.Get("headYaw");
    const headPitch = misty.Get("headPitch");
    const yawRight = misty.Get("yawRight");
    const yawLeft = misty.Get("yawLeft");
    const pitchUp = misty.Get("pitchUp");
    const pitchDown = misty.Get("pitchDown");

    const camera_angle = {"horizontal": 106, "vertical": 60};

    //var new_pitch = headPitch + ((pitchDown - pitchUp) / 33) * elevation; // -13 up and +13 down // unclear in which units bearing and elevation are given
    //var new_yaw   = headYaw   + ((yawLeft - yawRight) / 66) * bearing; // -13 right and +13 left
    var new_pitch = headPitch + (camera_angle.vertical / 33) * elevation; // -13 up and +13 down // unclear in which units bearing and elevation are given
    var new_yaw   = headYaw   + (camera_angle.horizontal /66) * bearing; // -13 right and +13 left
    var new_roll = 0.8  * misty.Get("headRoll"); // slowly reduce head roll
    if ( !( isNaN(new_pitch) || isNaN(new_yaw) || isNaN(new_roll)) )
    {
        // clip values to maximum range
        if (new_pitch < pitchUp)        new_pitch = pitchUp;
        else if (new_pitch > pitchDown) new_pitch = pitchDown;
        if (new_yaw > yawLeft)          new_yaw = yawLeft;
        else if (new_yaw < yawRight)    new_yaw = yawRight;
        
        // move the robot's head
        misty.Debug(new_pitch + " , " + new_yaw );
        misty.MoveHeadDegrees(new_pitch, new_roll , new_yaw, 80); // Faces head forward

        // update headpose to new values;
        misty.Set("headYaw"  , new_yaw, false);
        misty.Set("headPitch", new_pitch, false);
        misty.Set("headRoll", new_roll, false);
    }

    // Restore reading actuator values
    //registerYaw();
    //registerPitch();
    //registerRoll();
    //registerFaceDetection();


    var current_state = misty.Get("state");
    var state_data = JSON.parse(misty.Get("state_data"));
    if (current_state == "normal")
    {
        current_state = "track_face";
        //state_data[next_state].time_out = 5000;
        //state_date[next_state].look_around = 5;
    }
    
    stateMachine(current_state, state_data); // updates eyes and registers events based on the state
    
}


// Sets Misty's arms, head, LED, and display image to a neutral configuration.
function initHeadPose()
{
    misty.Pause(100);
    misty.MoveHeadDegrees(0, 0, 0, 40); // Faces head forward
    misty.Set("headYaw", 0.0);
    misty.Set("headPitch", 0.0);
    misty.Set("headRoll", 0.0);
}



/*
// Sets up our FaceRecognition event listener.
function registerFaceRec() {
    // Creates a property test for FaceRec event messages to check
    // whether the message has a "Label" value before passing
    // the event message into the callback.
    misty.AddPropertyTest("FaceRec", "Label", "exists", "", "string");
    // Registers a new event listener for FaceRecognition events. (We
    // call this event listener FaceRec, but you can use any name
    // you like. Giving event listeners a custom name means you can
    // create multiple event listeners for the same type of event in a
    // single skill.) Our FaceRec event listener has a debounce of
    // 1000 ms, and we set the fourth argument (keepAlive) to true,
    // which tells the system to keep listening for FaceRec events
    // after the first message comes back.
    misty.RegisterEvent("FaceRec", "FaceRecognition", 1000, true);
}

// Defines how Misty should respond to FaceRec event messages. Data
// from each FaceRec event is passed into this callback function.
function _FaceRec(data) {
    // Gets the value of the Label property in the FaceRecognition
    // event message.
    var faceDetected = data.PropertyTestResults[0].PropertyValue;

    // Tells Misty how to react if the face is unknown.
    if (faceDetected == "unknown person") {
        misty.ChangeLED(255, 0, 0); // Changes LED to red
        misty.DisplayImage("e_Disgust.jpg"); // Raises eyebrows
        misty.MoveArmDegrees("both", 70, 100); // Raises both arms
    }
    // Tells Misty how to react when she sees you. Replace
    // "<Your-Name>" below with the label you have trained Misty to
    // associate with your face.
    else if (faceDetected == "Johnathan") {
        misty.ChangeLED(148, 0, 211); // Changes LED to purple
        misty.DisplayImage("e_Joy.jpg"); // Shows happy eyes
        misty.MoveArmDegrees("both", -80, 100); // Raises both arms
    }

    // Registers for a timer event to invoke the _timeoutToNormal
    // callback function after 5000 milliseconds.
    misty.RegisterTimerEvent("timeoutToNormal", 5000, false);
}

registerFaceRec();
*/

function lookSidetoSide()
{   
 
    if (misty.Get("headYaw") > 0) misty.MoveHead(getRandomInt(-20, 0), 0, -40, null, 4);
    else misty.MoveHead(getRandomInt(-20, 0), 0, 40, null, 4);
 
}

function getRandomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function changeEyes()
{
    var state = misty.Get("state");
    var state_data = JSON.parse(misty.Get("state_data"));
    let eye_image = state_data.eye_image;
    let blinking = state_data.blinking;

    switch(state)
    {
        case "off":
            misty.ChangeLED(0, 0, 0); // Changes LED to off
            if (eye_image != "e_DefaultContent.jpg")
            {
                misty.DisplayImage("e_DefaultContent.jpg"); // Show default eyes
                state_data.eye_image = "e_DefaultContent.jpg";
            }
            if (!blinking) 
            {
                misty.SetBlinking(true); // turn blinking on
                state_data.blinking = true;
            }
            break;
        case "sleep":
            misty.ChangeLED(0, 0, 0); // Changes LED to off
            if (eye_image != "e_Sleeping.jpg")
            {
                misty.DisplayImage("e_Sleeping.jpg"); // Show sleeping eyes
                state_data.eye_image = "e_Sleeping.jpg";
            }
            if (blinking)
            {
                misty.SetBlinking(false);  // turn blinking off
                state_data.blinking = false;
            }
            break;
        case "normal":
            misty.ChangeLED(255, 255, 255); // Changes LED to white
            if (eye_image != "e_DefaultContent.jpg")
            {
                misty.DisplayImage("e_DefaultContent.jpg"); // Show default eyes
                state_data.eye_image = "e_DefaultContent.jpg";
            }
            if (!blinking) 
            {
                misty.SetBlinking(true);
                state_data.blinking = true;
            }
            break;
        case "track_face":
            misty.ChangeLED(0, 255, 0); // Changes LED to green
            if (eye_image != "e_Joy.jpg")
            {
                misty.DisplayImage("e_Joy.jpg"); // Show default eyes
                state_data.eye_image = "e_Joy.jpg";

            }
            if (!blinking) 
            {
                misty.SetBlinking(true);
                state_data.blinking = true;
            }
            break;
        default:
            misty.ChangeLED(148, 0, 211); // Changes LED to purple
            if (eye_image != "e_Surprise.jpg")
            {
                misty.DisplayImage("e_Surprise.jpg"); // Show default eyes
                state_data.eye_image = "e_Surprise.jpg";
            }
            if (!blinking) 
            {
                misty.SetBlinking(true);
                state_data.blinking = true;
            }
            break;
    }
    misty.Set("state_data",JSON.stringify(state_data));

}

// callback for timer event
function _timeOutLogic(callbackData)
{
    var current_state = misty.Get("state");
    var data  = JSON.parse(misty.Get("state_data"));
    
    //misty.Debug("timeout callback :" + JSON.stringify(data));
    switch (current_state)
    {
        case "sleep":
            // misty wakes after sleeping for 10 min
            new_state = "normal";
            //data[current_state] = {"time_out":5000, "look_around":5}; // use default
            break;
        case "normal":
            // no faces detected, look around a few minutes then go to sleep
            if (data[current_state].look_around > 0)
            {
                lookSidetoSide();
                data[current_state].look_around -=1;
            }
            else
            {
                data[current_state].look_around = 5;
                current_state = "sleep";
            //    data[current_state].time_out = 60000; // use default
                initHeadPose();  
            }
            break;
        case "track_face":
            // face no longer detected, start looking around or go back to normal
            if (data[current_state].look_around > 0)
            {
                lookSidetoSide();
                data[current_state].look_around -=1;
            }
            else
            {
                data[current_state].look_around = 5;
                new_state = "normal";
            //    data[current_state].time_out = 15000;  
            }
            break;
        case "off":
            break;
        default:
            break;
    }
    stateMachine(new_state, data); //update state and register new time event
}

function stateMachine(current_state, state_data)
{
    var old_state = misty.Get("state");
    misty.Set("state", current_state);
    misty.Set("state_data", JSON.stringify(state_data));
    
    if (current_state != old_state)
    {
        switch (current_state)
        {
            case "sleep":
                // start keyphrase detection and register callback
                if (misty.Get("enable_keyphrase_recogntion")) {
                    StartKeyPhraseRecognition();    
                }
                // reacting to touch
                registerTouch();
    
                // Stop face recognition
                misty.StopFaceDetection();
                //misty.UnregisterEvent("FaceDetect");
            
                // Stop reading actuators?
                //misty.UnregisterEvent("headYaw"); 
                //misty.UnregisterEvent("headPitch"); 
                //misty.UnregisterEvent("headRoll"); 
    
                break;
            case "normal":
            case "track_face":
            
                // read actuator values
                registerYaw();
                registerPitch();
                registerRoll(); 

                // start face recognition
                registerFaceDetection();
                // Starts Misty's face detection process, so we can register for
                // (and receive) FaceRecognition event messages.
                misty.StopFaceDetection(); // is this necessary?
                misty.StartFaceDetection();
                break;
            case "off":
                misty.StopFaceDetection(); // is this necessary?
            default:
                break;
        }
    }
    changeEyes(); // the eyes reflect the state of the robot

    // Registers for a timer event to invoke the _timeoutToNormal
    // callback function after 5000 milliseconds.
    if (current_state != "off")
    {
        let time_out  = state_data[current_state].time_out;
        misty.Debug("state -> " + current_state + "    time_out = " + time_out);
        misty.RegisterTimerEvent("timeOutLogic", time_out, false);
    }
}

