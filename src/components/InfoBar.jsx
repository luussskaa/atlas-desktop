import "../../public/InfoBar.css";

export default function InfoBar({ infoMessage }) {
    return (
        <div className="InfoBar">
            <p><i>{infoMessage}</i></p>
        </div>
    )
}