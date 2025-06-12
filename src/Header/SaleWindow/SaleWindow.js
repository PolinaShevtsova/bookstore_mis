import React, {useState, useRef, useEffect} from "react";
import styles from './SaleWindow.module.css';

function SaleWindow({isOpen, onClose, obj})
{
   if (!isOpen) return null;

   const formatAuthors = (authors) => {
    return authors.map(author => `${author.author_last_name} ${author.author_first_name} ${author.author_patronymic || ''}`.trim()).join(', ');
   };

   const formatDateTime = (datet) => {
      const date = new Date(datet);
      return `${date.toLocaleDateString()}`;
   };

   return(
      <div className={styles.overlay}>
        <div className={styles.modal}>
            <p className={styles.nameWindow}>Продажи</p>
            <button onClick={() => {onClose();}} className={styles.closeBtn}></button>
            <div className={styles.ContentScroll}>
            <div className={styles.Content}>
               <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th style={{width: '40px',  border: '2px solid #5D3C64'}}>ID</th>
                                    <th style={{width: '140px',  border: '2px solid #5D3C64'}}>Итоговая цена</th>
                                    <th style={{width: '170px',  border: '2px solid #5D3C64'}}>Дата продажи</th>
                                    <th style={{width: '270px',  border: '2px solid #5D3C64'}}>Название книги</th>
                                    <th style={{width: '270px',  border: '2px solid #5D3C64'}}>Авторы книги</th>
                                    <th style={{width: '150px',  border: '2px solid #5D3C64'}}>Количество экземпляров</th>
                                </tr>
                            </thead>
                            <tbody>
                                {obj.map(entrance => (
                                    <React.Fragment key={entrance.id}>
                                        {entrance.books.map((bookItem, index) => (
                                            <tr key={index}>
                                                {index === 0 && <td style={{width: '40px',textAlign: 'center', border: '2px solid #5D3C64'}} rowSpan={entrance.books.length}>{entrance.id}</td>}
                                                {index === 0 && <td style={{width: '140px',textAlign: 'center', border: '2px solid #5D3C64'}} rowSpan={entrance.books.length}>{entrance.final_price}</td>}
                                                {index === 0 && <td style={{width: '170px',textAlign: 'center', border: '2px solid #5D3C64'}} rowSpan={entrance.books.length}>{formatDateTime(entrance.date)}</td>}
                                                <td style={{width: '170px',textAlign: 'center', border: '2px solid #5D3C64'}}>{bookItem.book.title}</td>
                                                <td style={{width: '270px',textAlign: 'center', border: '2px solid #5D3C64'}}>{formatAuthors(bookItem.book.authors)}</td>
                                                <td style={{width: '150px',textAlign: 'center', border: '2px solid #5D3C64'}}>{bookItem.quantity}</td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
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

export default SaleWindow;