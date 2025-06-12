import React, {useState, useRef, useEffect} from "react";
import styles from './PlacementWindow.module.css';

function PlacementWindow({isOpen, onClose, obj})
{
   if (!isOpen) return null;

   const formatAuthors = (authors) => {
    return authors.map(author => `${author.author_last_name} ${author.author_first_name} ${author.author_patronymic || ''}`.trim()).join(', ');
   };

   return(
      <div className={styles.overlay}>
        <div className={styles.modal}>
            <p className={styles.nameWindow}>Размещение книг</p>
            <button onClick={() => {onClose();}} className={styles.closeBtn}></button>
            <div className={styles.ContentScroll}>
            <div className={styles.Content}>
               <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th style={{width: '270px',  border: '2px solid #5D3C64'}}>Название книги</th>
                                    <th style={{width: '270px',  border: '2px solid #5D3C64'}}>Авторы книги</th>
                                    <th style={{width: '150px',  border: '2px solid #5D3C64'}}>ID хранилища</th>
                                    <th style={{width: '150px',  border: '2px solid #5D3C64'}}>Название хранилища</th>
                                    <th style={{width: '150px',  border: '2px solid #5D3C64'}}>Количество экземпляров</th>
                                </tr>
                            </thead>
                            <tbody>
                               {obj.map((bookEntry, index) => (
                                    bookEntry.storages.map((storage, storageIndex) => (
                                        <tr key={`${index}-${storageIndex}`}>
                                            {storageIndex === 0 && <td style={{width: '270px', textAlign: 'center', border: '2px solid #5D3C64'}} rowSpan={bookEntry.storages.length}>{bookEntry.book.title}</td>}
                                            {storageIndex === 0 && <td style={{width: '270px', textAlign: 'center', border: '2px solid #5D3C64'}} rowSpan={bookEntry.storages.length}>{formatAuthors(bookEntry.book.authors)}</td>}
                                            <td style={{ width: '150px', textAlign: 'center', border: '2px solid #5D3C64' }}>{storage.id}</td>
                                            <td style={{ width: '150px', textAlign: 'center', border: '2px solid #5D3C64' }}>{storage.name}</td>
                                            <td style={{ width: '150px', textAlign: 'center', border: '2px solid #5D3C64' }}>{storage.quantity}</td>
                                        </tr>
                                    ))
                                ))}
                            </tbody>
                        </table>
            </div>
            </div>
            <div className={styles.ButtonsContainer}>
               <button className={styles.Button} onClick={() => {onClose();}}> Ок </button>
            </div>
         </div>
      </div>
   );

}

export default PlacementWindow;