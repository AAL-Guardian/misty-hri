#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Feb 22 12:16:49 2021

@author: raymond
"""
import requests
import json

robot_ip = '192.168.178.66'
skill_id = "5d3e55e9-c878-4fbc-8d62-172fbdd9c48c"

def send_command(the_command):
    resp = requests.post('http://'+robot_ip+'/api/skills/event',json={
        "Skill" : skill_id,
        "EventName": "eye_contact",
        "Payload": { ##"guardian_command": "eye_contact",
                    "guardian_data": the_command},
        "Source": "MyRobotApplication"})
    return resp

s=""
while not s=="quit":
    s=input("Give a command or type quit: ")
    resp = send_command(s)
    print(resp.json())

