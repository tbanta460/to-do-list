import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import EmptyImage from '../../asset/myasset.png';
import { CardSort, PopUpAddItem, CardActivity } from '../../components/atoms';
import { getToDo, editActivity, delToDo, editToDo as patchToDo} from '../../config/api';
import './index.css'
const Detail = () => {
    const [showSort, setShowSort] = useState(false);
    const [showModals, setShowModal] = useState(false);
    const [dataToDo, setDataToDo] = useState([])
    const [editToDo, setEditToDo] = useState([])
    const [editToDoss, setEditToDoss] = useState(false);
    const [editTitleActiv,setEditTitleActiv] = useState(false)
    const [valueTitle, setValueTitle] = useState({title:""})
    const [valueActivityEdit, setValueActivityEdit] = useState([])
    const [aturSort, setAturSort] = useState(false)
    const [daftaSort, setDaftarSort] = useState([])
    
    const listSorts = [{
        text:"Terbaru",
        gmb:"https://ivan-todo-devrank.netlify.app/static/media/icon-sort-newest.11f12a88.svg",
    },{
        text: "Terlama",
        gmb: "https://ivan-todo-devrank.netlify.app/static/media/icon-sort-oldest.abb68f33.svg",
    },{
        text:"A-Z",
        gmb: "https://ivan-todo-devrank.netlify.app/static/media/icon-sort-a-alpha.a5b00cb9.svg",
    },{
        text: "Z-A",
        gmb: "https://ivan-todo-devrank.netlify.app/static/media/icon-sort-d-alpha.ddb25d4b.svg",
    },{
        text:"Belum Selesai",
        gmb: "https://ivan-todo-devrank.netlify.app/static/media/icon-sort-active.eb235793.svg"
    }]
    const location = useLocation();
    const handleCloseModal = () => {
        setShowModal(false)
        setEditToDoss(false)
    }
    useEffect(() => {

        const getDataActivity = async () => {
            
            const result = await getToDo(`/?activity_group_id=${location.state.data.id}`)
           
            setDataToDo(result.data);
        }

            location.state.data.id !== undefined && getDataActivity()

       
    },[valueActivityEdit])
    useEffect(() => {
        if(aturSort){
            setDataToDo(daftaSort)
            setAturSort(false)
        }
    },[aturSort])
    const handleEditToDo = (e) => {
        const getIdElement = parseInt(e.currentTarget.getAttribute("data-getid"));

        const resFilter = dataToDo.filter(data => parseInt(data.id) === getIdElement)
        setEditToDo(resFilter)
        setShowModal(true)
        setEditToDoss(true)
    }
    
    const handleEventDelet = async (e) => {
        const getIdElement = parseInt(e.currentTarget.getAttribute("data-del"));
        const result = await delToDo(getIdElement)
        if(result.status.toUpperCase() === "SUCCESS"){
            window.location.reload()
        } else {
            alert("Terjadi Kesalahan Pada Server")
        }
    }
    const handleEditActivity = async () => {
        if(!editTitleActiv){
            setEditTitleActiv(true);
            setValueTitle(prev => {
                return{
                    ...prev,
                    title:valueActivityEdit.length !== 0 ? valueActivityEdit[0].title : location.state.data.title
                }
            })
        }else{   
            let newObj = {}
            newObj['title'] = valueTitle.title
            const result = await editActivity(newObj, parseInt(location.state.data.id))
            if(result.status.toUpperCase() === "SUCCESS"){
                setValueActivityEdit([result.data])
                setEditTitleActiv(false)
            } else {
                alert("Terjadi Kesalahan Pada Server")
            }
        }
    }
    const handleShortList = (e) => {
        let res
        if(e.currentTarget.textContent === "Z-A"){
            res = dataToDo.sort((a,b) => b.title.localeCompare(a.title))
            
        }else if(e.currentTarget.textContent === "A-Z"){
            res = dataToDo.sort((a,b) => a.title.localeCompare(b.title))
        }
        else if(e.currentTarget.textContent === "Terbaru"){
            res = dataToDo.sort((a,b) => b.created_at.localeCompare(a.created_at))
        }
        else if(e.currentTarget.textContent === "Terlama"){
            res = dataToDo.sort((a,b) => a.created_at.localeCompare(b.created_at))
        }
        setAturSort(true)
        setDaftarSort(res)
    }
    
    return(
        <>
            <div className="ctn-detail">
                <div className="todo-header">
                    <div className="nw-actv">
                        <div className="back-btn arrow" data-cy="todo-back-button" onClick={() => window.location.assign('/')}></div>
                        {!editTitleActiv 
                        ? (<h1 data-cy="todo-title" className="title">{valueActivityEdit.length !== 0 ? valueActivityEdit[0].title : location.state.data.title}</h1>)
                        :(<input value={valueTitle.title} className="title-inpt-vle" onChange={(e) => setValueTitle(prev => {return{...prev,title:e.target.value}})}/>)}
                        <div onClick={handleEditActivity}className="edit-icn" data-cy="todo-title-edit-button"></div>
                    </div>
                    <div className="bt-detail">
                        <div className="btn-sort">
                            <button data-cy="todo-sort-button" className="button-sort" onClick={() => setShowSort(!showSort)}>
                                <img src="https://ivan-todo-devrank.netlify.app/static/media/icon-sort.197e6f4f.svg" alt="icon sort" className="sort-images"/>
                            </button>
                            {
                                showSort && <CardSort listSorts={listSorts} onClick={handleShortList}/>
                            }
                        </div>
                        <button onClick={() => setShowModal(true)} data-cy="activity-add-button" className="btnn btnn-add"><span className="icn-pls" ></span>Tambah</button>
                    </div>
                </div>
                <div className="chd-header">
                    {
                        location.state.data.length !== 0
                        ? (<div className="detail-todo">{dataToDo.length !== 0 
                            ? dataToDo.map(data => {
                                return (<CardActivity handleDelet={handleEventDelet}dataTodos={data} onClick={handleEditToDo}/>)
                            }) 
                            :(<div data-cy="todo-empty-state" className="empty-list-item"> 
                                <img alt="gambar kosong" src="https://ivan-todo-devrank.netlify.app/static/media/empty-item.a0b4b794.png"/>
                            </div>) }</div>)
                        : (
                            <div data-cy="todo-empty-state">
                            <img src={EmptyImage} alt="gambar kosong" className="empty-list"/>
                            </div>
                        )
                    }
                </div>
            </div>
            <PopUpAddItem isEdit={editToDoss}showModal={showModals} dataId={location.state.data.id} dataEdit={editToDo} onClick={handleCloseModal}/>
        </>
    )
}

export default Detail