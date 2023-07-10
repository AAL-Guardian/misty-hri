import requests
import json
import mistyPy.mistyPy as mistyPy
import nao_nocv_2_1 as nao
import sys
import time

version = sys.version_info
print(version)
misty = None

def do_input(sentence):
    if version[0]==3:
        return input(sentence)
    else:
        return raw_input(sentence)

language = do_input("Choose language (Dutch or English)")
if language=="Dutch":
    speaker = "nao"
elif language == "English":
    speaker = "misty"
else:
    speaker = "console"

first_greeting = True

skill_id_eye_contact = "5d3e55e9-c878-4fbc-8d62-172fbdd9c48c"
#event_name = "eye_contact"

skill_id_sense_touch = "0723e9a7-8e10-4931-b2a1-9a36b895a04c"
#event_name = "sense_touch"

skill_id_senior_robot = "fe6336e8-43bf-4afb-aca7-6bccd6f0338a"
event_names = {"happy":"emotion_happy", "enjoy":"emotion_enjoy", "ecstacy":"emotion_ecstacy", "surprise":"emotion_surprised", "standby": "behavior_go_to_standby", "wake_up": "behavior_wake_up", "sad": "emotion_sadness", "sleep":"emotion_dormi"}

robot_ip = '192.168.0.100'
source = "MyRobotApplication"

def send_command(skill_id, the_event_name , the_payload, the_source ):
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

    skills = requests.get('http://'+the_ip+'/api/skills')
    print("Skills:")
    for s in skills.json()['result']:
        print s['name']
    print("")

    requests.post('http://'+robot_ip+'/api/skills/cancel',json={})
    time.sleep(3)

    skills_running = requests.get('http://'+the_ip+'/api/skills/running')
    print("Skills running:")
    for s in skills_running.json()['result']:
        print(s['name'])
    print("")

    requests.post('http://'+the_ip+'/api/skills/start',json = {"Skill": skill_id_eye_contact})
    requests.post('http://'+the_ip+'/api/skills/start',json = {"Skill": skill_id_sense_touch})
    requests.post('http://'+the_ip+'/api/skills/start',json = {"Skill": skill_id_senior_robot})
    
    
    if speaker == "nao":
        nao.InitProxy('192.168.0.112')
        nao.Say("Hallo! Ik ben Bender.")
        nao.Crouch()
        pass

def DoSleep():
    send_command(skill_id_eye_contact, "eye_contact", {"guardian_data":"off"},source)
    send_command(skill_id_senior_robot, event_names["sleep"],{}, source)
    pass

def DoWakeUp():
    send_command(skill_id_senior_robot, event_names["wake_up"],{}, source)
    send_command(skill_id_eye_contact, "eye_contact", {"guardian_data":"on"},source)
    pass

def DoReminder():
    send_command(skill_id_eye_contact,"eye_contact", {"guardian_data":"on"},source) # same as "normal" but also turns skill on
    #send_command(event_names["happy"],{}, source)
    if language == "Dutch":
        Speak("Ik heb een bericht van de gezinszorg voor u.")
        Speak("Het is bijna etenstijd. Heeft u al iets gedronken vanmiddag?")
        choice, text = ChooseOption(["ja", "nee", "ja maar ik heb nog wel dorst", "nee maar ik hoef niets","ik weet het niet"])
    else:
        Speak("I have a message for you from your care organisation.")
        Speak("It is almost dinner time. Did you already have something to drink this afternoon?")
        choice, text = ChooseOption(["yes", "no", "yes, but I'm still thirsty.", "No, but I'm good.","I don't know"])
    
    if choice != None:
        if choice == 1:
            send_command(skill_id_senior_robot, event_names["happy"],{}, source)
            if language == "Dutch":
                Speak("Fijn om te horen!")
            else:
                Speak("Glad to hear that.")
        elif choice == 2:
            send_command(skill_id_senior_robot, event_names["sad"],{}, source)
            if language == "Dutch":
                Speak("Dat is jammer! Voldoende drinken is belangrijk")
            else:
                Speak("I am sorry to hear that. You know that drinking sufficiently is good for you.")
        elif choice == 3:
            send_command(skill_id_senior_robot, event_names["happy"],{}, source)
            if language == "Dutch":
                Speak("Fijn om te horen!")
            else:
                Speak("Glad to hear that.")
        elif choice == 4:
            send_command(skill_id_senior_robot, event_names["sad"],{}, source)
            if language == "Dutch":
                Speak("Ok, dat is prima maar ik onthou wel even dat u nog niets gehad heeft. Voldoende drinken is goed voor de gezondheid!")
            else:
                Speak("Ok, that is fine but I will keep in mind you haven't had anything yet. You know drinking sufficienty is good for your health.")
        elif choice == 5:
            send_command(skill_id_senior_robot, event_names["surprise"],{}, source)
            if language == "Dutch":
                Speak("Volgens mij heeft u nog niks gehad en voldoende drinken is goed voor de gezondheid.")
            else:
                Speak("It seems you did not have anything yet.")
    else:
        DoInteractive()



    
    

    pass

def DoLookForPerson():
    global first_greeting

    send_command(skill_id_eye_contact,"eye_contact", {"guardian_data":"normal"},source)
    result = do_input("Press enter if person detected.")
    if first_greeting:
        if language == "Dutch":
            Speak("Hallo, ik ben Misty en ik ben hier om te helpen.")
        else:
            Speak("Hi, I'm Misty and I am here to help.")
        first_greeting = False
    else:
        if language == "Dutch":
            Speak("Fijn u weer te zien!")
        else:
            Speak("Glad to see you again!")

    send_command(skill_id_senior_robot, event_names["happy"],{}, source)
    pass

def DoDialog1():
    pass

def DoDialog2():
    pass

def Speak(sentence):
    if speaker == "misty":
        msg = {"Text": "<speak> " + sentence + " </speak>",
               "Flush": False
            #   "UtteranceId": "First"
            }
        requests.post('http://'+robot_ip+'/api/tts/speak',json = msg)
    elif speaker == "nao":
        nao.Say(sentence)
    elif speaker == "console":
        pass
    print(sentence)

def ChooseOption(option_list):
    for i in range( len( option_list)):
        print(str(i+1) + ") " + option_list[i])
    done=False
    while not done:
        s=do_input("Choice: ")
        if s.isdigit():
            choice = int(s)
            the_option = option_list[choice-1]
            done = True
        else:
            choice = None
            the_option = None
            done = True
    return choice, the_option

def DoInteractive():
    done = False
    while not done:
        s = do_input("Type text to speak or return: ")
        if s!="":
            Speak(s)
        else:
            done = True



if __name__=="__main__":
    state = "init"
    while not state=="done":
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
            answer = DoReminder()
            s=do_input("press key to continue.")
            if answer=="yes":
                state = "do_dialog1"
            else:
                state = "do_dialog2"
        elif state == "do_dialog1":
            DoDialog1()
            state = "sleep"
        elif state == "do_dialog2":
            DoDialog2()
            state = "sleep"
        elif state == "sleep":
            DoSleep()
            state = ""
        else:
            state = do_input('type state or done: ')
     
        

            
