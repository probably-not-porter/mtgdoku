
from flask import Flask, render_template, flash, redirect, request, url_for
from datetime import datetime
import uuid
import random as rand
import string

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
    day = ("0" + str(datetime.now().month))[-2:]
    month = ("0" + str(datetime.now().day))[-2:]

    seed = int(f"{datetime.now().year}{month}{day}")
    daily_board = get_seeded_board(seed)
    return render_template('board.html', board=daily_board, convert_to_url=convert_to_url)

@app.route('/random')
def random():
    user_id = request.args.get('id')

    if not user_id:
        new_id = generate_random_seed()
        return redirect(url_for('random', id=new_id))

    random_board = get_seeded_board(int(user_id))
    return render_template('board.html', board=random_board, convert_to_url=convert_to_url)

def generate_random_seed():
    return '1' + ''.join(rand.choices(string.digits, k=11))

if __name__ == '__main__':
    app.run()