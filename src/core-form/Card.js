export default function Card(props) {

    return(
        <div className="adena-card">
            <div className="adena-card-header">
                {props.config.data.label}
            </div>
            <div className="adena-card-main">
                {props.children}
            </div>
        </div>
    )
}
