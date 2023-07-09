import requests
import json
import mistyPy.mistyPy as mistyPy

misty = None
speaker = "console"
language = "Dutch"

skill_id_eye_contact = "5d3e55e9-c878-4fbc-8d62-172fbdd9c48c"
#event_name = "eye_contact"

skill_id_sense_touch = "0723e9a7-8e10-4931-b2a1-9a36b895a04c"
#event_name = "sense_touch"

skill_id_senior_robot = "fe6336e8-43bf-4afb-aca7-6bccd6f0338a"
event_names = {"happy":"emotion_happy", "enjoy":"emotion_enjoy", "ecstacy":"emotion_ecstacy", "suprise":"emotion_surprised", "standby": "behavior_go_to_standby", "wake_up": "behavior_wake_up", "sad": "emotion_sadness", "sleep":"emotion_dormi"}

robot_ip = '192.168.0.103'
source = "MyRobotApplication"

def send_command(the_event_name , the_payload, the_source ):
    resp = requests.post('http://'+robot_ip+'/api/skills/event',json={
        "Skill" : skill_id,
        "EventName": the_event_name,
        "Payload": the_payload,
#        { ##"guardian_command": "eye_contact",
#                    "guardian_data": the_command}, # for eye_contact, sense_touch etc
#                    "guardian_data": {"image":the_command,"blinking":True,"time_out":5}}, # for display_faces
        "Source": the_source})
    return resp

def DoInit(the_ip):
    misty = mistyPy.Robot(the_ip) 
    misty.changeLED(0, 0, 255)
    misty.moveHeadPosition(0, 0, 0, 100) # center the head
    misty.moveArmsDegrees(0, 0, 100, 100)
    
    requests.post('http://'+the_ip+'/api/skills/start',json = {"Skill": skill_id_eye_contact})
    requests.post('http://'+the_ip+'/api/skills/start',json = {"Skill": skill_id_sense_touch})
    requests.post('http://'+the_ip+'/api/skills/start',json = {"Skill": skill_id_senior_robot})
    pass

def DoSleep():
    send_command("eye_contact", {"guardian_data":"off"},source)
    send_command(event_names["sleep"],{}, source)
    pass

def DoWakeUp():
    send_command(event_names["wake_up"],{}, source)
    send_command("eye_contact", {"guardian_data":"on"},source)
    pass

def DoReminder():
    send_command("eye_contact", {"guardian_data":"on"},source) # same as "normal" but also turns skill on
    #send_command(event_names["happy"],{}, source)
    Speak("Ik heb een bericht van de gezinszorg voor u.")
    Speak("Het is bijna etenstijd. Heeft u al iets gedronken vanmiddag?")
    choice, text = ChooseOption(["ja", "nee", "ja maar ik heb nog wel dorst", "nee maar ik hoef niets","ik weet het niet"])
    if choice != None:
        if choice == 1:
            send_command(event_names["happy"],{}, source)
            Speak("Fijn om te horen!")
        elif choice == 2:
            send_command(event_names["sad"],{}, source)
            Speak("Dat is jammer! Voldoende drinken is belangrijk")
        elif choice == 3:
            send_command(event_names["happy"],{}, source)
            Speak("Fijn om te horen!")
        elif choice == 4:
            send_command(event_names["sad"],{}, source)
            Speak("Ok, dat is prima maar ik onthou wel even dat u nog niets gehad heeft. Voldoende drinken is goed voor de gezondheid!")
        elif choice == 5:
            send_command(event_names["surprise"],{}, source)
            Speak("Volgens mij heeft u nog niks gehad en voldoende drinken is goed voor de gezondheid.")
    else:
        DoInteractive()



    
    

    pass

def DoLookForPerson():
    send_command("eye_contact", {"guardian_data":"normal"},source)
    result = input("Press enter if person detected.")
    if first_greeting:
        Speak("Hallo, fijn u weer te zien.")
    else:
        Speak("Hallo")

    send_command(event_names["happy"],{}, source)
    pass

def DoDialog():
    pass

def Speak(sentence):
    if speaker == "misty":
        msg = {"Text": "<speak> " + sentence + " </speak>",
               "Flush": false
            #   "UtteranceId": "First"
            }
        requests.post('http://'+robot_ip+'/api/tts/speak',json = msg)
    elif speaker == "nao":
        nao.Say(sentence)
    elif speaker == "console":
        print(sentence)

def ChooseOption(option_list):
    for i in range( length( option_list)):
        print(str(i+1) + ") " + option_list[i])
    done=False
    while not done:
        s=input("Choice: ")
        if s.isdigit():
            choice = int(s)
            the_option = option_list[choice-1]
            done = True
        elif s=="none":
            choice = None
            the_option = None
            done = True
    return choice, the_option

def DoInteractive():
    done = False
    while not done:
        s = input("Type text to speak: ")
        if s!="quit":
            Speak(s)
        else:
            done = True



if __name__=="__main__":
    done = False
    state = "init"
    while not done:
        if state == "init":
            DoInit(robot_ip)
            state = "wake_up"
        elif state == "wake_up":
            DoWakeUp()
            state = "look_for_person"
        elif state == "look_for_person":
            DoLookForPerson()
            state = "reminder"
        elif state == "reminder":
            DoReminder()
            state = "do_dialog"
        elif state == "do_dialog":
            DoDialog()
            state = "sleep"
        elif state == "sleep":
            DoSleep()
        else:
            state = input('type state or done: ')
        

            
