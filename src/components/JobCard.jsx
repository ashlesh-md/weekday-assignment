import './JobCard.css';
import hourglassImage from '../assets/hourglass.png';
import avatar1 from '../assets/avatar1.png';
import avatar2 from '../assets/avatar2.png';

function JobCard({ jobData }) {
    const { jdLink, maxJdSalary, minJdSalary, salaryCurrencyCode, location, minExp, maxExp, jobRole, companyName, logoUrl, jobDetailsFromCompany } = jobData;

    const formattedSalary = minJdSalary && maxJdSalary ? `${minJdSalary} - ${maxJdSalary} LPA` : "Not Specified";
    const formattedExperience = minExp && maxExp ? `${minExp} - ${maxExp} years` : 'Not Specified';

    return (
        <div className="widget-container">
            <div className="widget-content">
                <div className="info">
                    <img src={hourglassImage} alt="" />
                    <span>Posted 10 days ago</span>
                </div>
                <div className="company-details">
                    <div className="custom-widget-content">
                        <div className="custom-job-info">
                            <div className="custom-company-info">
                                <img className="custom-company-logo" src={logoUrl} alt="Company Logo" />
                                <div className="custom-company-details">
                                    <div className="custom-company-name">{companyName}</div>
                                    <div className="custom-job-title">{jobRole}</div>
                                </div>
                            </div>
                        </div>
                        <div className="custom-job-location">{location}</div>
                    </div>
                </div>
                <div className="estimated-salary">
                    {/* <h2 className="salary-heading">Estimated Salary: {salaryCurrencyCode === 'USD' ? '$' : '₹'} {formattedSalary} ✅</h2> */}
                    <h2 className="salary-heading">Estimated Salary: ₹ {formattedSalary} ✅</h2>
                </div>

                <div className="about-company">
                    <p className="company-heading">About {companyName || "Company"}:</p>
                    {jobDetailsFromCompany && <p className="company-description">{jobDetailsFromCompany}</p>}
                    {jdLink && <a href={jdLink} className="job-link">View job</a>}
                </div>
                <div className="min-experience">
                    <h2 className="experience-heading">Minimum Experience:</h2>
                    <p className="experience">{formattedExperience}</p>
                </div>
            </div>
            <div className="buttons-column">
                <button className="apply-btn">⚡️ Easy Apply</button>
                <button className="referral-btn">
                    <div className="avatars-container">
                        <img className="avatar" src={avatar1} alt="Avatar 1" />
                        <img className="avatar" src={avatar2} alt="Avatar 2" />
                    </div>
                    <div className="referral-content">
                        <p>Unlock referral asks</p>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default JobCard;
