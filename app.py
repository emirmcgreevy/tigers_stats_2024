from flask import Flask, jsonify, render_template
import pandas as pd

app = Flask(__name__)

@app.route('/api/stats', methods=['GET'])
def get_stats():
    df = pd.read_csv('tigers_regular_batting.csv')
    data = df.to_dict(orient='records')
    return jsonify(data)

@app.route('/api/pitching_stats', methods=['GET'])
def get_pitching_stats():
    df = pd.read_csv('tigers_regular_pitching.csv')
    data = df.to_dict(orient='records')
    return jsonify(data)

@app.route('/api/playoff_batting_stats', methods=['GET'])
def get_playoff_batting_stats():
    df = pd.read_csv('tigers_post_batting.csv')
    data = df.to_dict(orient='records')
    return jsonify(data)

@app.route('/api/playoff_pitching_stats', methods=['GET'])
def get_playoff_pitching_stats():
    df = pd.read_csv('tigers_post_pitching.csv')
    data = df.to_dict(orient='records')
    return jsonify(data)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/playoffs')
def playoffs():
    return render_template('playoffs.html')

@app.route('/home')
def home():
    return render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True, port=8000)

