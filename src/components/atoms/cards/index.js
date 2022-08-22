import React from 'react';
import './index.css'
const CardToDo = (data) => {
    return (
        <>
            <div className="ctn-todo">
                <div className="chd-todo" data-cy="todo-item">
                  {
                    data.length !== 0 && data.map(isData => {
                        return(
                            <div key={isData.id}>

                            </div>
                        )
                    })
                  }  
                </div>
            </div>
        </>
    )
}

export default CardToDo