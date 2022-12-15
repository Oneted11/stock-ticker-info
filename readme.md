# Live in Production

[https://web-production-ba11.up.railway.app/](https://web-production-ba11.up.railway.app/)
or

[https://stock-info-summary.herokuapp.com/](https://stock-info-summary.herokuapp.com/)

# How to run

## Development

```bash
export FLASK_ENV=development FLASK_APP=run.py && flask run
```
### In docker on local machine
```bash
$ docker build <path_to_folder_with_dockerfile> -t <name_you_want_for_container>
$ docker run -p 5000:5000 <name_you_gave_container>:latest
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

## Javascript Dates

> Dead simple inbuilt way of formatting dates in javascript is `.toDateString()` it gives you a simple date eg **Mon Apr 25 2022** and not the TMI that is the default i.e. **Mon Apr 25 2022 10:08:54 GMT+0300 (East Africa Time)** more info about dates can be found on W3 schools excelent [Date Reference](https://www.w3schools.com/jsref/jsref_obj_date.asp)

## Add heroku cli

> To add heroku to existing git

Gain Access

`heroku login`

Add remote repository

`heroku git:remote -a <name of application>`

Deploy to heroku

`git push heroku`

## Github Actions

I tried using github actions to automate pushing to heroku when master branch is updated. In the process learned how to use github actions. Its a nifty thing for CI/CD. Best Tutorial I fround for my usecase was this [one](https://remarkablemark.org/blog/2021/03/12/github-actions-deploy-to-heroku/)

```
name: Deploy

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-latest
    env:
      SECRET_KEY: ${{secrets.HEROKU_TOKEN}}
      EMAIL: ${{secrets.HEROKU_EMAIL}}

    steps:
      - uses: actions/checkout@v2
      - name: Install git
        run: sudo apt install git
      - name: Install heroku
        run: sudo wget -qO- https://toolbelt.heroku.com/install-ubuntu.sh | sh
      - name: Create heroku login file credentials
        run:
          echo "machine api.heroku.com\n  login $EMAIL\n  password $SECRET_KEY\nmachine git.heroku.com\n  login $EMAIL\n  password $SECRET_KEY" >~/.netrc
          cat ~/.netrc
      - name: Add heroku remote repo
        run: heroku git:remote -a <App Name on Heroku>
      - name: Push to Heroku
        run: git push heroku master
```

## How to setup docker

after install on anything with a terminal
> run the following:

```bash
sudo systemctl start docker.service
sudo systemctl enable docker.service
sudo usermod -aG docker $USER
```

First line is to start the docker daemon

Second Line is to setup docker daemon to start at start-up so you don't need to touch systemctl again

Third line allows the non-root user(you my guy) to do docker stuff without `sudo` infront of every command, That pesky "access denied" will weigh on your very soul

> Highly encourage you to read [this short article to get back to speed](https://linuxconfig.org/manjaro-linux-docker-installation)
