import React, {useState, useEffect} from "react";
import styles from "./BookInfo.module.css";
import DeleteBookWindow from "../../Catalog_page/DeleteBookWindow/DeleteBookWindow";
import FetchWithAuth from "../../Login_page/FetchWithAuth";

function BookInfo({Book})
{
   const [deleteBookModalOpen, setDeleteBookModalOpen] = useState(false);
   const [deleteBookData, setDeleteBookData] = useState(null);

   const fetchBookForDelete = async (bookId) => {
      try {
        const response = await FetchWithAuth(`http://127.0.0.1:8000/api/books/${bookId}/`);
        if (response && response.ok) {
          const data = await response.json();
          setDeleteBookData(data.book);
          setDeleteBookModalOpen(true);
        }
      } catch (err) {
        alert('Ошибка при получении данных о книге');
        console.error(err);
      }
    };


   return(
      <div className={styles.InfoContainer}>
         <img style={{width: 360, height: 564, display: 'block'}} src={Book.cover_image}/>
         <div className={styles.BookInfo}>
               <div className={styles.descriptionConteiner}>
                  <p className={styles.descriptionName}>Описание</p>
                  <p className={styles.description} style={{marginBottom:'15px'}}>{Book.description}</p>
                  <p className={styles.descriptionName}>Ключевые слова</p>
                  <p className={styles.description}>{Book.keywords}</p>
               </div>
               <div className={styles.mainInfo}>
                  <div className={styles.attributeName}>
                     <p>Название книги</p>
                     <p>Статус</p>
                     <p>Жанр</p>
                     <p>Издательство</p>
                     <p>Авторы</p>
                  </div>
                  <div className={styles.attributeValue}>
                     <p>{Book.title}</p>
                     <p>{Book.status}</p>
                     <p>{Book.category.category_name}</p>
                     <p>{Book.publishing}</p>
                     {Book.authors.map((author, index) => (
                        <p key={index}>
                           {author.author_last_name} {author.author_first_name} {author.author_patronymic}
                        </p>
                     ))}
                  </div>
               </div>
         </div>
         <div className={styles.BookPriceStatusContainer}>
            <div className={styles.BookPriceBasketContainer}>
               <div className={styles.BookPriceContainer}>
                  <p style={{marginRight: '15px'}}>Цена:</p>
                  <p style={{fontWeight: 500}}>{Book.price} ₽</p>
               </div>
                  <div className={styles.ButtonContainer}>
                  <button
                     className={styles.EditBook}
                  >Редактировать</button>
                  <button className={styles.Trash} onClick={() => fetchBookForDelete(Book.id)}>Удалить </button>
                  <DeleteBookWindow isOpen={deleteBookModalOpen} onClose={() => {setDeleteBookModalOpen(false); setDeleteBookData(null);}} obj={deleteBookData}/>
                  <button
                     className={styles.Placement}
                  >Разместить</button>
                  <button
                     className={styles.WriteDowns}
                  >Списать</button>
                  <button
                     className={styles.AddCart}
                  >Добавить в корзину</button>
              </div>
            </div>
            <p className={styles.Stock} style={{ color: Book.number_of_copies == "0" ? 'red' : '#0F870A' }}>
               {Book.number_of_copies == "0" ? 'Нет в наличии' : 'В наличии'}
            </p>
         </div>
      </div>
   );
}

export default BookInfo;