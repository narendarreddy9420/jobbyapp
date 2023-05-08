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
      <h1>Description</h1>
      <img src={companyLogo} alt="" />
      <h1>{title}</h1>
      <p>{rating}</p>
      <h1>Description</h1>
      <p>{jobDescription}</p>
      <p>{location}</p>
      <p>{employmentType}</p>
    </li>
  )
}
export default SimilarJobs
