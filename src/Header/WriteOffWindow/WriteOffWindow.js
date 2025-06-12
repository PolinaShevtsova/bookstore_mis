import React, {useState, useRef, useEffect} from "react";
import styles from './WriteOffWindow.module.css';

function WriteOffWindow ({isOpen, onClose, obj})
{
   if (!isOpen) return null;

   const formatAuthors = (authors) => {
    return authors.map(author => `${author.author_last_name} ${author.author_first_name} ${author.author_patronymic || ''}`.trim()).join(', ');
   };

  // Функция для форматирования даты и времени
   const formatDateTime = (dateTime) => {
      const date = new Date(dateTime);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
   };

   return(
      <div className={styles.overlay}>
        <div className={styles.modal}>
            <p className={styles.nameWindow}>Списания</p>
            <button onClick={() => {onClose();}} className={styles.closeBtn}></button>
            <div className={styles.ContentScroll}>
            <div className={styles.Content}>
               <table className={styles.table}>
              <thead>
                <tr>
                  <th style={{width: '20px'}}>ID</th>
                  <th style={{width: '90px',  border: '2px solid #5D3C64'}}>Название книги</th>
                  <th style={{width: '200px',  border: '2px solid #5D3C64'}}>Авторы</th>
                  <th style={{width: '190px',  border: '2px solid #5D3C64'}}>Причина списания</th>
                  <th style={{width: '135px',  border: '2px solid #5D3C64'}}>Количество экземпляров</th>
                  <th>Дата и время</th>
                </tr>
              </thead>
              <tbody>
                {obj.map(item => (
                  <tr key={item.id}>
                    <td style={{width: '20px',textAlign: 'center', border: '2px solid #5D3C64'}}>{item.id}</td>
                    <td style={{width: '90px', textAlign: 'center', border: '2px solid #5D3C64'}}>{item.book.title}</td>
                    <td style={{width: '200px',textAlign: 'center', border: '2px solid #5D3C64'}}>{formatAuthors(item.book.authors)}</td>
                    <td style={{width: '190px', textAlign: 'center', border: '2px solid #5D3C64'}}>{item.reason}</td>
                    <td style={{width: '135px', textAlign: 'center', border: '2px solid #5D3C64'}}>{item.quantity}</td>
                    <td style={{textAlign: 'center', border: '2px solid #5D3C64'}}>{formatDateTime(item.dateTime)}</td>
                  </tr>
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

export default WriteOffWindow;