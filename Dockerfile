FROM golang:1.8

EXPOSE 3000

ADD . /goWorkspace/src/github.com/torquemad/sokit

RUN go install torquemad/sokit/sokit

CMD sokit
