import classes from './Header.module.css';
import logo from '../assets/logo.png'

export default function Header(){


    return(
        <header>
            <img src={logo} alt="A canvas" />
            <h1>ReactArt</h1>
            <p className={classes.paragraph}>A community artist and art lovers</p>
        </header>
    )
}