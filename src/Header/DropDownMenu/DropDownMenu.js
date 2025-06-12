import React, {useState, useRef, useEffect} from "react";
import styles from "./DropDownMenu.module.css";
import FetchWithAuth from "../../Login_page/FetchWithAuth";
import ShelvingManagementWindow from "../ShelvingManagementWindow/ShelvingManagementWindow";
import WriteOffWindow from "../WriteOffWindow/WriteOffWindow";
import EntranceWindow from "../Entrance/EntranceWindow";
import SaleWindow from "../SaleWindow/SaleWindow";
import PlacementWindow from "../PlacementWindow/PlacementWindow";
import { useNavigate } from "react-router-dom"; 

// const shelvingData = [
//    {
//       id: 1,
//       count: 10
//    },
//    {
//       id: 2,
//       count: 15
//    },
//    {
//       id: 3,
//       count: 100
//    },
//    {
//       id: 4,
//       count: 105
//    },
//    {
//       id: 5,
//       count: 83
//    },
//    {
//       id: 6,
//       count: 58
//    },
//    {
//       id: 7,
//       count: 70
//    },
//    {
//       id: 8,
//       count: 80
//    }
// ]

// const writeOffData = [
   
//     {
//         id: 2,
//         reason: "Поврежден при транспортировке",
//         quantity: 1,
//         dateTime: "2025-06-11T19:41:18.608484Z",
//         book: {
//             title: "Солярис",
//             authors: [
//                 {
//                     "lastname": "Лем",
//                     "firstname": "Станислав",
//                     "patronymic": "Евгеньевич"
//                 }
//             ]
//         }
//     },
//     {
//         id: 3,
//         reason: "Поврежден при транспортировке",
//         quantity: 4,
//         dateTime: "2025-06-11T19:41:18.608484Z",
//         book: {
//             title: "Солярис",
//             authors: [
//                 {
//                     "lastname": "Лем",
//                     "firstname": "Станислав",
//                     "patronymic": "Евгеньевич"
//                 }
//             ]
//         }
//     },
//     {
//         id: 4,
//         reason: "Поврежден при транспортировке",
//         quantity: 4,
//         dateTime: "2025-06-11T19:41:18.608484Z",
//         book: {
//             title: "Солярис",
//             authors: [
//                 {
//                     "lastname": "Лем",
//                     "firstname": "Станислав",
//                     "patronymic": "Евгеньевич"
//                 }
//             ]
//         }
//     },
//     {
//         id: 4,
//         reason: "Поврежден при транспортировке",
//         quantity: 4,
//         dateTime: "2025-06-11T19:41:18.608484Z",
//         book: {
//             title: "Солярис",
//             authors: [
//                 {
//                     "lastname": "Лем",
//                     "firstname": "Станислав",
//                     "patronymic": "Евгеньевич"
//                 }
//             ]
//         }
//     }
// ]

// const entranceData =[
//     {
//         "id": 1,
//         "dateTime": "2025-06-11T19:34:57.047422Z",
//         "books": [
//             {
//                 "book": {
//                     "title": "Солярис",
//                     "authors": [
//                         {
//                             "lastname": "Лем",
//                             "firstname": "Станислав",
//                             "patronymic": "Евгеньевич"
//                         }
//                     ]
//                 },
//                 "quantity": 10
//             },
//             {
//                 "book": {
//                     "title": "Краткая история времени",
//                     "authors": [
//                         {
//                             "lastname": "Хокинг",
//                             "firstname": "Стивен",
//                             "patronymic": null
//                         }
//                     ]
//                 },
//                 "quantity": 10
//             }
//         ]
//     },
//     {
//         "id": 2,
//         "dateTime": "2025-06-11T19:52:43.042599Z",
//         "books": [
//             {
//                 "book": {
//                     "title": "Солярис",
//                     "authors": [
//                         {
//                             "lastname": "Лем",
//                             "firstname": "Станислав",
//                             "patronymic": "Евгеньевич"
//                         }
//                     ]
//                 },
//                 "quantity": 10
//             }
//         ]
//     },
//     {
//         "id": 2,
//         "dateTime": "2025-06-11T19:52:43.042599Z",
//         "books": [
//             {
//                 "book": {
//                     "title": "Солярис",
//                     "authors": [
//                         {
//                             "lastname": "Лем",
//                             "firstname": "Станислав",
//                             "patronymic": "Евгеньевич"
//                         }
//                     ]
//                 },
//                 "quantity": 10
//             }
//         ]
//     }
// ]

