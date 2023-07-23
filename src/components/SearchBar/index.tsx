import SearchIcon from '@mui/icons-material/Search';
import styles from './search.module.scss';
const SearchBar = () => {
  return (
    <>
      <div className={styles.box_search}>
        <input className={styles.input} placeholder='Поиск товаров' />
        <SearchIcon fontSize='medium' className={styles.icon} />
      </div>
    </>
  );
};

export default SearchBar;
