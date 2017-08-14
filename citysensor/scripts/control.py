#!/bin/python

# wiring info (BCM pins)
POWER_BTN = 26 # hi = on
AP_SWITCH = 5 # hi = access point
STATUS_LED = 6 # hi = on

import RPi.GPIO as GPIO
import time
import os

# use the broadcom pin numbers instead of physical pin numbers
GPIO.setmode(GPIO.BCM)

def shutdown(channel):
    os.system("sudo shutdown -h now")

def start_ap_mode():
    print "starting access point"
    os.system("sudo service hostapd start")

def stop_ap_mode():
    print "stopping access point"
    os.system("sudo service hostapd stop")

ap_mode = True
def access_point(channel):
    global ap_mode
    time.sleep(.25)
    if GPIO.input(channel):
        if not ap_mode:
            start_ap_mode()
            ap_mode = True
    else:
        if ap_mode:
            stop_ap_mode()
            ap_mode = False

# watch when our power button goes low
GPIO.setup(POWER_BTN, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.add_event_detect(POWER_BTN, GPIO.FALLING, callback = shutdown, bouncetime = 2000)

# watch the access point switch
GPIO.setup(AP_SWITCH, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.add_event_detect(AP_SWITCH, GPIO.BOTH, callback = access_point);
access_point(AP_SWITCH)

# status indicator led
GPIO.setup(STATUS_LED, GPIO.OUT, initial = 1)

while 1:
    time.sleep(1)
