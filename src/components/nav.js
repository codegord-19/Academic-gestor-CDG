import '../styles/nav.css'
import CDG from '../img/Codegord.png'

function Nav({ onButtonClick,  onLogout }) {
    return(
      <div className='Navbar'>
        <div className='logo'>
          <img src={CDG} alt=''></img>
        </div>
        <div className='boxnav'>
            <button onClick={() => onButtonClick('Home')}>Home <i class="fa-solid fa-house"></i></button>
            <button onClick={() => onButtonClick('Notas')}>Notas <i class="fa-solid fa-book-open"></i></button>
            <button onClick={() => onButtonClick('Task')}>Task <i class="fa-solid fa-list-check"></i></button>
            <button onClick={() => onButtonClick('Contacts')}>Estudents <i className="fa-regular fa-address-card"></i></button>
            <button onClick={() => onButtonClick('Calculator')}>Calculator <i class="fa-solid fa-calculator"></i></button>
            <button onClick={onLogout}>Salir <i class="fa-solid fa-arrow-right-from-bracket"></i></button>
        </div>
      </div>
    )
}

export default Nav;
