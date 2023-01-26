
# Use the official lightweight Python image.
# https://hub.docker.com/_/python
FROM python:3.10-slim

# Allow statements and log messages to immediately appear in the Knative logs
ENV PYTHONUNBUFFERED True

# Copy local code to the container image.
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

# Install production dependencies.
RUN pip install --no-cache-dir -r requirements.txt

# Run the web service on container startup. Here we use the gunicorn
# webserver, with one worker process and 8 threads.
# For environments with multiple CPU cores, increase the number of workers
# to be equal to the cores available.
# Timeout is set to 0 to disable the timeouts of the workers to allow Cloud Run to handle instance scaling.
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 app:app

# configure the container to run in an executed manner
# ENTRYPOINT [ "python" ]

# CMD ["app.py" ]


# # syntax=docker/dockerfile:1
# # Use Python37
# FROM python:3.7
# #use folder called app within the container
# WORKDIR /app
# # Copy requirements.txt to the docker image and install packages
# COPY requirements.txt requirements.txt
# RUN pip install -r requirements.txt

# COPY . .
# # Expose port 5000
# EXPOSE 5000
# ENV PORT 5000


# # Use gunicorn as the entrypoint
# CMD exec gunicorn --bind :$PORT app:app --workers 1 --threads 1 --timeout 60
# #for use during development
# # CMD [ "python", "-m" , "flask", "run", "--host=0.0.0.0","--debugger"]
