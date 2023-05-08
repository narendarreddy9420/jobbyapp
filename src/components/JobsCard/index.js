import './index.css'
import {Link} from 'react-router-dom'

const JobsCard = props => {
  const {eachDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = eachDetails
  return (
    <div>
      <Link to={`/jobs/${id}`}>
        <li>
          <img src={companyLogoUrl} alt="company_logo_url" />
          <h1>{title}</h1>
          <p>{rating}</p>
          <p>{location}</p>
          <p>{employmentType}</p>
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </li>
      </Link>
    </div>
  )
}

export default JobsCard
