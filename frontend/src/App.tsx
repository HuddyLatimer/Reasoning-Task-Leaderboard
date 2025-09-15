import { useState } from 'react'
import LeaderboardTable from './components/LeaderboardTable'
import SubmissionForm from './components/SubmissionForm'
import PerformanceChart from './components/PerformanceChart'
import FilterBar from './components/FilterBar'

function App() {
  const [filters, setFilters] = useState({
    category: '',
    dataset: ''
  })

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Reasoning Task Leaderboard
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6">
            <SubmissionForm />
            <FilterBar filters={filters} setFilters={setFilters} />
            <LeaderboardTable filters={filters} />
            <PerformanceChart filters={filters} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App