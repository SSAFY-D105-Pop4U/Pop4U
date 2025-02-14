import '../../styles/components/ProgressBar.css'

const ProgressBar = ({showAppointmentDetails}) => {
    
    return (
        <div>
            {showAppointmentDetails ? (
                <div>
                    <div className="progress-bar-container">
                        <div className="progress-bar-filled"></div>
                        <div className="progress-bar-empty"></div>
                    </div>
                </div>
            ):(<div> 
                    <div className="progress-bar-container">
                        <div className="progress-bar-empty"></div>
                        <div className="progress-bar-filled"></div>
                    </div>
                </div>)}
            
        </div>
    )

}

export default ProgressBar

