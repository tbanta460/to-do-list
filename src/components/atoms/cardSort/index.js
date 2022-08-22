import React from 'react';
import './index.css'
const CardSort = ({listSorts = [], ...rest}) => {
    return(
        <>
            <div className="card-sort">
                <ul className="chd-card-sort list-card-sort">
                    {listSorts.length !== 0 && listSorts.map((data, i) => {
                        return(
                            <li className="list-item-sort" data-cy="sort-selection" key={i}>
                                <div className="wrp-item-sort item-sort" data-cy="false" {...rest}>
                                <img src={data.gmb} alt="icn gambar" data-cy="sort-selection-icon"/>
                                <span className="tet-sort" data-cy="sort-selection-title">{data.text}</span>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default CardSort