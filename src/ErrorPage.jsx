import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.log(error)
    return (
        <>
            <h1>Oops...</h1>
            <p>Something went wrong!</p>
            {error.status} - {error.statusText}
        </>
    )
}