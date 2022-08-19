import HeaderRoute from '../HeaderRoute'
import './index.css'

const HomeRoute = () => (
  <div className="HomeRoute-bgContainer">
    <HeaderRoute />
    <h1 className="HomeRoute-heading">Find The Job That Fits Your Life</h1>
    <p className="homeRoute-para">
      Millions of people are searching for jobs, salary information, company
      reviews. Find the job that fits your abilities and potential.
    </p>
    <button type="button" className="find-jobs-btn">
      Find Jobs
    </button>
  </div>
)
export default HomeRoute
