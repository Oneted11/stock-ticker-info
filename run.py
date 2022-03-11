from flask import Flask, request, render_template, url_for, flash, redirect, request, session, jsonify
import logging

app = Flask(__name__)

@app.route('/')
def hello():
    app.logger.info('healthy')
    return "<h1>HEllO WORLD</h1>"

@app.route('/print')
def printMsg():
    app.logger.warning("testing testing warning 123")
    app.logger.error("thsi is an error log from the user")
    app.logger.info("this isjust testing the info logging")
    return "Check the bloody console, where its running"

if __name__ == '__main__':
    app.run()
