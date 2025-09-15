import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

interface Submission {
  model_name: string
  accuracy: number
  timestamp: string
}

interface ChartData {
  timestamp: string
  [key: string]: number | string
}

interface PerformanceChartProps {
  filters: {
    category: string
    dataset: string
  }
}

export default function PerformanceChart({ filters }: PerformanceChartProps) {
  const [data, setData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (filters.category) params.append('category', filters.category)
        if (filters.dataset) params.append('dataset', filters.dataset)
        
        const response = await axios.get(`http://localhost:5000/api/leaderboard?${params}`)
        const submissions: Submission[] = response.data

        // Group submissions by model and create time series data
        const modelSubmissions = new Map<string, Submission[]>()
        submissions.forEach(submission => {
          const existing = modelSubmissions.get(submission.model_name) || []
          modelSubmissions.set(submission.model_name, [...existing, submission])
        })

        // Convert to chart data format
        const chartData: ChartData[] = []
        modelSubmissions.forEach((submissions, model) => {
          submissions.forEach(submission => {
            const date = new Date(submission.timestamp).toLocaleDateString()
            const existingDataPoint = chartData.find(d => d.timestamp === date)
            
            if (existingDataPoint) {
              existingDataPoint[model] = submission.accuracy * 100
            } else {
              chartData.push({
                timestamp: date,
                [model]: submission.accuracy * 100
              })
            }
          })
        })

        // Sort by date
        chartData.sort((a, b) => 
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        )

        setData(chartData)
      } catch (error) {
        console.error('Error fetching chart data:', error)
      }
      setLoading(false)
    }

    fetchData()
  }, [filters])

  if (loading) {
    return <div className="text-center py-4">Loading...</div>
  }

  const models = Array.from(
    new Set(
      data.flatMap(d => 
        Object.keys(d).filter(key => key !== 'timestamp')
      )
    )
  )

  const colors = [
    '#2563eb', '#dc2626', '#16a34a', '#9333ea',
    '#ea580c', '#0d9488', '#db2777', '#84cc16'
  ]

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Performance Over Time
        </h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis
                label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft' }}
                domain={[0, 100]}
              />
              <Tooltip />
              <Legend />
              {models.map((model, index) => (
                <Line
                  key={model}
                  type="monotone"
                  dataKey={model}
                  stroke={colors[index % colors.length]}
                  name={model}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