// const saleData = [
//     {
//         "id": 1,
//         "final_price": 700.0,
//         "date": "2025-06-12",
//         "books": [
//             {
//                 "book": {
//                     "title": "Краткая история времени",
//                     "authors": [
//                         {
//                             "author_last_name": "Хокинг",
//                             "author_first_name": "Стивен",
//                             "author_patronymic": null
//                         }
//                     ]
//                 },
//                 "quantity": 1
//             },
//             {
//                 "book": {
//                     "title": "Солярис",
//                     "authors": [
//                         {
//                             "author_last_name": "Лем",
//                             "author_first_name": "Станислав",
//                             "author_patronymic": "Евгеньевич"
//                         }
//                     ]
//                 },
//                 "quantity": 1
//             }
//         ]
//     },
//     {
//         "id": 2,
//         "final_price": 800.0,
//         "date": "2025-06-12",
//         "books": [
//             {
//                 "book": {
//                     "title": "Краткая история времени",
//                     "authors": [
//                         {
//                             "author_last_name": "Хокинг",
//                             "author_first_name": "Стивен",
//                             "author_patronymic": null
//                         }
//                     ]
//                 },
//                 "quantity": 1
//             }
//         ]
//     }
// ]

// const placementData = [
//     {
//         "book": {
//             "title": "Солярис",
//             "authors": [
//                 {
//                     "lastname": "Лем",
//                     "firstname": "Станислав",
//                     "patronymic": "Евгеньевич"
//                 }
//             ]
//         },
//         "storages": [
//             {
//                 "id": 1,
//                 "name": "Стеллаж",
//                 "quantity": 5
//             }
//         ]
//     },
//     {
//         "book": {
//             "title": "Краткая история времени",
//             "authors": [
//                 {
//                     "lastname": "Хокинг",
//                     "firstname": "Стивен",
//                     "patronymic": null
//                 }
//             ]
//         },
//         "storages": [
//             {
//                 "id": 1,
//                 "name": "Стеллаж",
//                 "quantity": 3
//             },
//             {
//                 "id": 2,
//                 "name": "Витрина",
//                 "quantity": 5
//             },
//             {
//                 "id": 3,
//                 "name": "Склад",
//                 "quantity": 3
//             }
//         ]
//     }
// ]


