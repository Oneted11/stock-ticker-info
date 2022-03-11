
from flask import Flask, request, render_template, url_for, flash, redirect, request, session, jsonify
import logging


app = Flask(__name__)


@app.route('/')
def hello():
    app.logger.info('healthy')
    return "<h1>HEllO WORLD</h1>"


if __name__ == '__main__':
    app.run()
