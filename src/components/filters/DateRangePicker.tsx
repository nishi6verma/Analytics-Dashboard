import { useState } from 'react'
import { Button } from '../../../components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover'
import { Calendar } from 'lucide-react'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

export function DateRangePicker({
  onDateChange,
}: {
  onDateChange: (dates: { startDate: Date; endDate: Date }) => void
}) {
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Calendar className="w-4 h-4 mr-2" /> Date Range
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <DateRange
          editableDateInputs={true}
          onChange={item => {
            if (item.selection.startDate && item.selection.endDate) {
              setDates(item.selection)
              onDateChange({
                startDate: item.selection.startDate,
                endDate: item.selection.endDate,
              })
            }
          }}
          moveRangeOnFirstSelection={false}
          ranges={[dates]}
        />
      </PopoverContent>
    </Popover>
  )
}