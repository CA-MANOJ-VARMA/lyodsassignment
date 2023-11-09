import './index.css'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

function MostStarredApps() {
  const [allItems, setallItems] = useState([])
  const [reachedBottom, setReachedBottom] = useState(false)
  const [page, setPage] = useState(1)

  const fetchFunction = async () => {
    const url =
      'https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=2'

    const options = {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer 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',
      },
    }
    const fetchUrl = await fetch(url)
    const jsonData = await fetchUrl.json()

    setallItems(jsonData.items)
    // allItems.map(item => console.log(item))
    // console.log(jsonData.items)
  }

  useEffect(() => {
    fetchFunction()
  }, [])
  console.log(allItems)
  // allItems.map(item => console.log(item))

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const offsetHeight = document.documentElement.offsetHeight
  //     const innerHeight = window.innerHeight
  //     const scrollTop = document.documentElement.scrollTop
  //     const hasReachedBottom = offsetHeight - (innerHeight + scrollTop) <= 10

  //     setReachedBottom(hasReachedBottom)
  //   }

  //   window.addEventListener('scroll', handleScroll)

  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])

  // console.log(reachedBottom)

  // function addition

  return (
    <>
      <h1 className="css-header-properties">Most Starred Github Apps</h1>

      <ul className="css-all-repo-details-container">
        {allItems.length !== 0 &&
          allItems.map(item => {
            const date = item.pushed_at
            const newDate = new Date(date).toLocaleDateString()
            const todayDate = new Date().toLocaleDateString()
            const newnewDate = new Date(date).getTime()
            const todayTodayDate = new Date(todayDate).getTime()
            const timeInterval = Math.floor(
              (todayTodayDate - newnewDate) / (1000 * 3600 * 24),
            )

            return (
              <Link
                to={{
                  pathname: `/${item.owner.id}`,
                  state: {owner: [item.name, item.owner.login]},
                }}
                className="css-link-properties"
              >
                <li className="css-single-repo-container" key={item.id}>
                  <div className="css-image-container">
                    <img
                      src={item.owner.avatar_url}
                      alt="avatar"
                      className="css-avatar-properties"
                    />
                  </div>
                  <div className="css-repo-details-container">
                    <h2>{item.name}</h2>
                    <p style={{marginBottom: '10px'}}>{item.description}</p>
                    <div className="css-count-time-container">
                      <div className="css-count-container">
                        <p>{item.open_issues_count}</p>
                        <p>{item.stargazers_count}</p>
                      </div>
                      <p>
                        Last pushed {timeInterval} days ago by {item.full_name}
                      </p>
                    </div>
                  </div>
                </li>
              </Link>
            )
          })}
      </ul>
    </>
  )
}

export default MostStarredApps
