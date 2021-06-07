import React, { Fragment, useState, useEffect } from 'react'
import Favor from './Favor'


const Search = ({ getCity, favData, getData, getBack }) => {

    const [isShow, setShow] = useState(false)
    const [change, setchange] = useState(false)
    const [getLocal, setLocal] = useState([])
    const [isSelect, setSelect] = useState('')

    function selectCity(e) {
        getCity(e.target.value)
        setSelect(e.target.value)
        setShow(false)
    }

    function showFav() {
        getData(JSON.parse(localStorage.getItem('data')) || [])
        setShow(true)
        setchange(!change)
    }

    function deleteFav() {
        if (favData.length) {
            const c = getLocal.filter(x => !favData.filter(y => y.ifsc === x.ifsc).length);
            localStorage.setItem('data', JSON.stringify(c))
            setchange(!change)
            getData(JSON.parse(localStorage.getItem('data')))
        } else {
            alert('Please select the Checkbox')
        }
    }

    function handleBack() {
        getBack()
        setShow(false)
    }

    useEffect(() => {
        setLocal(JSON.parse(localStorage.getItem('data')) || []);
    }, [change])

    return (
        <Fragment>
            <form className='mb-3'>
                <div className="d-flex">
                    <h3 className='mb-0 me-3'>Bank Branches</h3>
                    <select onChange={selectCity} className="form-select" style={{ width: 'auto' }} value={isSelect} aria-label="Default select example">
                        <option value="MUMBAI" >Mumbai</option>
                        <option value="BANGALORE">Bangalore</option>
                        <option value="DELHI">Delhi</option>
                        <option value="KOLKATA">Kolkata</option>
                        <option value="HYDERABAD">Hyderabad</option>
                    </select>

                    <div className='ms-auto'>
                        {isShow ?
                            <Fragment>
                                <button className='h-100 btn btn-outline-warning' type='button' onClick={deleteFav} >Delete Favourites</button>
                                <button type='button' className='h-100 ms-2 btn btn-primary' onClick={handleBack} >Go Back</button>
                            </Fragment> :
                            <Fragment>
                                <Favor favData={favData} />
                                <button className='h-100 ms-2 btn btn-secondary' type='button' onClick={showFav} >Show Favourites</button>
                            </Fragment>}
                    </div>

                </div>
            </form>
        </Fragment>
    )
}

export default Search
