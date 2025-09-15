# Reasoning Task Leaderboard

A web-based leaderboard system for tracking and comparing LLM performance on reasoning tasks. Built with React, Flask, and MongoDB.

## Features

- 📊 Real-time leaderboard with performance rankings
- 📈 Interactive performance charts showing accuracy trends
- 🔍 Filter results by task category and dataset
- 📤 Upload model outputs in JSON format
- 📥 Export results to CSV
- 🎯 Automatic evaluation for different task categories:
  - Mathematical reasoning
  - Logical reasoning
  - Computer Science problems

## Tech Stack

- **Frontend**:
  - React with TypeScript
  - Tailwind CSS for styling
  - Recharts for data visualization
  - Axios for API communication

- **Backend**:
  - Flask
  - MongoDB for data storage
  - Python evaluation modules

## Prerequisites

- Python 3.8+
- Node.js 16+
- MongoDB

## Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd reasoning-task-leaderboard
```

2. Set up the backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. Set up the frontend:
```bash
cd frontend
npm install
```

4. Create a `.env` file in the backend directory:
```
MONGODB_URI=mongodb://localhost:27017/
```

## Running the Application

1. Start MongoDB:
```bash
mongod
```

2. Start the backend server:
```bash
cd backend
python app.py
```

3. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Usage

### Submitting Results

1. Prepare your model outputs in JSON format:
```json
{
  "question_id_1": "answer_1",
  "question_id_2": "answer_2"
}
```

2. Use the submission form to upload your results:
   - Enter model name
   - Select task category (math/logic/cs)
   - Choose dataset
   - Upload JSON file

### Viewing Results

- The leaderboard displays all submissions ranked by accuracy
- Use filters to view results for specific:
  - Task categories
  - Datasets
- View performance trends in the chart section
- Export results to CSV for further analysis

## API Endpoints

- `POST /api/submit`: Submit model results
  - Required fields: model_name, dataset, category, outputs

- `GET /api/leaderboard`: Get leaderboard data
  - Optional query params: category, dataset

- `GET /api/export`: Download results as CSV

## Evaluation Criteria

### Math Tasks
- Numerical answers: Exact match with tolerance of 1e-6
- Text answers: Case-insensitive string comparison

### Logic Tasks
- Boolean values: Exact match
- Text answers: Case-insensitive string comparison

### Computer Science Tasks
- Data structures (lists, dicts): Exact match
- Text answers: Case-insensitive string comparison

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

[Your chosen license]
