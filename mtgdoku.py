
from flask import Flask, render_template, flash, redirect
from datetime import datetime

from database import get_random_board, get_seeded_board
from public_functions import convert_to_url

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/daily')
def daily():
    seed = int(f"{datetime.now().year}{datetime.now().month}{datetime.now().day}")
    daily_board = get_seeded_board(seed)
    return render_template('board.html', board=daily_board, convert_to_url=convert_to_url)

@app.route('/random')
def random():
    random_board = get_random_board()
    return render_template('board.html', board=random_board, convert_to_url=convert_to_url)


if __name__ == '__main__':
    app.run()