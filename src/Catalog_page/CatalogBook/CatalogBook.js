import React, {useState, useEffect} from "react";
import styles from "./CatalogBook.module.css";
import DeleteBookWindow from "../DeleteBookWindow/DeleteBookWindow";
import FetchWithAuth from "../../Login_page/FetchWithAuth";

function CatalogBook({product})
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
      <div className={styles.CatalogBook}>
        <img src={product.cover_image}
             style={{ width: '160px',  height: '250px',  display: 'block' }}/>
        <div className={styles.InfoContainer}>
          <div className={styles.Info}>
            <p style={{fontWeight: 'bold', marginBottom: 2}}>{product.price} ₽</p>
            <p style={{marginBottom: 2}}>{product.title}</p>
            {product.authors.map((author, index) => (
              <p key={index} style={{ fontSize: 12, color: "#777777" }}>
                {author.author_last_name} {author.author_first_name} {author.author_patronymic}
              </p> ))}
            <p className={styles.Stock} style={{ color: product.number_of_copies == "0" ? 'red' : '#0F870A' }}>
               {product.number_of_copies == "0" ? 'Нет в наличии' : 'В наличии'}
            </p>
          </div>
              <div className={`${styles.ButtonContainer} prevent-navigation`}>
                <button className={styles.EditBook}>Редактировать</button>
                <button className={styles.Trash} onClick={() => { fetchBookForDelete(product.id); }}></button>
                <DeleteBookWindow isOpen={deleteBookModalOpen} onClose={() => {setDeleteBookModalOpen(false); setDeleteBookData(null);}} obj={deleteBookData}/>
              </div>
        </div>
      </div>
    );

}

export default CatalogBook;