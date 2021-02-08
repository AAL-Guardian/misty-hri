import requests
import json
import time
 
ip = "192.168.0.100"
red = 0
blue = 255
green = 0
faceFile = "e_DefaultContent.jpg"
opacity = 1
#default head position
Dpitch = 0
Droll = 0
Dyaw = 0
#head position when looking at participant
Parpitch = -18
Parroll = 0
Paryaw = -24
#head position when looking at pc
PCpitch = 9
PCroll = 0
PCyaw = 30

requests.post('http://'+ip+'/api/head',json={"pitch": Dpitch, "roll": Droll, "yaw": Dyaw})
requests.post('http://'+ip+'/api/led',json={"red": red,"green": green,"blue": blue})
requests.post('http://'+ip+'/api/images/display',json={"fileName": faceFile, "alpha": opacity})
running = True
state = "welcome"
while running:
    #welcome state , used when participants have just entered to give them the first few instructions and greet them.
    if state == "welcome":
        welcomestate = input("Say welcome and ask name w. Nice to meet, fill in n. Answer yes or no? y/n . Instruct to watch first movie f. Are you ready r. Switch state press 1: ")
        if welcomestate == "w":
            requests.post('http://'+ip+'/api/head',json={"pitch": Parpitch, "roll": Parroll, "yaw": Paryaw})
            audioFile = "WelcomeName.mp3"
            volume = 100
            requests.post('http://'+ip+'/api/audio/play',json={"fileName": audioFile, "volume": volume})
            time.sleep(8)
            requests.post('http://'+ip+'/api/head',json={"pitch": PCpitch, "roll": PCroll, "yaw": PCyaw})
        elif welcomestate == "n":
            pitch = -18
            roll = 0
            yaw = -24
            requests.post('http://'+ip+'/api/head',json={"pitch": Parpitch, "roll": Parroll, "yaw": Paryaw})
            audioFile = "NiceMeet.mp3"
            volume = 100
            requests.post('http://'+ip+'/api/audio/play',json={"fileName": audioFile, "volume": volume})
        elif welcomestate == "y":
            pitch = -18
            roll = 0
            yaw = -24
            requests.post('http://'+ip+'/api/head',json={"pitch": pitch, "roll": roll, "yaw": yaw})
            audioFile = "FillMood.mp3"
            volume = 100
            requests.post('http://'+ip+'/api/audio/play',json={"fileName": audioFile, "volume": volume})
            time.sleep(5)
            pitch = 9
            roll = 0
            yaw = 30
            requests.post('http://'+ip+'/api/head',json={"pitch": pitch,"roll": roll,"yaw": yaw})
        elif welcomestate == "n":
            pitch = -18
            roll = 0
            yaw = -24
            requests.post('http://'+ip+'/api/head',json={"pitch": pitch, "roll": roll, "yaw": yaw})
            audioFile = "NoProblem.mp3"
            volume = 100
            requests.post('http://'+ip+'/api/audio/play',json={"fileName": audioFile, "volume": volume})
        elif welcomestate == "r":
            pitch = -18
            roll = 0
            yaw = -24
            requests.post('http://'+ip+'/api/head',json={"pitch": pitch, "roll": roll, "yaw": yaw})
            audioFile = "Ready.mp3"
            volume = 100
            requests.post('http://'+ip+'/api/audio/play',json={"fileName": audioFile, "volume": volume})
        elif welcomestate == "f":
            audioFile = "FirstMovie.mp3"
            volume = 100
            pitch = -18
            roll = 0
            yaw = -24
            requests.post('http://'+ip+'/api/head',json={"pitch": pitch, "roll": roll, "yaw": yaw})
            requests.post('http://'+ip+'/api/audio/play',json={"fileName": audioFile, "volume": volume})
            time.sleep(7)
            pitch = 9
            roll = 0
            yaw = 30
            requests.post('http://'+ip+'/api/head',json={"pitch": pitch,"roll": roll,"yaw": yaw})
        elif welcomestate == "s":
            pitch = 9
            roll = 0
            yaw = 30
            requests.post('http://'+ip+'/api/head',json={"pitch": pitch,"roll": roll,"yaw": yaw})
        elif welcomestate == ",":
            state = "watchingvideos"
        else:
            print("no correct input")
            
    #State used when participants are watching the movies with Misty
    elif state == "watchingvideos":
        watchingvideos = input("Turn head to pc c. Go ahead start video g. Misty instructs to watch the second movie V. Misty ask how you feel F. Forgot to tell Misty m. Misty tells to watch second clip W(includes emotion change). No problem wait n. Are you ready r. : ")
        if watchingvideos == "c":
            print("no correct input")
        elif watchingvideos == "g":
            audioFile = "StartVideo.mp3"
            volume = 100
            requests.post('http://'+ip+'/api/audio/play',json={"fileName": audioFile, "volume": volume})
        elif watchingvideos == "v":
            pitch = -18
            roll = 0
            yaw = -24
            requests.post('http://'+ip+'/api/head',json={"pitch": pitch, "roll": roll, "yaw": yaw})
            audioFile = "SecondMovie.mp3"
            volume = 100
            requests.post('http://'+ip+'/api/audio/play',json={"fileName": audioFile, "volume": volume})
        elif watchingvideos == "f":
            pitch = -18
            roll = 0
            yaw = -24
            requests.post('http://'+ip+'/api/head',json={"pitch": pitch, "roll": roll, "yaw": yaw})
            audioFile = "VideoMiddle.mp3"
            volume = 100
            requests.post('http://'+ip+'/api/audio/play',json={"fileName": audioFile, "volume": volume})
        elif watchingvideos == "m":
            pitch = -18
            roll = 0
            yaw = -24
            requests.post('http://'+ip+'/api/head',json={"pitch": pitch, "roll": roll, "yaw": yaw})
            audioFile = "ForgotTell.mp3"
            volume = 100
            requests.post('http://'+ip+'/api/audio/play',json={"fileName": audioFile, "volume": volume})
        elif watchingvideos == "w":
            pitch = -18
            roll = 0
            yaw = -24
            requests.post('http://'+ip+'/api/head',json={"pitch": pitch, "roll": roll, "yaw": yaw})
            audioFile = "ThankContinue.mp3"
            volume = 100
            requests.post('http://'+ip+'/api/audio/play',json={"fileName": audioFile, "volume": volume})
        elif watchingvideos == "n":
            pitch = -18
            roll = 0
            yaw = -24
            requests.post('http://'+ip+'/api/head',json={"pitch": pitch, "roll": roll, "yaw": yaw})
            audioFile = "NoProblem.mp3"
            volume = 100
            requests.post('http://'+ip+'/api/audio/play',json={"fileName": audioFile, "volume": volume})
        elif watchingvideos == "r":
            pitch = -18
            roll = 0
            yaw = -24
            requests.post('http://'+ip+'/api/head',json={"pitch": pitch, "roll": roll, "yaw": yaw})
            audioFile = "Ready.mp3"
            volume = 100
            requests.post('http://'+ip+'/api/audio/play',json={"fileName": audioFile, "volume": volume})
        elif watchingvideos == "k":
            audioFile = "MistyFeisty.mp3"
            volume = 100
            requests.post('http://'+ip+'/api/audio/play',json={"fileName": audioFile, "volume": volume})
        elif watchingvideos == "s":
            pitch = 9
            roll = 0
            yaw = 30
            requests.post('http://'+ip+'/api/head',json={"pitch": pitch, "roll": roll, "yaw": yaw})
        elif watchingvideos == ",":
            state = "welcome"  
        elif watchingvideos == ".":
            state = "interaction"
            
        #below are the options for switching the facial expression of misty   
        elif watchingvideos == "01": #Afraid
            faceFile = "e_Fear.jpg"
            requests.post('http://'+ip+'/api/images/display',json={"fileName": faceFile})
        elif watchingvideos == "02": #Angry
            faceFile = "e_Aggressiveness.jpg"
            requests.post('http://'+ip+'/api/images/display',json={"fileName": faceFile})
        elif watchingvideos == "03": #Distressed
            faceFile = "e_Sad_Tears.jpg"
            requests.post('http://'+ip+'/api/images/display',json={"fileName": faceFile})
        elif watchingvideos == "04": #Excited
            faceFile = "e_Joy2.jpg"
            requests.post('http://'+ip+'/api/images/display',json={"fileName": faceFile})
        elif watchingvideos == "05": #Joyous
            faceFile = "e_Joy.jpg"
            requests.post('http://'+ip+'/api/images/display',json={"fileName": faceFile})
        elif watchingvideos == "06": #Happy
            faceFile = "e_Surprise.jpg"
            requests.post('http://'+ip+'/api/images/display',json={"fileName": faceFile})
        elif watchingvideos == "07": #Depressed
            faceFile = "e_Sadness.jpg"
            requests.post('http://'+ip+'/api/images/display',json={"fileName": faceFile})
        elif watchingvideos == "08": #Surprised
            faceFile = "e_Contempt.jpg"
            requests.post('http://'+ip+'/api/images/display',json={"fileName": faceFile})
        elif watchingvideos == "09": #Sleepy
            faceFile = "e_Grief.jpg"
            requests.post('http://'+ip+'/api/images/display',json={"fileName": faceFile})
        elif watchingvideos == "10": #Calm
            faceFile = "e_Sleepy.jpg"
            requests.post('http://'+ip+'/api/images/display',json={"fileName": faceFile})
        elif watchingvideos == "11": #Content
            faceFile = "e_Calm_Calm.jpg"
            requests.post('http://'+ip+'/api/images/display',json={"fileName": faceFile})
        elif watchingvideos == "12": #Sad
            faceFile = "e_Sad_Sad.jpg"
            requests.post('http://'+ip+'/api/images/display',json={"fileName": faceFile})
        elif watchingvideos == "13": #Bored
            faceFile = "e_Anger.jpg"
            requests.post('http://'+ip+'/api/images/display',json={"fileName": faceFile})
        elif watchingvideos == "14": #Neutral
            faceFile = "e_DefaultContent.jpg"
            requests.post('http://'+ip+'/api/images/display',json={"fileName": faceFile})
        else:
            print("no correct input")

    #State used when the participants are finished watching the movie and misty interacts with them and asks them about the movie and to fill in questionnaires
    elif state == "interaction":
        interaction = input("Misty asks about video A. Why question W. Thank you for sharing C. Could you tell me more M. That is fine, thank you F. Please fill in questionnaires Q. No problem wait n. Are you ready r. : ")
        if interaction == "a":
            pitch = -18
            roll = 0
            yaw = -24
            requests.post('http://'+ip+'/api/head',json={"pitch": pitch, "roll": roll, "yaw": yaw})
            audioFile = "DescribeFeel.mp3"
            volume = 100
            requests.post('http://'+ip+'/api/audio/play',json={"fileName": audioFile, "volume": volume})
        elif interaction == "w":
            pitch = -18
            roll = 0
            yaw = -24
            requests.post('http://'+ip+'/api/head',json={"pitch": pitch, "roll": roll, "yaw": yaw})
            audioFile = "Why.mp3"
            volume = 100
            requests.post('http://'+ip+'/api/audio/play',json={"fileName": audioFile, "volume": volume})
        elif interaction == "c":
            pitch = -18
            roll = 0
            yaw = -24
            requests.post('http://'+ip+'/api/head',json={"pitch": pitch, "roll": roll, "yaw": yaw})
            audioFile = "ThankShare.mp3"
            volume = 100
            requests.post('http://'+ip+'/api/audio/play',json={"fileName": audioFile, "volume": volume})
        elif interaction == "m":
            pitch = -18
            roll = 0
            yaw = -24
            requests.post('http://'+ip+'/api/head',json={"pitch": pitch, "roll": roll, "yaw": yaw})
            audioFile = "TellMore.mp3"
            volume = 100
            requests.post('http://'+ip+'/api/audio/play',json={"fileName": audioFile, "volume": volume})
        elif interaction == "f":
            pitch = -18
            roll = 0
            yaw = -24
            requests.post('http://'+ip+'/api/head',json={"pitch": pitch, "roll": roll, "yaw": yaw})
            audioFile = "FineThank.mp3"
            volume = 100
            requests.post('http://'+ip+'/api/audio/play',json={"fileName": audioFile, "volume": volume})
        elif interaction == "q":
            pitch = -18
            roll = 0
            yaw = -24
            requests.post('http://'+ip+'/api/head',json={"pitch": pitch, "roll": roll, "yaw": yaw})
            audioFile = "FillGodspeed.mp3"
            volume = 100
            requests.post('http://'+ip+'/api/audio/play',json={"fileName": audioFile, "volume": volume})
        elif interaction == "n":
            audioFile = "NoProblem.mp3"
            volume = 100
            requests.post('http://'+ip+'/api/audio/play',json={"fileName": audioFile, "volume": volume})
        elif interaction == "r":
            audioFile = "Ready.mp3"
            volume = 100
            requests.post('http://'+ip+'/api/audio/play',json={"fileName": audioFile, "volume": volume})
        elif interaction == "s":
            pitch = 9
            roll = 0
            yaw = 30
            requests.post('http://'+ip+'/api/head',json={"pitch": pitch, "roll": roll, "yaw": yaw})
        elif interaction == "2":
            state = "watchingvideos"
        elif interaction == "0":
            state = "ending"
            
        else:
            print("no correct input")

    #Stata when the experiment is over and Misty kindly says goodbye
    elif state == "ending":
        interaction = input("Ending message e.: ")
        if interaction == "e":
            pitch = -18
            roll = 0
            yaw = -24
            requests.post('http://'+ip+'/api/head',json={"pitch": pitch, "roll": roll, "yaw": yaw})
            audioFile = "EndExit.mp3"
            volume = 100
            requests.post('http://'+ip+'/api/audio/play',json={"fileName": audioFile, "volume": volume})
        elif interaction == "q":
            print("no correct input") 
        elif interaction == "2":
            state = "interaction"
        elif interaction == "0":
            state = "welcome"
        else:
            print("no correct input")
            
    elif state == "stop":
        print("Misty stopped")
        break
