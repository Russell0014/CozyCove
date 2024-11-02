import Search from "../components/Search"

function Home() {
    return (
        <div className="container mx-auto text-left">
            <h1 className="m-10 text-3xl"><span className=" font-bold text-red-500">Discover your next adventure.</span> Book unique homes and immerse yourself in the city like a local.</h1>
            <Search />
        </div>
    )
}

export default Home