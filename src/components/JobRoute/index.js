import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'
import Header from '../HeaderRoute'
import Profile from '../Profile'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobRoute extends Component {
  state = {
    profileDetails: {},
    apiStatusNow: apiStatus.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  profileFetchSuccess = updatedProfileDetails => {
    this.setState({
      profileDetails: updatedProfileDetails,
      apiStatusNow: apiStatus.success,
    })
  }

  profileFetchFailed = () => {
    this.setState({apiStatusNow: apiStatus.failure})
  }

  getProfileDetails = async () => {
    this.setState({apiStatusNow: apiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const profileData = await response.json()
      const profileDetailsFetched = profileData.profile_details
      const updatedProfileDetails = {
        profileImageUrl: profileDetailsFetched.profile_image_url,
        name: profileDetailsFetched.name,
        shortBio: profileDetailsFetched.short_bio,
      }
      this.profileFetchSuccess(updatedProfileDetails)
    } else {
      this.profileFetchFailed()
    }
  }

  render() {
    const {profileDetails, apiStatusNow} = this.state
    return (
      <>
        <Header />
        <div className="JobRoute-bgContainer">
          <div className="JobRouteSearchDiv">
            <input
              type="search"
              placeholder="Search"
              className="JobRouteSearch"
            />
            <button type="button" testid="searchButton">
              <AiOutlineSearch className="search-icons" />
            </button>
          </div>
          {apiStatusNow === apiStatus.inProgress ? (
            <div className="loader-container" testid="loader">
              <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
            </div>
          ) : null}
          <div>
            {apiStatusNow === apiStatus.success ? (
              <Profile profileDetails={profileDetails} />
            ) : null}
          </div>
        </div>
      </>
    )
  }
}

export default JobRoute
