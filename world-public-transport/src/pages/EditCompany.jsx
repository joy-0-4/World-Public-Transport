import Button from "react-bootstrap/Button"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCompanyApi, createCompanyApi, editCompanyApi } from "../functionalities/api.jsx";

function EditCompany()
{    
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [company, setCompany] = useState("");
    const [bus, setBus] = useState(false);
    const [train, setTrain] = useState(false);
    const [subway, setSubway] = useState(false);
    const [tram, setTram] = useState(false);
    const [boat, setBoat] = useState(false);
    const [plane, setPlane] = useState(false);
    const [cableCar, setCableCar] = useState(false);
    const [bike, setBike] = useState(false);
    const [website, setWebsite] = useState("");
    const [tariff, setTariff] = useState("");
    const [rules, setRules] = useState("");
    const [zones, setZones] = useState("");
    const [accessible, setAccessible] = useState("fully");
    const [tips, setTips] = useState("");

    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(false);
    
    let { id } = useParams();

    async function getCompany() {
        if (id === undefined) {
            setCountry("");
            setCompany("");
            setCity("");
            setBus(false);
            setTrain(false);
            setSubway(false);
            setTram(false);
            setBoat(false);
            setPlane(false);
            setCableCar(false);
            setBike(false);
            setWebsite("");
            setTariff("");
            setRules("");
            setZones("");
            setAccessible("fully");
            setTips("");
            return;
        }

        const result = await getCompanyApi(id);
        if (result != null) {
            setCountry(result.country);
            setCompany(result.company);
            setCity(result.city);
            setBus(result.bus);
            setTrain(result.train);
            setSubway(result.subway);
            setTram(result.tram);
            setBoat(result.boat);
            setPlane(result.plane);
            setCableCar(result.cableCar);
            setBike(result.bike);
            setWebsite(result.website);
            setTariff(result.tariff);
            setRules(result.rules);
            setZones(result.zones);
            setAccessible(result.accessible);
            setTips(result.tips);

            setVisible(false);
        } else {
            setMessage("An error occurred while trying to load data from the database, please try again later");
            setVisible(true);
        }
    }

    async function submitChanges() {
        if (country == "" ||
            company == "" ||
            (!bus && !tran && !subway && !tram && !boat && !plane && !cableCar && !bike)) {
            setMessage("Some of the required parameters are missing");
            setVisible(true);
            return;
        } else {
            setVisible(false);
        }

        const companyObject = {
            country: country,
            city: city,
            company: company,
            bus: bus,
            train: train,
            subway: subway,
            tram: tram,
            boat: boat,
            plane: plane,
            cableCar: cableCar,
            bike: bike,
            website: website,
            tariff: tariff,
            rules: rules,
            zones: zones,
            accessible: accessible,
            tips: tips
        };

        if (id === undefined)
        {
            const response = createCompanyApi(companyObject);
            if (response.ok) {
                id = response.data._id;
                setVisible(false);
            } else {
                setMessage("An error occurred while trying to crate a new record in the database, please try again later");
                setVisible(true);
            }
        }
        else
        {
            const response = editCompanyApi(id, companyObject);
            if (!response.ok) {
                setMessage("An error occurred while updating the database, please try again later");
                setVisible(true);
            } else {
                setVisible(false);
            }
        }
    }

    useEffect(() => {
        getCompany();
    }, [id]);
    
    return(
        <div className="content indent">
            <div className={visible ? "alert alert-danger myalert" : "invisible"} role="alert">{message}</div>

            <form>
                <div className="mb-3">
                    <label htmlFor="country">Countries:*</label>
                    <input type="text" className="form-control" id="country" placeholder="separated by a comma, in language of the country" value={country} onChange={e => setCountry(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="city">Cities:</label>
                    <input type="text" className="form-control" id="city" placeholder="if applicable, separated by a comma, in language of the country" value={city} onChange={e => setCity(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="company">Company:*</label>
                    <input type="text" className="form-control" id="company" placeholder="Full name (acronym - if exists)" value={company} onChange={e => setCompany(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label>Kind of transport offered:*</label>
                    <div><input type="checkbox" id="bus" checked={bus} onChange={e => setBus(e.target.checked)}/> Bus</div>
                    
                    <div><input type="checkbox" id="train" checked={train} onChange={e => setTrain(e.target.checked)} /> Train</div>
                    
                    <div><input type="checkbox" id="subway" checked={subway} onChange={e => setSubway(e.target.checked)} /> Subway</div>

                    <div><input type="checkbox" id="tram" checked={tram} onChange={e => setTram(e.target.checked)} /> Tram</div>

                    <div><input type="checkbox" id="boat" checked={boat} onChange={e => setBoat(e.target.checked)} /> Boat</div>

                    <div><input type="checkbox" id="plane" checked={plane} onChange={e => setPlane(e.target.checked)} /> Plane</div>

                    <div><input type="checkbox" id="cable-car" checked={cableCar} onChange={e => setCableCar(e.target.checked)} /> Cable Car</div>

                    <div><input type="checkbox" id="bike" checked={bike} onChange={e => setBike(e.target.checked)} /> Bike</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="website">Website:</label>
                    <input type="url" className="form-control" id="website" placeholder="Main website url" value={website} onChange={e => setWebsite(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="tariff">Tariffs:</label>
                    <input type="text" className="form-control" id="tariff" placeholder="Link to overview of tariffs" value={tariff} onChange={e => setTariff(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="rules">Discounted Tariffs Rules:</label>
                    <input type="text" className="form-control" id="rules" placeholder="Link to rules for discounts (student, child, etc)" value={rules} onChange={e => setRules(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="zones">Zones:</label>
                    <input type="text" className="form-control" id="zones" placeholder="Link to a map of zones" value={zones} onChange={e => setZones(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label>Level of Accessibility*</label>
                    <input className="radio" type="radio" value="fully" checked={accessible === "fully"} onChange={e => setAccessible(e.target.value)} /> Fully
                    <input className="radio" type="radio" value="some" checked={accessible === "some"} onChange={e => setAccessible(e.target.value)} /> Some Routes/Vehicles (elaborate in the Tips section)
                    <input className="radio" type="radio" value="none" checked={accessible === "none"} onChange={e => setAccessible(e.target.value)} /> Not at All
                </div>

                <div className="mb-3">
                    <label htmlFor="tips">Tips:</label>
                    <textarea className="form-control" id="tips" placeholder="Any useful information that comes to your mind, what to avoid, what benefits to use etc." value={tips} onChange={e => setTips(e.target.value)} />
                </div>
            </form>

            <Button className="myButton" onClick={submitChanges}>Submit</Button>
        </div>
    );
}

export default EditCompany;