import './index.css'
import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import SimilarJobs from '../SimilarJobs'
import Header from '../Header'

const apiStatus1 = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class JobFullDetails extends Component {
  state = {jobDetails1: {}, similarJobs1: [], apiStatus: apiStatus1.initial}

  componentDidMount = () => {
    this.getResults()
  }

  getSkillsData = data1 => ({
    imageUrl: data1.image_url,
    name: data1.name,
  })

  getLifeAtCompany = data1 => ({
    description: data1.description,
    rating: data1.rating,
  })

  getFetchedData = (data1, jobSkills, jobLife) => ({
    companyLogo: data1.company_logo_url,
    companyWebsite: data1.company_website_url,
    employmentType: data1.employment_type,
    id: data1.id,
    jobDescription: data1.job_description,
    skills: jobSkills,
    lifeAtCompany: jobLife,
    location: data1.location,
    package: data1.package_per_annum,
    rating: data1.rating,
  })

  getSimilarJobs = data1 => ({
    companyLogo: data1.company_logo_url,
    employmentType: data1.employment_type,
    id: data1.id,
    jobDescription: data1.job_description,
    location: data1.location,
    rating: data1.rating,
    title: data1.title,
  })

  getResults = async () => {
    this.setState({apiStatus: apiStatus1.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      Authorization: `Bearer ${jwtToken}`,
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const jobSkills = this.getSkillsData(data.skills)
      const jobLife = this.getLifeAtCompany(data.life_at_company)
      const jobDetails = this.getFetchedData(
        data.job_details,
        jobSkills,
        jobLife,
      )
      const similarJobs = data.similar_jobs.map(each =>
        this.getSimilarJobs(each),
      )
      this.setState({
        jobDetails1: jobDetails,
        similarJobs1: similarJobs,
        apiStatus: apiStatus1.success,
      })
    } else {
      this.setState({apiStatus: apiStatus1.failure})
    }
  }

  renderSuccessView = () => {
    const {jobDetails1, similarJobs1} = this.state
    const {
      companyLogo,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      rating,
    } = jobDetails1
    return (
      <div>
        <img src={companyLogo} alt="" />

        <p>{rating}</p>
        <p>{location}</p>

        <p>{employmentType}</p>
        <h1>Description</h1>
        <p>{jobDescription}</p>
        <p>Skills</p>
        <p>{skills}</p>
        <p>life at company</p>
        <p>{lifeAtCompany}</p>
        <ul>
          {similarJobs1.map(each => (
            <SimilarJobs eachDetails={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div>
      <button type="button">Retry</button>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt=""
        />
        <h1>Oops!Something Went Wrong</h1>
        <p>we cannot seem to find the page you are looking for</p>
        <button type="button">Retry</button>
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
    return (
      <div>
        <Header />
        {this.renderDetails()}
      </div>
    )
  }
}
export default JobFullDetails
