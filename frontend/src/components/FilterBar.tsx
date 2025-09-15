interface FilterBarProps {
  filters: {
    category: string
    dataset: string
  }
  setFilters: React.Dispatch<React.SetStateAction<{
    category: string
    dataset: string
  }>>
}

export default function FilterBar({ filters, setFilters }: FilterBarProps) {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category-filter"
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">All Categories</option>
              <option value="math">Math</option>
              <option value="logic">Logic</option>
              <option value="cs">Computer Science</option>
            </select>
          </div>

          <div>
            <label htmlFor="dataset-filter" className="block text-sm font-medium text-gray-700">
              Dataset
            </label>
            <input
              type="text"
              id="dataset-filter"
              value={filters.dataset}
              onChange={(e) => setFilters(prev => ({ ...prev, dataset: e.target.value }))}
              placeholder="Filter by dataset"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
