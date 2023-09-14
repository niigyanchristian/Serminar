import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
interface HeaderProps {
  active: string;
}

export default function Header({ active }: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <Script src="js/script.js" />
      <div style={{display:'flex',alignItems:'center'}}>
      <Image height={50} width={50} alt="Logo" src={'/images/logo.jpg'}/>
      <a href="#" className="logo">
        DLCF Weija Campus Division Portal 
      </a>
      </div>

      <nav className="navbar">
        <Link href="/" className={active === 'home' ? 'active' : undefined}>
          Portal
        </Link>
        <Link
          href="/questions"
          className={active === 'questions' ? 'active' : undefined}
        >
          Questions
        </Link>
        <Link href="/answers" className={active === 'answers' ? 'active' : undefined}>
          Answers
        </Link>
        {/* <Link href="#portfolio">Portfolio</Link>
        <Link href="#contact">Contact</Link> */}
      </nav>
    </header>
  );
}
