import React from 'react'

export const Filter = ({ filter, setFilter }) => {

    return (
        <>
            <div id='filter' className="input-group mb-3 mt-2 pt-3 pt-md-0">

                <input type="text" className="form-control" value={filter || ''}
                    onChange={e => setFilter(e.target.value)}
                    placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" />
                <span className="input-group-text" id="basic-addon1"><i className="bi bi-search"></i></span>
            </div>

        </>
    )
}