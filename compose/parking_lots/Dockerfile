FROM node:lts
ENV NODE_ENV development

# Install dependencies
RUN apt-get update \
    && apt-get install -y \
        # MongoDB package key deps
        \
        wget \
        software-properties-common \
        dirmngr \
        gnupg \
        \
    && wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | apt-key add - \
    && echo "deb http://repo.mongodb.org/apt/debian stretch/mongodb-org/4.2 main" | tee /etc/apt/sources.list.d/mongodb-org-4.2.list 

RUN apt-get update \
    && apt-get install -y \
    # MongoDB Client deps
    \
    mongodb-org-shell=4.2.7 \
    mongodb-org-tools=4.2.7 \
    # Other build deps
    \
    netcat 

WORKDIR /webapp

# Install webapp dependency packages
COPY ./package.json /webapp/package.json
COPY ./package-lock.json /webapp/package-lock.json
RUN npm install

# Prepare executables
COPY ./bin/entrypoint.sh /entrypoint.sh
RUN sed -i 's/\r//' /entrypoint.sh \
    && chmod +x /entrypoint.sh 


ENTRYPOINT [ "/entrypoint.sh" ]