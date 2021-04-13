
misty.RegisterUserEvent("guardian", true);

function _guardian(data) {
    misty.Debug(data);
    if (data["guardian_command"] !== "move_head"){
        return;
    }
    misty.Debug(JSON.stringify(data));
   let direction =  data["guardian_data"]
  
   if (direction>=0 && direction <= 90){
    misty.Debug('Head movement 1');
    direction = (direction*-81)/90; 
    misty.MoveHeadDegrees(-20, 0, direction, 50);
    misty.Debug('head moved!');
    }
    if (direction>=270 && direction <= 360){
    misty.Debug('Head movement 2');
    direction =((360-direction)*81)/90;  
    misty.MoveHeadDegrees(-20, 0, direction, 50);
    misty.Debug('head moved!');
    
    }
    if (direction>= 180 && direction < 270){
    misty.Debug('Robot movement 3');
     misty.Drive(0, -100);
    misty.Debug("si muove");
    direction =((direction-180)*-81)/90; 
     misty.MoveHeadDegrees(-20, 0, direction,50);
     misty.Debug('head moved!');
    
    }
    if (direction> 90 && direction < 180){
    misty.Debug('Head movement 4');
    misty.Drive(0, -10);
    direction = (direction*81)/90; 
    misty.MoveHeadDegrees(-20, 0, direction, 50);
    misty.Debug('head moved!');
    }
   
}

