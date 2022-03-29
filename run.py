from markupsafe import escape
from flask import Flask, request, render_template, url_for, flash, redirect, request, session, jsonify
import logging
import finnhub
import json
import datetime

app = Flask(__name__)
finnhub_client = finnhub.Client(api_key="c8kdqgqad3ibbdm3p040")


@app.route('/')
def hello():
    app.logger.info('healthy')
    return render_template("index.html")


@app.route("/ticker/<ticker>")
def ticker_info(ticker):
    ticker_value = ticker.upper()
    profile = finnhub_client.company_profile2(symbol=ticker_value)
    quotes = finnhub_client.quote(ticker_value)
    recommend = finnhub_client.recommendation_trends(ticker_value)
    # recommend = json.dumps(recommend)
    candles = finnhub_client.stock_candles(
        (ticker_value), 'D', 1590988249, 1591852249)
    today = datetime.datetime.now().strftime("%Y-%m-%d")
    # days = datetime.timedelta(days=1)
    # days_prior = today - days
    # days_prior.strftime("%Y-%m-%d")
    year_ago = (datetime.datetime.now() -
                datetime.timedelta(days=365)).strftime("%Y-%m-%d")
    news = finnhub_client.company_news(
        ticker_value, _from=year_ago, to=today)
    # news = json.dumps(news)
    merged_data = profile.copy()
    merged_data.update(quotes)
    merged_data.update(candles)
    merged_data.update({'recommendations': recommend})
    merged_data.update({'news': news})
    app.logger.info(news)
    # app.logger.info(days_prior)

    return merged_data


@app.route('/capitalize/<word>/')
def capitalize(word):
    return '<h1>{}</h1>'.format(escape(word.capitalize()))


@app.route('/print')
def printMsg():
    app.logger.warning("testing testing warning 123")
    app.logger.error("thsi is an error log from the user")
    app.logger.info("this isjust testing the info logging")
    return "Check the bloody console, where its running"


if __name__ == '__main__':
    app.run()
