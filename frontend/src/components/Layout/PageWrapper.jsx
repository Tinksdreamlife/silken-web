export default function PageWrapper({ children }) {
    return (
        <div className="gradient-background">
            <div className="main-wrapper">
                {children}
            </div>
        </div>
    );
}