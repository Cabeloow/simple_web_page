FROM debian:bullseye-slim
WORKDIR /app
COPY . .
RUN apt update && apt install curl build-essential python3 python3-pip -y
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN curl https://packages.microsoft.com/config/debian/11/prod.list > /etc/apt/sources.list.d/mssql-release.list && apt update 
RUN ACCEPT_EULA=Y apt-get install -y msodbcsql17
RUN echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc
RUN pip3 install -r requirements.txt
EXPOSE 5000
ENTRYPOINT python3 wsgi.py