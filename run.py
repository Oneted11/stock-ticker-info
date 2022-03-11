from flask import Flask, request, render_template, url_for, flash, redirect, request, session, jsonify
from logging.config import dictConfig

dictConfig({
    'version': 1,
    'formatters': {'default': {
        'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
    }},
    'handlers': {'wsgi': {
        'class': 'logging.StreamHandler',
        'stream': 'ext://flask.logging.wsgi_errors_stream',
        'formatter': 'default'
    }},
    'root': {
        'level': 'INFO',
        'handlers': ['wsgi']
    }
})


app = Flask(__name__)


@app.route("/")
def default():
    return "<h1>HELLO WORLD!!!</h1>"


@app.route('/print')
def printMsg():
    app.logger.warning("testing testing warning 123")
    app.logger.error("thsi is an error log from the user")
    app.logger.info("this isjust testing the info logging")
    return "Check the bloody console, where its running"


if __name__ == '__main__':
    app.run(debug=True)
