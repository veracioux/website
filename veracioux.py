#!/usr/bin/python
# coding: utf-8
from flask import Flask
import subprocess as sp
import sys

app = Flask(__name__)

@app.route('/')
def entry_point():
    p = sp.run(["uname", "-a"], stdout=sp.PIPE)
    print(type(p.stdout))
    return p.stdout
    #  with open("index.html", "r", encoding="utf-8") as f:
    #      return f.read()

if __name__ == '__main__':
    app.run(debug=True)
