import "../../public/SectionHeadingForms.css";

export default function SectionHeadingForms({ title, text, infoFunction, formFunction }) {
    return (
        <div className="SectionHeadingForms">
            <div>
                <h1>{title}</h1>
                <p>{text}</p>
            </div>
        </div>
    )
}