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

## Calling local endpoint

Apparently it's possible, there a re better ways of structuring your server-client archiotecture and this is possibly not a wise move but if you're in a pinch it is possible

> A more sophisticated understanding can be gotten from [stackoverflow](https://stackoverflow.com/questions/48135786/how-to-make-a-get-request-on-another-endpoint-in-node)

```javascript
//js file calling internal endpoint
fetch("http://localhost:5000/ticker/" + searchTerm)
  // .then((response) => response.json())
  .then((data) => {
    console.log("Success:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

```python
#flask endpoint that js is being served from
@app.route('/')
def hello():
    app.logger.info('healthy')
    return render_template("index.html")


```

## String literals

Your can put functions in [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) not just display values

Template literals allow you to add conditional rendering using [ternary operator](https://www.programiz.com/javascript/ternary-operator) in es6 (New-ish js with fat arrows and stuff)

> if you are returning a string from within the ternary operator use different quotes i.e double and single qoutes matching sort of like opening and closing tags

Extracted **code example**

```javascript
<tr>
  <th>Change</th>
    <td id="d">${data.d} ${Number(data.d) > 0 ?
    '<span class="material-icons green">keyboard_arrow_up</span>':
    '<span> class="material-icons red">keyboard_arrow_down</span>'}
    </td>
</tr>
<tr>
  <th>Change Percentage</th>
    <td id="dp">${data.dp} ${Number(data.dp) > 0 ?
    '<span class="material-icons green">keyboard_arrow_up</span>':
    '<span class="material-icons red">keyboard_arrow_down</span>'}
    </td>
</tr>

```
