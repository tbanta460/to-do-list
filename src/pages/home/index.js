import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import './index.css';
import { getActivity, delActivity } from '../../config/api';
const Home = () => {
    const [datas, setDatas] = useState([]);
    const namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"]
    const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November","Desember"]
    useEffect(() => {
       
        const getDataActivity = async () => {
            
            let filterData
            const resData = await getActivity(""); 
            const lengthData = resData.data.length;
            filterData = resData.data
            if(lengthData > 500) {
                const totalFilter = lengthData - 500
                filterData = resData.data.filter((d,i) => i > totalFilter)
            }
            let result = filterData.sort((a,b) => b.created_at.localeCompare(a.created_at));
            setDatas(result)
        }

        datas.length === 0 && getDataActivity()
    }, [])

    const handleClickEvent = (data) => {
        
    }
    const handleDelt = async (d) => {
        const res = await delActivity(parseInt(d.id));
        if(res.status.toUpperCase() === "SUCCESS"){
            window.location.reload()
        }else{
            alert('Terjadi Kesalahan Pada Server')
        }
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