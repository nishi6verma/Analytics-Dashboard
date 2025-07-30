import { useState } from 'react'
import { Button } from '../../../components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover'
import { Filter } from 'lucide-react'

export function FilterButton({
  filterOptions,
  onApply,
}: {
  filterOptions: { label: string; value: string; options: string[] }[]
  onApply: (filters: Record<string, string[]>) => void
}) {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})

  const handleFilterChange = (category: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category]?.includes(value)
        ? prev[category].filter(v => v !== value)
        : [...(prev[category] || []), value]
    }))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" /> Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        <div className="space-y-4">
          {filterOptions.map(category => (
            <div key={category.value}>
              <h4 className="font-medium mb-2">{category.label}</h4>
              <div className="grid grid-cols-2 gap-2">
                {category.options.map(option => (
                  <label
                    key={option}
                    className="flex items-center space-x-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilters[category.value]?.includes(option)}
                      onChange={() => handleFilterChange(category.value, option)}
                      className="h-4 w-4"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <Button
            className="w-full mt-4"
            onClick={() => onApply(selectedFilters)}
          >
            Apply Filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}