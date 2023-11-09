import './index.css'
import {useState, useEffect} from 'react'

function RepoDetails(props) {
  const [repDetails, setDetails] = useState('')
  const [time, setTime] = useState(0)

  const fetchFunction = async (name, repo) => {
    const url = `https://api.github.com/repos/${repo}/${name}`

    const options = {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer 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',
      },
    }
    const fetchUrl = await fetch(url, options)
    const jsonData = await fetchUrl.json()
    // console.log(jsonData)
    setDetails(jsonData)
    const date = jsonData.pushed_at
    console.log(date)
    const newDate = new Date(date).toLocaleDateString()
    const todayDate = new Date().toLocaleDateString()
    const newnewDate = new Date(date).getTime()
    const todayTodayDate = new Date(todayDate).getTime()
    const timeInterval = Math.floor(
      (todayTodayDate - newnewDate) / (1000 * 3600 * 24),
    )
    setTime(timeInterval)
    // allItems.map(item => console.log(item))
    // console.log(jsonData.items)
  }
  console.log(repDetails)

  useEffect(() => {
    const {location} = props
    const {state} = location
    const {owner} = state
    // console.log(owner[0])
    fetchFunction(owner[0], owner[1])
  }, [])

  return (
    <>
      {repDetails !== '' && (
        <div className="css-single-repo-container-1">
          <div>
            <p>Organisation Avatar</p>
            <img
              src={repDetails.owner.avatar_url}
              alt="org"
              className="css-avatar-properties"
            />
          </div>
          <div className="css-repo-details-container">
            <h2>{repDetails.name}</h2>
            <p style={{marginBottom: '10px'}}>{repDetails.description}</p>
            <div className="css-count-time-container">
              <div className="css-count-container">
                <p>{repDetails.open_issues_count}</p>
                <p>{repDetails.stargazers_count}</p>
              </div>
              <p>
                Last pushed {time} days ago by {repDetails.full_name}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RepoDetails
