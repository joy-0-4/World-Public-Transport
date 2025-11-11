import { Link } from "react-router-dom"

function Result( {result} ) {
    return(
        <div>
            <h4 className="company"><Link className="opencompany" to={"/company/" + result._id}>{result.company}</Link></h4>
            <div className="info">
                {result.country}
            </div>
            <div className="info">
                {result.city}
            </div>
        </div>
    );

}

export default Result;