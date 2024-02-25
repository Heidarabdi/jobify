import {Link, useRouteError} from "react-router-dom";
import Wrapper from '../assets/wrappers/ErrorPage';
import img from '../assets/images/not-found.svg';
const Error = () => {
    const error = useRouteError();
    console.log(error);
    if(error.status === 404){
        return (
            <Wrapper>
                <div>
                <img src={img} alt="not found" />
                <h3>Ohh! page not found</h3>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p>we can't find the page you are looking for</p>
                <Link to={'/dashboard'} >Back to home</Link>
                </div>
            </Wrapper>
        )
    }
    return (
        <Wrapper>
            <div>
            <h1>Oops! Something went wrong!</h1>
            <p>
                { error.status || error.data}
            </p>
            <Link to={'/dashboard'} >Back to home</Link>
            </div>
        </Wrapper>

    )
}

export default Error;
