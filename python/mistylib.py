import requests
import json
import mistyPy.mistyPy as mistyPy

if __name__=="__main__":
    # TODO: Replace with your IP
    misty = mistyPy.Robot("192.168.178.66") # This is the IP of my misty. Replace with your IP
    misty.changeLED(0, 0, 255)
    misty.moveHeadPosition(0, 0, 0, 100) # center the head
    misty.moveArmsDegrees(0, 0, 100, 100)

