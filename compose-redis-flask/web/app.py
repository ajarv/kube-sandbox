# app.py


from flask import Flask
from flask import request, render_template,Response
import time

import redis


app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)


def get_hit_count():
    retries = 5
    while True:
        try:
            return cache.incr('hits')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)


@app.route('/')
def hello():
    count = get_hit_count()
    body = "Hello world, I have been called {count} times".format(count=count)
    rval = """
Headers
---
{headers}
Body
---
{body}
    """.format(headers=request.headers,body=body)
    resp = Response(rval)
    resp.headers['Content-Type'] = 'text/plain'
    return resp



if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)