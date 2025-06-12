import React, {useState, useRef, useEffect} from "react";
import styles from './ShelvingManagementWindow.module.css';
import FetchWithAuth from "../../Login_page/FetchWithAuth";
import LineShelving from "./LineShelving";

function ShelvingManagementWindow ({isOpen, onClose, obj})
{
   const [shelves, setShelves] = useState(obj);

   const addShelf = () => {
      const lastShelf = shelves[shelves.length - 1];
      const newShelf = {
         id: lastShelf ? lastShelf.id + 1 : 1,
         count: 0,
   };
      setShelves([...shelves, newShelf]);
   };

   const deleteShelf = (id) => {
      setShelves(shelves.filter((shelf) => shelf.id !== id));
   };

   const updateShelf = (id, updatedShelf) => {
      setShelves(
         shelves.map((shelf) => (shelf.id === id ? updatedShelf : shelf))
      );
   };

   async function handleSaveClick() {
      try {
         const response = await FetchWithAuth('http://127.0.0.1:8000/api/storage/', {
            method: 'PUT',
            body: JSON.stringify(shelves),
         });
      } catch (error) {
         console.error('Произошла ошибка', error);
      }
   }

   if (!isOpen) return null;

   return(
      <div className={styles.overlay}>
        <div className={styles.modal}>
            <p className={styles.nameWindow}>Управление стеллажами</p>
            <button onClick={() => {onClose();}} className={styles.closeBtn}></button>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start' }}>
            <p className={styles.nameCol}>Вместимость стеллажа</p>
            </div>
            <div className={styles.ContentScroll}>
            <div className={styles.Content}>
               {shelves.map((shelf) => (
                  <LineShelving
                  key={shelf.id}
                  shelf={shelf}
                  onDelete={deleteShelf}
                  onUpdate={updateShelf}
                  />
               ))}
            </div>
            </div>
            <div className={styles.ButtonsContainer}>
               <button className={styles.Button} onClick={addShelf}>Добавить стеллаж</button>
               <button className={styles.Button} onClick={handleSaveClick}>Сохранить</button>
            </div>
         </div>
      </div>
   );
}

export default ShelvingManagementWindow;