import Search from "../elements/Search.jsx"

function Home() {
    return (
        <div>
            <div className="content">
                <Search className="search"/>
            </div>

            <div className="end">
                <div className="divider"></div>

                <div className="indent">
                <h5>Contacts</h5>
                <div>email: janajar@uef.fi</div>
                <div>source code: example</div>
                </div>
            </div>
        </div>
    )
}

export default Home;