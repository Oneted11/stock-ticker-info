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
    today = datetime.datetime.now().strftime("%Y-%m-%d")
    epoch_today = int(datetime.datetime.now().timestamp())
    epoch_yr_ago = epoch_today - 31556926
    time_ago = (datetime.datetime.now() -
                datetime.timedelta(days=365)).strftime("%Y-%m-%d")
    candles = finnhub_client.stock_candles(
        (ticker_value), 'D', epoch_yr_ago, epoch_today)

    news = finnhub_client.company_news(
        ticker_value, _from=time_ago, to=today)

    merged_data = profile.copy()
    merged_data.update(quotes)
    merged_data.update(candles)
    merged_data.update({'recommendations': recommend})
    merged_data.update({'news': news})
    # logging
    # app.logger.info(epoch_yr_ago)

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


@app.route('/?ticker=<thingie>')
def wrongroute():
    return redirect(url_for('hello'))


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
