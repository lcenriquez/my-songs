import Link from 'next/link'
import style from './SearchResults.module.css';

export default function SearchResults({ results }) {
  let resultList = results.map(result => {
    console.log(result);
    return (
      <div key={result.result.id}>
        <Link href={result.result.api_path}><li><a>{result.result.full_title}</a></li></Link>
      </div>
    );
  })

  return (
    <ul className={style.suggestions}>
      { resultList }
    </ul>
  );
};