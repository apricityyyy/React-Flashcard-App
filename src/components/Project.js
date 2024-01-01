export default function Project(props) {
    return (
        <div id="project">
            <h3>{props.name}</h3>
            <h3><i>{props.date}</i></h3>
            <p>{props.description}</p>
            <div>
                {
                    Object.entries(props.links).map(
                        ([text, url]) => <p key={text}><a href={url} target="_blank" rel="noopener noreferrer">{text}</a></p>
                    )
                }
            </div>
        </div>
    )
}