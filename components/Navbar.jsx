import Link from 'next/link'
import style from '../styles/Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={style.mainNav}>
      <div>
        <Link href='/'>
          <a><span>MySongs</span></a>
        </Link>
      </div>
      <div className={style.navItems}>
        <a>My favorite songs</a>
      </div>
    </nav>
  );
};