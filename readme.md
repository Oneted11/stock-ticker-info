# How to run

## Development

```bash
export FLASK_ENV=development FLASK_APP=run.py && flask run
```

## Production

```bash
export FLASK_APP=run.py && flask run
```

# Lessons in Flask

## Logging to console

```python
from flask import Flask, request, render_template, url_for, flash, redirect, request, session, jsonify
import logging


app = Flask(__name__)


@app.route('/')
def hello():
    app.logger.info('healthy')
    app.logger.warning("testing testing warning 123")
    app.logger.error("thsi is an error log from the user")
    return "<h1>HEllO WORLD</h1>"


if __name__ == '__main__':
    app.run()

```
