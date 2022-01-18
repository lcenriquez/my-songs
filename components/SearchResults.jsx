import Link from 'next/link'

export default function SearchResults({ results }) {
  let resultList = results.map(result => {
    console.log(result);
    return (
      <div key={result.result.id}>
        <Link href={result.result.api_path}><a>{result.result.full_title}</a></Link>
      </div>
    );
  })

  return (
    <div>
      { resultList }
    </div>
  );
};