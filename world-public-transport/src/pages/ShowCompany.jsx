import Button from 'react-bootstrap/Button';
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getCompanyApi } from '../functionalities/api.jsx';

function ShowCompany()
{
    const [company, setCompany] = useState({});
    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(false);
    
    const { id } = useParams();

    async function getCompany() {
        const result = await getCompanyApi(id);
        if (result != null) {
            setCompany(result);
            setVisible(false);
        } else {
            setMessage("An error occurred while trying to load data from the database, please try again later");
            setVisible(true);
        }
    }

    useEffect(() => {
        getCompany();
    }, []);

    return(
        <div className="content indent">
            <div className={visible ? "alert alert-danger myalert" : "invisible"} role="alert">{message}</div>

            <h3>{company.company}</h3>
            <div>Countires: {company.country}</div>
            <div>Cities: {company.city}</div>
            <div>{"Transport offered: "}
                    {company.bus ? "bus " : ""}
                    {company.train ? "train " : ""}
                    {company.subway ? "subway " : ""}
                    {company.tram ? "tram " : ""}
                    {company.boat ? "boat " : ""}
                    {company.plane ? "plane " : ""}
                    {company.cableCar ? "cable car " : ""}
                    {company.bike ? "bike " : ""}
            </div>
            <div>Website: <a href={company.website} target='_blank'>{company.website}</a></div>
            <div>Tariff: <a href={company.tariff} target='_blank'>{company.tariff}</a></div>
            <div>Rules: <a href={company.rules} target='_blank'>{company.rules}</a></div>
            <div>Zones: <a href={company.zones} target='_blank'>{company.zones}</a></div>
            <div>Level of Accessibility: {company.accesible}</div>
            <div>Tips: {company.tips}</div>

            <Link to={"/editCompany/" + company._id}><Button className="myButton savechanges">Edit</Button></Link>
        </div>
    )
}

export default ShowCompany;