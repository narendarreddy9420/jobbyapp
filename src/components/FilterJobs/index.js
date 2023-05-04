import './index.css'

const FilterJobs = props => {
  const renderEmploymentDetails = () => {
    const {employmentTypesList} = props
    return employmentTypesList.map(each => {
      const onClickEmploymentTypeId = () => {
        const {onClickEmploymentTypeId1} = props
        onClickEmploymentTypeId1(each.employmentTypeId)
      }

      return (
        <li key={each.employmentTypeId} onClick={onClickEmploymentTypeId}>
          {each.label}
        </li>
      )
    })
  }

  const renderEmploymentDetails1 = () => (
    <div>
      <h1>Type of Employment</h1>
      <ul>{renderEmploymentDetails()}</ul>
    </div>
  )

  const renderSalaryDetails = () => {
    const {salaryRangesList} = props
    return salaryRangesList.map(each => {
      const onClickSalary = () => {
        const {onClickSalary1} = props
        onClickSalary1(each.salaryRangeId)
      }
      return (
        <li key={each.salaryRangeId} onClick={onClickSalary}>
          {each.label}
        </li>
      )
    })
  }

  const renderSalaryDetails1 = () => (
    <div>
      <h1>SalaryRange</h1>
      <ul>{renderSalaryDetails()}</ul>
    </div>
  )

  const onChangeSearchInput = event => {
    const {onChangeSearchInput1} = props
    onChangeSearchInput1(event.target.value)
  }

  const onChangeKey = event => {
    const {onChangeKey1} = props
    if (event.key === 'Enter') {
      onChangeKey1()
    }
  }

  const renderSearchDetails1 = () => {
    const {searchInput} = props
    return (
      <div>
        <input
          value={searchInput}
          onChange={onChangeSearchInput}
          onKeyDown={onChangeKey}
        />
      </div>
    )
  }

  return (
    <div>
      {renderEmploymentDetails1()}
      {renderSalaryDetails1()}
      {renderSearchDetails1()}
    </div>
  )
}

export default FilterJobs
