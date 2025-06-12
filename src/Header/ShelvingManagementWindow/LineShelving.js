import React, {useState, useRef, useEffect} from "react";
import styles from './LineShelving.module.css';

function LineShelving({ shelf, onDelete, onUpdate })
{
   const handleCountChange = (event) => {
      const updatedShelf = { ...shelf, count: event.target.value };
      onUpdate(shelf.id, updatedShelf);
   };

   return (
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
         <button onClick={() => onDelete(shelf.id)} className={styles.Button}>Удалить</button>
      </div>
   );
}

export default LineShelving;
