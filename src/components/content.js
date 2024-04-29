import React from 'react';
import '../styles/content.css';
import HomeContent from './HomeContent';
import Notas from './notas';
import TaskContent from './TaskContent';
import ContactsContent from './ContactsContent';
import CalculatorContent from './CalculatorContent';
import ConversorContent from './ConversorContent';

function Content({ activeContent }) {
    const renderContent = () => {
        switch (activeContent) {
            case 'Home':
                return <HomeContent />;
            case 'Notas':
                return <Notas />    
            case 'Task':
                return <TaskContent />;
            case 'Contacts':
                return <ContactsContent />;
            case 'Calculator':
                return <CalculatorContent />;
            case 'Conversor':
                return <ConversorContent />;
            default:
                return <div>Selecciona una opción</div>;
        }
    };

    return(
        <div className="container">
            {renderContent()}
        </div>
    );
}

export default Content;
