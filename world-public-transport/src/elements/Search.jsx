import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import Result from './Result.jsx';
import { getCompaniesApi } from '../functionalities/api.jsx';

function Search() {
    const [location, setLocation] = useState("");
    const [company, setCompany] = useState("");
    const [bus, setBus] = useState(false);
    const [train, setTrain] = useState(false);
    const [subway, setSubway] = useState(false);
    const [tram, setTram] = useState(false);
    const [boat, setBoat] = useState(false);
    const [plane, setPlane] = useState(false);
    const [cableCar, setCableCar] = useState(false);
    const [bike, setBike] = useState(false);

    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(false);

    const [results, setResults] = useState([]);
    const [title, setTitle] = useState("Browse");

    async function handleSearch() {
        if (location == "" && company == "") {
            setMessage("At least location or company name need to be specified");
            setVisible(true);
            return;
        } else {
            setVisible(false);
        }

        setTitle("Results");
        const all = await getCompaniesApi();

        if (all != null) {
            const filtered = all.filter((result) => fitParams(result));
            setResults(filtered);
            setVisible(false);
        } else {
            setMessage("An error occurred while trying to load data from the database, please try again later");
            setVisible(true);
        }
    }

    async function handleBrowse() {
        setTitle("Browse");
        const all = await getCompaniesApi();

        if (all != null) {
            setResults(all);
            setVisible(false);
        } else {
            setMessage("An error occurred while trying to load data from the database, please try again later");
            setVisible(true);
        }
    }

    function fitParams(result) {
        return (location == "" ||
               (result.city).toLowerCase().includes(location.toLowerCase()) ||
               (result.country).toLowerCase().includes(location.toLowerCase())) &&
               (company == "" || (result.company).toLowerCase().includes(company.toLowerCase())) &&
               (!bus || result.bus) &&
               (!train || result.train) &&
               (!subway || result.subway) &&
               (!tram || result.tram) &&
               (!boat || result.boat) &&
               (!plane || result.plane) &&
               (!cableCar || result.cableCar) &&
               (!bike || bike)
    }

    async function getCurrentLocation(lat, lon) {
        const openMapsUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;

        try {
            const resp = await fetch(openMapsUrl, {
                headers: { 'User-Agent': 'WPT (janaja@uef.fi)' }
            });
            const data = await resp.json();
            const addr = data.address || {};
            const city = addr.city || addr.town || addr.village || addr.hamlet || addr.locality || addr.county;
            setLocation(city);
            
            setTitle("Results");
            const all = await getCompaniesApi();

            if (all != null) {
                setResults(all.filter((result) => {return result.city.toLowerCase().includes(city.toLowerCase()) || result.country.toLowerCase().includes(city.toLowerCase)}));
                setVisible(false);
            } else {
                setMessage("An error occurred while trying to load data from the database, please try again later");
                setVisible(true);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleBrowse();
        try {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    getCurrentLocation(latitude, longitude)
                })
        }
        catch (error) {
            console.log(error);
        }
    }, [])

    return(
        <div>
            <div className="indent">
                <div className={visible ? "alert alert-danger myalert" : "invisible"} role="alert">{message}</div>

                <h3>What are you looking for?</h3>
                <form>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="location" placeholder="City or country name" value={location} onChange={e => setLocation(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <input type="text" className="form-control" id="company" placeholder="Transport company name" value={company} onChange={e => setCompany(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label>Kind of transport offered</label>
                        <div><input type="checkbox" id="bus" checked={bus} onChange={e => setBus(e.target.checked)}/> Bus</div>
                        
                        <div><input type="checkbox" id="train" checked={train} onChange={e => setTrain(e.target.checked)} /> Train</div>
                        
                        <div><input type="checkbox" id="subway" checked={subway} onChange={e => setSubway(e.target.checked)} /> Subway</div>

                        <div><input type="checkbox" id="tram" checked={tram} onChange={e => setTram(e.target.checked)} /> Tram</div>

                        <div><input type="checkbox" id="boat" checked={boat} onChange={e => setBoat(e.target.checked)} /> Boat</div>

                        <div><input type="checkbox" id="plane" checked={plane} onChange={e => setPlane(e.target.checked)} /> Plane</div>

                        <div><input type="checkbox" id="cable-car" checked={cableCar} onChange={e => setCableCar(e.target.checked)} /> Cable Car</div>

                        <div><input type="checkbox" id="bike" checked={bike} onChange={e => setBike(e.target.checked)} /> Bike</div>
                    </div>
                </form>

                <Button className="myButton" onClick={handleBrowse}>Browse</Button>
                <Button className="myButton" onClick={handleSearch}>Search</Button>
            </div>

            <div className="divider"></div>

            <div className="indent">
                <h2>{title}</h2>

                {visible ? "" : results.map(result => <Result result={result}/>)}
            </div>
        </div>
    );
}

export default Search