from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os
from dotenv import load_dotenv
import pandas as pd

load_dotenv()

app = Flask(__name__)
CORS(app)

client = MongoClient(os.getenv('MONGODB_URI', 'mongodb://localhost:27017/'))
db = client['reasoning_leaderboard']
submissions = db['submissions']

@app.route('/api/submit', methods=['POST'])
def submit_results():
    data = request.json
    model_name = data.get('model_name')
    dataset = data.get('dataset')
    outputs = data.get('outputs')
    
    if not all([model_name, dataset, outputs]):
        return jsonify({'error': 'Missing required fields'}), 400
    
    # TODO: Implement evaluation logic
    accuracy = evaluate_outputs(outputs, dataset)
    
    submission = {
        'model_name': model_name,
        'dataset': dataset,
        'accuracy': accuracy,
        'timestamp': pd.Timestamp.now(),
        'category': data.get('category', 'general')
    }
    
    submissions.insert_one(submission)
    return jsonify({'message': 'Submission successful', 'accuracy': accuracy})

@app.route('/api/leaderboard', methods=['GET'])
def get_leaderboard():
    category = request.args.get('category')
    dataset = request.args.get('dataset')
    
    query = {}
    if category:
        query['category'] = category
    if dataset:
        query['dataset'] = dataset
    
    results = list(submissions.find(
        query,
        {'_id': 0}
    ).sort('accuracy', -1))
    
    return jsonify(results)

@app.route('/api/export', methods=['GET'])
def export_results():
    results = list(submissions.find({}, {'_id': 0}))
    df = pd.DataFrame(results)
    csv_data = df.to_csv(index=False)
    return csv_data, 200, {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename=leaderboard.csv'
    }

from evaluator import evaluate_outputs

if __name__ == '__main__':
    app.run(debug=True)
