# bham_city_sensor
birmingham city sensor, node implementation

There are some good getting-started details over at http://docs.aws.amazon.com/iot/latest/developerguide/iot-device-sdk-node.html that you should read through before using this.

# installing node on the raspberry pi zero w

First, you should install node. Make sure you do not have any version of node, nodejs or npm already on the raspberry pi. Follow the instructions here https://blog.miniarray.com/installing-node-js-on-a-raspberry-pi-zero-21a1522db2bb

```
sudo su -
apt-get remove --purge npm node nodejs
cd ~
wget http://nodejs.org/dist/v4.2.4/node-v4.2.4-linux-armv6l.tar.gz
cd /usr/local
tar xzvf ~/node-v4.2.4-linux-armv6l.tar.gz --strip=1
```

# checking out the code

```
git clone https://github.com/codeforbirmingham/smarterbham
cd smarterbham/citysensor
npm i
```

# configuration

Download your thing certificates from AWS and place them in the certs directory. You will also need the Symantec root certifacate: https://www.symantec.com/content/en/us/enterprise/verisign/roots/VeriSign-Class%203-Public-Primary-Certification-Authority-G5.pem

```
# copy over your aws thing certificates
mkdir certs
cp ~/Downloads/bqqbbg8gaa-certicate.pem.crt certs/
cp ~/Downloads/bqqbbg8gaa-private.pem.key certs/
cp ~/Downloads/bqqbbg8gaa-public.pem.key certs/
curl https://www.symantec.com/content/en/us/enterprise/verisign/roots/VeriSign-Class%203-Public-Primary-Certification-Authority-G5.pem > certs/root-CA.crt
```

You will also need to modify aws_config.js to include information about your thing. You can get this information from the AWS IoT console.

```
{
    "host":           "dw4nbaojaawgawmeba0mdq.iot.us-east-1.amazonaws.com",
    "port":           8883,
    "clientId":       "MyRaspberryPiClient",
    "thingName":      "MyRaspberryPi",
    "caCert":         "root-CA.crt",
    "clientCert":     "bqqbbg8gaa-certificate.pem.crt",
    "privateKey":     "bqqbbg8gaa-private.pem.key"
} 
```

# running

```
npm start
```

This will run and update the thing's shadow to include new sensor data every so often. You can log into the AWS IoT console and watch the MQTT events for your thing.

# scripts

There is a control script for the pi in scripts/control.py. You should install this and add the following line to your /etc/rc.local

```
python /path/to/code/scripts/control.py &
```