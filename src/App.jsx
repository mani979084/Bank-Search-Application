import React, { Fragment, useCallback, useState } from 'react'
import axios from 'axios'
import BasicTable from './components/BasicTable'
import Search from './components/Search'
import useSWR from 'swr'
import Spinner from './components/Spinner'


const App = () => {

    const [isData, setData] = useState([])
    const [isCity, setCity] = useState('MUMBAI')
    const [checkFav, setCheck] = useState(true)
    const [favData, setFav] = useState([])

    const { data } = useSWR(
        `https://vast-shore-74260.herokuapp.com/banks?city=${isCity}`,
        (url) => axios(url).then(r => r.data)
    )

    function getCity(data) {
        setCity(data)
        setCheck(true)
        setData([])
    }

    function getData(data) {
        if (data.length) {
            setData(data)
            setCheck(true)
        } else {
            setCheck(false)
        }
    }

    const getFav = useCallback((data) => {
        setFav(data)
    }, [])

    function getBack() {
        setCheck(true)
        setData(data)
    }

    return (
        <Fragment>
            <div className="container my-4 text-center">
                <Search getCity={getCity} getData={getData} getBack={getBack} favData={favData} />
                {!checkFav ?
                    <div className='favor-head text-secondary'>
                        <h1>No Favourites Available</h1>
                    </div> :
                    <Fragment>
                        {data ?
                            <BasicTable mock_data={!isData.length ? data : isData} getFav={getFav} /> :
                            <Spinner />}
                    </Fragment>}
            </div>
        </Fragment>
    )
}

export default App
