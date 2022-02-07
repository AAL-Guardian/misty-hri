#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Feb 22 12:16:49 2021

@author: raymond
"""
import requests
import json

robot_ip = '192.168.178.66'
source = "MyRobotApplication"
#skill_id = "5d3e55e9-c878-4fbc-8d62-172fbdd9c48c"
#event_name = "eye_contact"

#skill_id = "0723e9a7-8e10-4931-b2a1-9a36b895a04c"
#event_name = "sense_touch"

skill_id = "6ca82a95-01f2-4a85-b6e0-fc3480fef6cb"
event_name = "listen_voices"

def send_command(the_command, the_event_name = event_name, the_source = source):
    resp = requests.post('http://'+robot_ip+'/api/skills/event',json={
        "Skill" : skill_id,
        "EventName": the_event_name,
        "Payload": { ##"guardian_command": "eye_contact",
                    "guardian_data": the_command},
        "Source": the_source})
    return resp

done=False
while not done:
    s=raw_input("Give a command or type quit: ")
    if s=="quit":
        done=True
    else:
        resp = send_command(s)
        print(resp.json())

