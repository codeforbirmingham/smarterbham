# https://resin.io/blog/building-arm-containers-on-any-x86-machine-even-dockerhub/
# https://github.com/resin-io/node-arm/tree/master/debian/armv6hf
# https://docs.resin.io/runtime/resin-base-images/
FROM resin/raspberry-pi-node:8.9

# Set the working directory to /build
WORKDIR /build

# Copy app contents to the container
COPY aws_config.json /build
COPY package.json /build
COPY certs /build/certs
COPY scripts/pkgApp.js /build/scripts/pkgApp.js
COPY src /build/src

# run cross-cpu compile step for armv6
RUN [ "cross-build-start" ]

RUN npm i \
    && npm run dist

RUN [ "cross-build-end" ]