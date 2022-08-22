import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import './index.css';
import { getAndDelActivity } from '../../config/api';
const Home = () => {
    const [datas, setDatas] = useState([]);
    const namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"]
    const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November","Desember"]
    useEffect(() => {
       
        const getDataActivity = async () => {
            
            let count = 1200
            const resData = await getAndDelActivity("");
            const filterData = resData.data.filter((data, index) => index >= count) 
            let result = filterData.sort((a,b) => b.created_at.localeCompare(a.created_at));
            setDatas(result)
        }

        datas.length === 0 && getDataActivity()
    }, [datas])

    const handleClickEvent = (data) => {
        
    }
    const handleDelt = (d) => {
        
        fetch(`https://floating-mountain-35184.herokuapp.com/activity-groups/${parseInt(d.id)}`, {
            method: "DELETE",
            headers:{
                "Content-Type": "aplication/json"
            }
        })
        .then(data => data.json())
        .then(da => console.log(da))
    }
    return(
        <>
            <div className="home">
                <section className="ctn-activity">
                    <h1 data-cy="activity-title">Activity</h1>
                    <button data-cy="activity-add-button" className="btnn btnn-add"><span className="icn-pls"></span>Tambah</button>
                </section>
                <section className="activities">
                    <div className="cards-list">
                        {
                            datas.length !== 0 && datas.map((isData, i) => {
                                const isYear = new Date(isData.created_at).getFullYear()
                                const isMonth = namaBulan[new Date(isData.created_at).getMonth()]
                                const isDay = namaHari[new Date(isData.created_at).getDay()]
                                return(
                                    <div className="box" key={isData.id} id={`itemToDo${i}`}>
                                        <div className="wrp-box" data-cy="activity-item">
                                            <Link to={{pathname: `/detail/${isData.id}`}} state={{data: isData}} className="link">
                                            <div className="title" onClick={() => handleClickEvent(isData)}>
                                                <h4 data-cy="activity-item-title">{isData.title}</h4>
                                            </div>
                                            </Link>
                                            <div className="footer">
                                                <span>{isDay} {isMonth} {isYear}</span>
                                                <img src="https://ivan-todo-devrank.netlify.app/static/media/icon-delete.1e080ddb.svg" alt="delete icon" data-cy="activity-item-delete-button" onClick={() => handleDelt(isData)}/>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
            </div>
        </>
    )
}

export default Home