import '../styles/home.css'
import 'animate.css';
import Clock from './clock';
import Banner from '../img/banner.png'

function HomeContent() {
    return(
      <div className="homec">
        <div className="hometitle"><h2 className="animate__animated animate__fadeIn">Bienvenido al Gestor Académico <i className="fa-solid fa-chalkboard-user"></i></h2></div>
        <div className="homecontent">
          <div className='homedesc'>
            <Clock />
            <h2 className="animate__animated animate__fadeIn">CDG Academic Manager <i className="fa-regular fa-circle-up"></i></h2>
            <p>Optimiza el proceso educativo</p>
            <p className="animate__animated animate__fadeIn animate__delay-1s">Bienvenido a CDG Academic Manager, su asistente acádemico diseñado para la gestión integral de notas, tareas y registros estudiantiles. La organización, la sistematización y la optimización del proceso educativo se llevan a cabo con simplicidad y eficiencia mediante una interfaz amigable.</p>
            <img src={Banner} alt=''></img>
          </div>
          <div className='card'>  
            <div className='Hdesc'>
              <div className='text'>
                <h2 className="animate__animated animate__zoomIn animate__delay-1s">Organize tasks</h2>
                <p className="animate__animated animate__zoomIn animate__delay-1s">Manage your tasks by status and date.</p>
              </div>
              <i className="fa-regular fa-circle-check"></i>
            </div>
            <div className='Hdesc'>
              <div className='text'>
                <h2 className="animate__animated animate__zoomIn animate__delay-2s">Optimal Interface</h2>
                <p className="animate__animated animate__zoomIn animate__delay-2s">Interface designed for ease of use.</p>
              </div>
              <i className="fa-solid fa-wand-magic-sparkles"></i>
            </div>
            <div className='Hdesc'>
              <div className='text'>
                <h2 className="animate__animated animate__zoomIn animate__delay-3s">Contacts book</h2>
                <p className="animate__animated animate__zoomIn animate__delay-3s">Control the order of your contacts</p>
              </div>
              <i className="fa-regular fa-address-book"></i>
            </div>
          </div>   
        </div>
      </div>
    );
  }
  
  export default HomeContent;
  