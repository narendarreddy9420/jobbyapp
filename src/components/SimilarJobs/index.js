const SimilarJobs = props => {
  const {eachDetails} = props
  const {
    companyLogo,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = eachDetails
  return (
    <li>
      <img src={companyLogo} alt="" />
      <h1>{title}</h1>
      <p>{rating}</p>
      <p>Description</p>
      <p>{jobDescription}</p>
      <p>{location}</p>
      <p>{employmentType}</p>
    </li>
  )
}
export default SimilarJobs
