#!/bin/python

# wiring info (BCM pins)
POWER_BTN = 20 # hi = on
AP_SWITCH = 21 # hi = access point
STATUS_LED = 12 # hi = on
STATUS_RED = 25
STATUS_GREEN = 24
STATUS_BLUE = 23

import RPi.GPIO as GPIO
import time
import os

# use the broadcom pin numbers instead of physical pin numbers
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

def shutdown(channel):
    print "shutting down"
    set_rgb(1,0,0)
    os.system("sudo shutdown -h now")

def start_ap_mode():
    print "starting access point"
    set_rgb(0,1,0)
    #os.system("sudo service hostapd start")

def stop_ap_mode():
    print "stopping access point"
    set_rgb(0,0,1)
    #os.system("sudo service hostapd stop")

ap_mode = False
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

def set_rgb(r, g, b):
    GPIO.output(STATUS_RED, 1-r)
    GPIO.output(STATUS_GREEN, 1-g)
    GPIO.output(STATUS_BLUE, 1-b)

# status indicator led
GPIO.setup(STATUS_LED, GPIO.OUT, initial = 1)
GPIO.setup(STATUS_RED, GPIO.OUT, initial = 1)
GPIO.setup(STATUS_GREEN, GPIO.OUT, initial = 1)
GPIO.setup(STATUS_BLUE, GPIO.OUT, initial = 1)

# watch when our power button goes low
GPIO.setup(POWER_BTN, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.add_event_detect(POWER_BTN, GPIO.FALLING, callback = shutdown, bouncetime = 2000)

# watch the access point switch
GPIO.setup(AP_SWITCH, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.add_event_detect(AP_SWITCH, GPIO.BOTH, callback = access_point);
access_point(AP_SWITCH)

while 1:
    time.sleep(1)
