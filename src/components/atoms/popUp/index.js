import React, { useState, useEffect } from 'react';
import { postAndEditToDo } from '../../../config/api';
import './index.css'
const PopUpAddItem = ({setswActived,showModal,dataEdit,dataId, myEdit = false,...rest}) => {
    const [showList, setShowList] = useState(false);
    const [textList, setTextList] = useState("Very High");
    const [colorList, setColorList] = useState("dotss-red");
    const [inptValue, setInptValue] = useState({title: ""})
    const listItemPriority = [{name:"Very High", color:"dotss-red"},{name: "High", color:"dotss-orange"}, {name:"Medium", color: "dotss-green"}, {name:"Low", color: "dotss-blue"}, {name:"Very Low", color:"dotss-purple"}]
    const handleChangeValue = (e) => {
        listItemPriority.map(data => {
            if(data.name === e.target.textContent){
                setColorList(data.color)
                setTextList(data.name)
            }
        })
    }
    useEffect(() => {
        dataEdit.length !== 0 && myEdit && setInptValue({title: dataEdit[0].title})
    },[dataEdit])
    const handleChangeEvent = (e) => {
        setInptValue(prev => {
            return{
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }
    const handleSimpan = async () => {
        // console.log(dataEdit[0].id, "wowiowiowi")
        let newObj = {}
        if(myEdit === false){
            if(textList === "Very High"){
                newObj["priority"] = "very-high"
            }else if(textList === "High"){
                newObj["priority"] = "high"
            }else if(textList === "Medium"){
                newObj["priority"] = "normal"
            }else if(textList === "Low"){
                newObj["priority"] = "low"
            }else if(textList === "Very Low"){
                newObj["priority"] = "very-low"
            }
            newObj["title"] = inptValue.title
            newObj["activity_group_id"] = parseInt(dataId)
            fetch('https://floating-mountain-35184.herokuapp.com/todo-items', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newObj)
            })
            .then(rres => rres.json())
            .then(data => {
                window.location.reload()
            })
        }else {
            if(textList === "Very High"){
                newObj["priority"] = "very-high"
            }else if(textList === "High"){
                newObj["priority"] = "high"
            }else if(textList === "Medium"){
                newObj["priority"] = "normal"
            }else if(textList === "Low"){
                newObj["priority"] = "low"
            }else if(textList === "Very Low"){
                newObj["priority"] = "very-low"
            }
            newObj["title"] = inptValue.title
            newObj["is_active"] = setswActived
            fetch(`https://floating-mountain-35184.herokuapp.com/todo-items/${dataEdit[0].id}`, {
                method: 'PATCH',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newObj)
            })
            .then(rres => rres.json())
            .then(data => window.location.reload())
        }
       
    }
    return(
        <>
            <div className="pp-it">
                <div className="chd-pp-itm">
                    <div className={`modal ${showModal ? "modal-shoow" : ""}`} tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" data-cy="modal-add-title">Tambah List Item</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" data-cy="modal-add-close-button" {...rest}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Nama List Item</label>
                                        <input type="text" className="form-control" onChange={handleChangeEvent}name="title" value={inptValue.title}id="exampleFormControlInput1" placeholder="Tambahkan Nama Activity" />
                                    </div>
                                    <label data-cy="modal-add-priority-title">PRIORITY</label>
                                    <div className="dropdown" onClick={() => setShowList(!showList)}>
                                        <div className=" dropdown-toggle"  data-bs-toggle="dropdown" aria-expanded="false" data-cy="modal-add-priority-item">
                                            <span className={`dotsss ${colorList}`}></span>
                                            {textList}
                                        </div>
                                        <ul className={`dropdown-menu ${showList && "list-showw"}`} data-cy="modal-add-priority-dropdown" onClick={handleChangeValue}>
                                            {
                                                listItemPriority.map((data, i) => {
                                                    return (
                                                        <li key={i}className={`lists ${data.name === textList && "activedd"}`}><div className="toggle-list dropdown-toggles">
                                                            <span className={`dotss ${data.color}`}></span>
                                                        {data.name}
                                                        </div></li>
                                                    )
                                                })
                                            }
                                            
                                           
                                        </ul>
                                    </div>
                                    
                                </div>
                                <div className="modal-footer">
                                    <button onClick={handleSimpan}data-cy="activity-add-button" className="btnn btnn-simpan">Simpan</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PopUpAddItem