FROM resin/rpi-raspbian

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY aws_config.json /app
COPY package.json /app
COPY certs /app
COPY scripts /app
COPY src /app

RUN apt-get -y update && apt-get -qy install \
    wget \
    build-essential

# https://github.com/alexellis/docker-arm/tree/master/images/armv6/node4.x-arm
RUN wget \
  https://nodejs.org/dist/v8.9.0/node-v8.9.0-linux-armv6l.tar.gz
RUN tar -xvf node-*.tar.gz -C /usr/local \
  --strip-components=1