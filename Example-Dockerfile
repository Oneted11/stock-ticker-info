# syntax=docker/dockerfile:1
# Use Python37
FROM python:3.7
#use folder called app within the container
WORKDIR /app
# Copy requirements.txt to the docker image and install packages
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .
# Expose port 5000
EXPOSE 5000
ENV PORT 5000


# Use gunicorn as the entrypoint
CMD exec gunicorn --bind :$PORT app:app --workers 1 --threads 1 --timeout 60
#for use during development
# CMD [ "python", "-m" , "flask", "run", "--host=0.0.0.0","--debugger"]
