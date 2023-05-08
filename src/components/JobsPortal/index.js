import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import ProfileInfo from '../ProfileInfo'
import FilterJobs from '../FilterJobs'
import JobsCard from '../JobsCard'

import Header from '../Header'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatus1 = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobsPortal extends Component {
  state = {
    dataList: [],
    searchInput: '',
    minPackage: '',
    typeOfEmployment: '',
    apiStatus: apiStatus1.initial,
  }

  componentDidMount = () => {
    this.getResults()
  }

  onChangeSearchInput1 = value => {
    this.setState({searchInput: value})
  }

  onClickEmploymentTypeId1 = id => {
    this.setState({typeOfEmployment: id}, this.getResults)
  }

  onClickSalary1 = id => {
    this.setState({minPackage: id}, this.getResults)
  }

  onChangeKey1 = () => {
    this.getResults()
  }

  onClickButton = () => {
    this.setState({apiStatus: apiStatus1.failure})
  }

  getResults = async () => {
    this.setState({apiStatus: apiStatus1.inProgress})
    const {typeOfEmployment, minPackage, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${typeOfEmployment}&minimum_package=${minPackage}&search=${searchInput}`

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        package: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({dataList: updatedData, apiStatus: apiStatus1.success})
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiStatus1.failure})
    }
  }

  renderSuccessView = () => {
    const {dataList} = this.state
    const dataLength = dataList.length > 0

    return dataLength ? (
      <div>
        <ul>
          {dataList.map(each => (
            <JobsCard eachDetails={each} key={each.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt=""
        />
      </div>
    )
  }

  renderFailureView = () => (
    <div>
      <button type="button">Retry</button>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1>Oops!Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button type="button" onClick={this.onClickButton}>
          Retry
        </button>
      </div>
    </div>
  )

  renderLoaderView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatus1.success:
        return this.renderSuccessView()
      case apiStatus1.failure:
        return this.renderFailureView()
      case apiStatus1.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div>
        <Header />
        <ProfileInfo />
        <FilterJobs
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
          searchInput={searchInput}
          onChangeSearchInput1={this.onChangeSearchInput1}
          onClickEmploymentTypeId1={this.onClickEmploymentTypeId1}
          onClickSalary1={this.onClickSalary1}
          onChangeKey1={this.onChangeKey1}
        />
        {this.renderDetails()}
      </div>
    )
  }
}

export default JobsPortal
