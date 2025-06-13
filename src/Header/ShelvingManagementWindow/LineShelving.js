import React, {useState, useRef, useEffect} from "react";
import styles from './LineShelving.module.css';

function LineShelving({ shelf, onDelete, onUpdate })
{
   const handleCountChange = (event) => {
      const updatedShelf = { ...shelf, count: event.target.value };
      onUpdate(shelf.id, updatedShelf);
   };

   return (
       <div style={{marginBottom: '18px'}}>
           <div className={styles.LineContainer}>
               <div className={styles.Number}>{shelf.id}</div>
               <input
                   type="number"
                   className={styles.Input}
                   placeholder="Вместимость"
                   value={shelf.count}
                   onChange={handleCountChange}
                   min="0"
               />
               <button onClick={() => onDelete(shelf.id)}
                       disabled={shelf.has_books == false ? false : true} className={shelf.has_books == false ? styles.Button : styles.basketButtonDisabled}>Удалить
               </button>
           </div>
           {shelf.has_books ?
               <div className={styles.Warning}><p className={styles.Warningp}> На стеллаже есть книги!</p></div> : <></>}
       </div>
   );
}

export default LineShelving;
