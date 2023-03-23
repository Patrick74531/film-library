import React from 'react'
import './index.css'

function YearDropdown({ handleChangeYear }) {
  const startYear = 2010
  const endYear = 2022
  const years = []
  //generate year
  for (let year = startYear; year <= endYear; year++) {
    years.push(year)
  }

  return (
    <select
      className="year-select"
      onChange={(e) => handleChangeYear(e.target.value)}
    >
      <option className="year-option" value="">
        Select a year
      </option>
      {years.map((year) => (
        <option className="year-option" key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  )
}

export default YearDropdown