function DropDownMenu() {
   const [isOpen, setIsOpen] = useState(false);
   const [shelvingManagementModalOpen, setShelvingManagementModalOpen] = useState(false);
   const [shelvingData, setShelvingData] = useState(null);
   const [writeOffModalOpen, setWriteOffModalOpen] = useState(false);
   const [writeOffData, setWriteOffData] = useState(null);
   const [entranceModalOpen, setEntranceModalOpen] = useState(false);
   const [entranceData, setEntranceData] = useState(null);
   const [saleModalOpen, setSaleModalOpen] = useState(false);
   const [saleData, setSaleData] = useState(null);
   const [placementModalOpen, setPlacementModalOpen] = useState(false);
   const [placementData, setPlacementData] = useState(null);
   const container = useRef();
   const navigate = useNavigate();

   const handleLogout = async () => {
      const refreshToken = localStorage.getItem('refreshToken');
      try {
         const response = await FetchWithAuth('http://127.0.0.1:8000/api/logout/', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh: refreshToken })
         });
         if (!response.ok) throw new Error('Ошибка при выходе');
         localStorage.removeItem('accessToken');
         localStorage.removeItem('refreshToken');  
         navigate("/");
      } catch (error) {
      }
   };

   const fetchShelvingGet = async () => {
      try {
        const response = await FetchWithAuth("http://127.0.0.1:8000/api/storage/"); // дописать
        if (response && response.ok) {
          const data = await response.json();
          setShelvingData(data);
          setShelvingManagementModalOpen(true);
        }
      } catch (err) {
        alert('Ошибка при получении данных о стеллажах');
      }
    };

   const fetchWriteOffGet = async () => {
      try {
        const response = await FetchWithAuth("http://127.0.0.1:8000/api/writeoffs/"); // дописать
        if (response && response.ok) {
          const data = await response.json();
          setWriteOffData(data);
          setWriteOffModalOpen(true);
        }
      } catch (err) {
        alert('Ошибка при получении данных о списаниях');
      }
    };

   const fetchEntranceGet = async () => {
      try {
        const response = await FetchWithAuth("http://127.0.0.1:8000/api/entrances/"); // дописать
        if (response && response.ok) {
          const data = await response.json();
          setEntranceData(data);
          setEntranceModalOpen(true);
        }
      } catch (err) {
        alert('Ошибка при получении данных о поступлениях');
      }
    };

   const fetchSaleGet = async () => {
      try {
        const response = await FetchWithAuth("http://127.0.0.1:8000/api/sales/"); // дописать
        if (response && response.ok) {
          const data = await response.json();
          setSaleData(data);
          setSaleModalOpen(true);
        }
      } catch (err) {
        alert('Ошибка при получении данных о продажах');
      }
    };

   const fetchPlacementGet = async () => {
      try {
        const response = await FetchWithAuth("http://127.0.0.1:8000/api/distribution/"); // дописать
        if (response && response.ok) {
          const data = await response.json();
          setPlacementData(data);
          setPlacementModalOpen(true);
        }
      } catch (err) {
        alert('Ошибка при получении данных о продажах');
      }
    };
   
   useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown",  handleClickOutside);
   }, []);

   const handleToggle = () => setIsOpen(!isOpen);

   const handleClickOutside = (e) => {
      if (container.current && !container.current.contains(e.target)) {
         setIsOpen(false);
      }
   };

   return (
      <div className={styles.DropDownSortContainer} ref={container}>
         <button type="button" className={`${styles.DropDownSortButton} ${isOpen ? styles.Open : ""}`} onClick={handleToggle}>
            Меню
         </button>
         {isOpen && (
            <div className={styles.DropDown}>
               <button className={styles.Button} 
                onClick={() => {fetchShelvingGet()}}
               >Управление стеллажами</button>
               <ShelvingManagementWindow isOpen={shelvingManagementModalOpen} onClose={() => {setShelvingManagementModalOpen(false); 
               setShelvingData(null);
                  }} obj={shelvingData}/>

               <button className={styles.Button} 
               onClick={() => {fetchWriteOffGet()}}
               >Списания</button>
               <WriteOffWindow isOpen={writeOffModalOpen} onClose={() => {setWriteOffModalOpen(false); 
                  setWriteOffData(null);
                  }} obj={writeOffData}/>

               <button className={styles.Button} 
               onClick={() => {fetchEntranceGet()}}
               >Размещение книг</button>
               <EntranceWindow isOpen={entranceModalOpen} onClose={() => {setEntranceModalOpen(false); 
                    setEntranceData(null);
                  }} obj={entranceData}/>

               <button className={styles.Button} 
               onClick={() => {fetchPlacementGet()}}
               >Поступления книг</button>
               <PlacementWindow isOpen={placementModalOpen} onClose={() => {setPlacementModalOpen(false); 
                  setPlacementData(null);
                  }} obj={placementData}/>

               <button className={styles.Button} 
               onClick={() => {fetchSaleGet()}}
               >Продажи</button>
               <SaleWindow isOpen={saleModalOpen} onClose={() => {setSaleModalOpen(false); 
                  setSaleData(null);
                  }} obj={saleData}/>

               <button className={styles.Button} onClick={handleLogout}>Выход</button>
            </div>
         )}
      </div>
   );
}

export default DropDownMenu;