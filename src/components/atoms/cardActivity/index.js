import React, {useEffect, useState} from 'react';
import './index.css'
import { editToDo } from '../../../config/api';
const CardActivity = ({dataTodos, handleDelet, ...rest}) => {
    const [colorList, setColorList] = useState("")
    const [isChecked, setIsChecked] = useState(false);
    const [classCheck,setClassCheck] = useState("")
    useEffect(() => {
        if(dataTodos.priority === "very-high"){
            setColorList('dotss-red')
        }else if(dataTodos.priority === "high"){
            setColorList('dotss-orange')
        }else if(dataTodos.priority === "normal"){
            setColorList('dotss-green')
        }else if(dataTodos.priority === "low"){
            setColorList('dotss-blue')
        }else if(dataTodos.priority === "very-low"){
            setColorList('dotss-purple')
        }

        if(dataTodos.is_active === "0"){ 
            setClassCheck("selesai")   
            setIsChecked(true)
        }else {
            setIsChecked(false)
        }
    }, [])
    
    const handleEventCheck = async (e) => {
        const getAtribu = e.currentTarget.getAttribute('data-labl')
        const isActive = e.currentTarget.checked
      
        let newObj = {}
        if(isActive){
            newObj["is_active"] = "0"
            setClassCheck("selesai")
            setIsChecked(true)
        }else {
            setClassCheck("")
            newObj["is_active"] = "1"
            setIsChecked(false)
        }
        
        const result = await editToDo(newObj, parseInt(getAtribu))
    }
    return(
        <>
            <div className="ctn-activity-card" data-cy="todo-item">
                <div className="chd-card-activity">
                    <div className="part-one">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input margin-rightt"data-labl={dataTodos.id}onChange={handleEventCheck} type="checkbox" value="option1" id={dataTodos.id} checked={isChecked}/>
                            <div className={`dotssss ${colorList} margin-rightt`} data-cy="todo-item-priority-indicator"></div>
                            <label className={`${classCheck} form-check-label margin-rightt`}data-cy="todo-item-title" htmlFor={dataTodos.id}>{dataTodos.title}</label>
                            <div className="edit-icn margin-rightt"data-getid={dataTodos.id} data-cy="todo-item-edit-button" {...rest}></div>
                        </div>
                    </div>
                    <div className="part-two">
                        <img src="https://ivan-todo-devrank.netlify.app/static/media/icon-delete.1e080ddb.svg" alt="delete icon" data-cy="todo-item-delete-button" data-del={dataTodos.id}onClick={handleDelet}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardActivity