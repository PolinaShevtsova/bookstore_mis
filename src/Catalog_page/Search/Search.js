import React, { useState } from 'react';
import styles from '../Search/Search.module.css';

function Search() {

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        maxLength="40"
        className={styles.searchInput}
        placeholder="Поиск..."
      />
    </div>
  );
}

export default Search;