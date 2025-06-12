import Header from '../Header/Header';
import React, {useState, useEffect} from 'react';
import Search from './Search/Search.js';
import DropDownCategories from './DropDownCategories/DropDownCategories.js';
import Catalog from './Catalog/Catalog.js';
import styles from './Catalog_page.module.css';
import AddBookWindow from './AddBookWindow/AddBookWindow.js';
import FetchWithAuth from '../Login_page/FetchWithAuth.js';

// const books = [
//    {
//       id_book: 1,
//       cover_image: "Book1.svg",
//       price: '321',
//       title: 'Wayward son',
//       authors: [
//                 {
//                     "author_last_name": "Шолохов",
//                     "author_first_name": "Михаил",
//                     "author_patronymic": "Александрович"
//                 }
//             ],
//       discounted_price: '300',
//       number_of_copies: '0'
//    },
//    {
//       id_book: 2,
//       cover_image: "Book2.svg",
//       price: '456',
//       title: 'Cinder',
//       authors: [
//                 {
//                     "author_last_name": "Шолохов",
//                     "author_first_name": "Михаил",
//                     "author_patronymic": "Александрович"
//                 }
//             ],
//       discounted_price: null,
//       number_of_copies: '3'
//    },
//    {
//       id_book: 3,
//       cover_image: "Book3.svg",
//       price: '257',
//       title: 'Supernova',
//       authors: [
//                 {
//                     "author_last_name": "Шолохов",
//                     "author_first_name": "Михаил",
//                     "author_patronymic": "Александрович"
//                 }
//             ],
//       discounted_price: null,
//       number_of_copies: '0'
//    },
//    {
//       id_book: 4,
//       cover_image: "Book4.svg",
//       price: '127',
//       title: 'The sunbearer trialssssssssss',
//       authors: [
//                 {
//                     "author_last_name": "Шолохов",
//                     "author_first_name": "Михаил",
//                     "author_patronymic": "Александрович"
//                 }
//             ],
//       discounted_price: null,
//       number_of_copies: '3'
//    },
//    {
//       id_book: 5,
//       cover_image: "Book5.svg",
//       price: '478',
//       title: 'Legend born',
//       authors: [
//                 {
//                     "author_last_name": "Шолохов",
//                     "author_first_name": "Михаил",
//                     "author_patronymic": "Александрович"
//                 }
//             ],
//       discounted_price: null,
//       number_of_copies: '3'
//    },
//    {
//       id_book: 6,
//       cover_image: "Book6.svg",
//       price: '562',
//       title: 'Deadly',
//       authors: [
//                 {
//                     "author_last_name": "Шолохов",
//                     "author_first_name": "Михаил",
//                     "author_patronymic": "Александрович"
//                 }
//             ],
//       discounted_price: '500',
//       number_of_copies: '3'
//    },
//    {
//       id_book: 7,
//       cover_image: "Book1.svg",
//       price: '321',
//       title: 'Wayward son',
//       authors: [
//                 {
//                     "author_last_name": "Кинг",
//                     "author_first_name": "Стивен",
//                     "author_patronymic": null
//                 }
//             ],
//       discounted_price: null,
//       number_of_copies: '3'
//    },
//    {
//       id_book: 8,
//       cover_image: "Book2.svg",
//       price: '456',
//       title: 'Cinder',
//       authors: [
//                 {
//                     "author_last_name": "Кинг",
//                     "author_first_name": "Стивен",
//                     "author_patronymic": null
//                 }
//             ],
//       discounted_price: null,
//       number_of_copies: '3'
//    },
//    {
//       id_book: 9,
//       cover_image: "Book3.svg",
//       price: '257',
//       title: 'Supernova',
//       authors: [
//                 {
//                     "author_last_name": "Шолохов",
//                     "author_first_name": "Михаил",
//                     "author_patronymic": "Александрович"
//                 }
//             ],
//       discounted_price: null,
//       number_of_copies: '3'
//    },
//    {
//       id_book: 10,
//       cover_image: "Book4.svg",
//       price: '127',
//       title: 'The sunbearer trials',
//       authors: [
//                 {
//                     "author_last_name": "Кинг",
//                     "author_first_name": "Стивен",
//                     "author_patronymic": null
//                 }
//             ],
//       discounted_price: null,
//       number_of_copies: '3'
//    },
//    {
//       id_book: 11,
//       cover_image: "Book5.svg",
//       price: '478',
//       title: 'Legend born',
//       authors: [
//                 {
//                     "author_last_name": "Кинг",
//                     "author_first_name": "Стивен",
//                     "author_patronymic": null
//                 }
//             ],
//       discounted_price: null,
//       number_of_copies: '3'
//    },
//    {
//       id_book: 12,
//       cover_image: "Book6.svg",
//       price: '562',
//       title: 'Deadly',
//       authors: [
//                 {
//                     "author_last_name": "Кинг",
//                     "author_first_name": "Стивен",
//                     "author_patronymic": null
//                 }
//             ],
//       discounted_price: null,
//       number_of_copies: '3'
//    },
//    {
//       id_book: 13,
//       cover_image: "Book1.svg",
//       price: '321',
//       title: 'Wayward son',
//       authors: [
//                 {
//                     "author_last_name": "Кинг",
//                     "author_first_name": "Стивен",
//                     "author_patronymic": null
//                 }
//             ],
//       discounted_price: null,
//       number_of_copies: '3'
//    }
// ];


function Catalog_page()
{
  const [addBookModalOpen, setAddBookModalOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  async function loadData()
  {
    setLoading(true);
    try {
      const [response1, response2] = await Promise.all([
        FetchWithAuth("http://127.0.0.1:8000/api/books/"), 
        FetchWithAuth("http://127.0.0.1:8000/api/categories/") 
      ]);

      const [data1, data2] = await Promise.all([
        response1.json(),
        response2.json()
      ]);

      setBooks(data1);
      setCategories(data2);
    }
    catch (err) {
      setError("Ошибка загрузки данных");
    }
    finally
    {
      setLoading(false);
    }
  };

  async function editBooks() {
    setLoading(true);
    try {
      const response = await FetchWithAuth(`http://127.0.0.1:8000/api/books/sorted/${selectedCategory}`);
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      setError("Ошибка загрузки данных");
    } finally {
      setLoading(false);
    }
  }
  
  useEffect (() => {
    loadData();
  }, []);
 
   const handleCategoryChange = (categoryId) => {
      setSelectedCategory(categoryId);
   };

   useEffect(() => {
      editBooks();
   }, [selectedCategory]);

  if (loading)
  {
    return <p>"Загрузка ..."</p>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center' }}>
      <Header />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 42, marginTop: 42 }}>
               <Search />
               <DropDownCategories 
                  allCategories={categories} onCategoriesChange={handleCategoryChange} SelCat={selectedCategory}
               />
               <button className={styles.AddBook} onClick={() => setAddBookModalOpen(true)}>Добавить книгу</button> 
               <AddBookWindow 
               isOpen={addBookModalOpen} onClose={() => setAddBookModalOpen(false)} 
               />
            </div>
             {error ? (
                <p style={{ fontSize: 20, color: 'lightgray' }}>{error}</p>
            ) : (
                 books.length > 0 ?  
                    ( 
                      <Catalog data={books}/>
                      ) : 
                    (<p style={{ fontSize: 20, color: 'lightgray' }}>Похоже, у нас такого нет</p>) 
            )}   
        </div>
    </div>
  );

}

export default Catalog_page;