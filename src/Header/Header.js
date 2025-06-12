import React, {useState} from "react";
import { Link } from "react-router-dom"; 
import styles from "./Header.module.css";
import DropDownMenu from "./DropDownMenu/DropDownMenu";

function Header() {

   const [isHovered, setIsHovered] = useState(false);

   return (
      <div className={styles.headerContainer}>
         <div className={styles.content}>
            <div className={styles.logoContainer}>
               <p className={styles.logo} style={{fontWeight: 900}}>BOOK</p>
               <p className={styles.logo} style={{fontSize: 20, marginLeft: 7, fontWeight: 500}}>shop</p>
            </div>
            <div>
               <nav className={styles.navigation}>
                  <Link to="/Catalog" className={styles.catalogNav}>Каталог</Link>
               </nav>
            </div>
         </div>
         <div className={styles.containerButtonHeader}>  
            <button 
               className={`${styles.deliveryButton} ${isHovered ? styles.hovered : ''}`}
               onMouseEnter={() => setIsHovered(true)}
               onMouseLeave={() => setIsHovered(false)}>
                  <img src="/shopping-cart.svg" alt="корзина" />
            </button>
            <DropDownMenu/>
         </div>
      </div>
   );
}

export default Header;