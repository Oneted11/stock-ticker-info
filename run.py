from flask import Flask, request, render_template, url_for, flash, redirect, request, session, jsonify
from flask_bootstrap import Bootstrap
import finnhub
from flask_moment import Moment
import json
import datetime
from dateutil.relativedelta import relativedelta, MO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'SECRETKEYSECRETKEY'

moment = Moment(app)

finnhub_client = finnhub.Client(api_key="c8d1pqqad3i9nv0d4mn0")


@app.route('/', methods=["GET", "POST"])
def gfg():
    if request.method == "GET":
        ticker_value = request.form.get("ticker")
        profile = finnhub_client.company_profile2(symbol=ticker_value)
        quotes = finnhub_client.quote(ticker_value)
        recommend = finnhub_client.recommendation_trends(ticker_value)
        recommend = json.dumps(recommend)
        candles = finnhub_client.stock_candles(
            (ticker_value), 'D', 1590988249, 1591852249)

        today = datetime.datetime.now()
        today.strftime("%Y-%m-%d")
        days = datetime.timedelta(days=30)
        days_prior = today - days
        days_prior.strftime("%Y-%m-%d")
        news = finnhub_client.company_news(
            ticker_value, _from=days_prior, to=today)
        news = json.dumps(news)

        merged_data = profile.copy()
        merged_data.update(quotes)
        merged_data.update(candles)

        return merged_data

    return render_template("index.html")


bootstrap = Bootstrap(app)

if __name__ == '__main__':
    app.run(threaded=True)
