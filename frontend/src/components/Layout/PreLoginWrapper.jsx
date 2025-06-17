import './PreLoginWrapper.css';

export default function PreLoginWrapper({children}) {
    return (
        <div className="welcome-page">
            <div className="overlay">
                {children}
            </div>
        </div>
    );
}