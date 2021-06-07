import React, { useEffect, useState } from 'react'

const Favor = ({ favData }) => {

    const [change, setchange] = useState(false)
    const [getLocal, setLocal] = useState([])

    function addFavor() {
        if (favData.length) {
            const data = [...favData, ...getLocal]

            const uniqueAddresses = Array.from(new Set(data.map(a => a.ifsc)))
                .map(id => {
                    return data.find(a => a.ifsc === id)
                })

            localStorage.setItem('data', JSON.stringify(uniqueAddresses))
            setchange(!change)

            var inputs = document.querySelectorAll('.checkbox');
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].checked = false;
            }
            alert('Successfully Added')
        } else {
            alert('Please select the Checkboxes')
        }

    }

    useEffect(() => {
        setLocal(JSON.parse(localStorage.getItem('data')) || []);
    }, [change])

    return (

        <button type='button' className='h-100 btn btn-outline-info' onClick={addFavor} >Add to Favourites</button>

    )
}

export default Favor
