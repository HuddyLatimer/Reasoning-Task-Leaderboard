import { useState } from 'react'
import axios from 'axios'

export default function SubmissionForm() {
  const [formData, setFormData] = useState({
    model_name: '',
    dataset: '',
    category: '',
    file: null as File | null
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.file) {
      setMessage('Please select a JSON file')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const fileReader = new FileReader()
      fileReader.onload = async (e) => {
        const outputs = JSON.parse(e.target?.result as string)
        
        const response = await axios.post('http://localhost:5000/api/submit', {
          model_name: formData.model_name,
          dataset: formData.dataset,
          category: formData.category,
          outputs
        })

        setMessage(`Submission successful! Accuracy: ${(response.data.accuracy * 100).toFixed(2)}%`)
        setFormData({
          model_name: '',
          dataset: '',
          category: '',
          file: null
        })
      }

      fileReader.readAsText(formData.file)
    } catch (error) {
      console.error('Error submitting results:', error)
      setMessage('Error submitting results. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          Submit Model Results
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="model_name" className="block text-sm font-medium text-gray-700">
              Model Name
            </label>
            <input
              type="text"
              id="model_name"
              value={formData.model_name}
              onChange={(e) => setFormData({ ...formData, model_name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="dataset" className="block text-sm font-medium text-gray-700">
              Dataset
            </label>
            <input
              type="text"
              id="dataset"
              value={formData.dataset}
              onChange={(e) => setFormData({ ...formData, dataset: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select a category</option>
              <option value="math">Math</option>
              <option value="logic">Logic</option>
              <option value="cs">Computer Science</option>
            </select>
          </div>

          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">
              JSON Results File
            </label>
            <input
              type="file"
              id="file"
              accept=".json"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>

          {message && (
            <div className={`mt-2 text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
