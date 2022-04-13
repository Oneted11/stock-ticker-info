# How to run

## Development

```bash
export FLASK_ENV=development FLASK_APP=run.py && flask run
```

## Production

```bash
export FLASK_APP=run.py && flask run
```

# Today I Learned

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

## Optional chaining in a try-catch

So you are getting data in a try catch but keep getting undefined warnings or errors and want to get rid of them.something like [this](https://stackoverflow.com/questions/70323749/typeerror-cannot-read-properties-of-undefined-reading-catch) ,Apparently called a null reference. You can do [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining).Optional chaining allows you to check if the dat yopure expecting is there then continue along the chain, otherwise stop. It can be used as a check null if statement. but more elegant

> very useful for fetching or any other promise based or [High Order Fucntions](https://eloquentjavascript.net/05_higher_order.html) heavy workflow

```javascript
fetch("http://localhost:5000/ticker/" + searchTerm)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  //optional chaining
  ?.catch((error) => {
    console.error("Error:", error);
  });
```

## Arrray.join

Say you're iterating through a couple of objects and outputting an array of html nodes or strings so that you can add them to the DOM mostly using most likely `.innerHTML` . Suddenly they render with commas in-between , bummer. The solution is [array.join](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

```javascript
document.querySelector("#news-container").innerHTML = data.news
  .map((item) => {
    return `
          <div class="news-card">
          <img src=${item.image} >
          <ul><li class="news-title">${item.headline}</li>
          <li class="time">${new Date(item.datetime * 1000)}</li>
          <li> <a class="original-post"href=${
            item.url
          } >See original post</a> </li>
          </ul>
          </div>
          `;
  })
  //remove commas in array of news components
  .join("");
```

## Get a package.json in python

```bash
pip3 freeze > requirements.txt
```

> The command creates a requirements.txt file with all the pip packages used in the project

## Python Datetime

To use you need to import it at the top of the python file as such `import datetime`

Get today date `datetime.datetime.now() `

Get today date in epoch time `datetime.datetime.now().timestamp()`

Format date `datetime.datetime.now().strftime("%Y-%m-%d")`

> capital letters in `.strftime` are longer forms eg **"Y"** is 2010 **"y"** is 10 more information can be found [here](https://www.journaldev.com/23365/python-string-to-datetime-strptime)
