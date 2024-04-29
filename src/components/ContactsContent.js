import '../styles/contacts.css';
import React, { useState, useEffect } from 'react';

function ContactsContent() {
  // Estado para manejar la lista de contactos
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const loadedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(loadedContacts);
  }, []);

  // Estado para manejar el nuevo contacto a añadir
  const [newContact, setNewContact] = useState({
    Name: '',
    Apellido: '',
    Telefono: '',
    Correo: '',
  });

  // Estado para manejar el filtro de búsqueda
  const [filter, setFilter] = useState('');

  // Maneja los cambios en los inputs para el nuevo contacto
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Maneja los cambios en el input de filtrado
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Agrega el nuevo contacto a la lista y restablece el estado de newContact
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newContact.Name && newContact.Apellido && newContact.Telefono && newContact.Correo) {
      const updatedContacts = [...contacts, { ...newContact, id: Date.now() }];
      setContacts(updatedContacts);
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
      setNewContact({
        Name: '',
        Apellido: '',
        Telefono: '',
        Correo: '',
      });
    }
  };

  // Filtra los contactos basándose en el estado de filter
  const filteredContacts = contacts.filter((contact) =>
    contact.Name.toLowerCase().includes(filter.toLowerCase()) ||
    contact.Apellido.toLowerCase().includes(filter.toLowerCase()) ||
    contact.Telefono.includes(filter) ||
    contact.Correo.toLowerCase().includes(filter.toLowerCase())
  );

  // Borra un contacto de la lista
  const deleteContact = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };
  

  return (
    <div className='Contactos'>
        <div className='title'>
          <h2 className="animate__animated animate__fadeIn">Contactos</h2>
          <i className="fa-regular fa-address-card"></i>
        </div>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                id="Name"
                name="Name"
                placeholder="Nombre"
                value={newContact.Name}
                onChange={handleInputChange}
            />
            <input
                type="text"
                id="Apellido"
                name="Apellido"
                placeholder="Apellido"
                value={newContact.Apellido}
                onChange={handleInputChange}
            />
            <input
                type="text"
                id="Telefono"
                name="Telefono"
                placeholder="Telefono"
                value={newContact.Telefono}
                onChange={handleInputChange}
            />
            <input
                type="text"
                id="Correo"
                name="Correo"
                placeholder="Correo"
                value={newContact.Correo}
                onChange={handleInputChange}
            />
            <input
                type="text"
                id="Filter"
                name="Filter"
                placeholder="Filtrar..."
                value={filter}
                onChange={handleFilterChange}
            />        
            <button type="submit"><i className="fa-regular fa-square-plus"></i></button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Telefono</th>
              <th>Correo</th>
              <th>Borrar</th>
              <th></th>
            </tr>
          </thead>
          <tbody className='contactsTable'>
            {filteredContacts.map((contact) => (
              <tr className="contactRow" key={contact.id}>
                <td className="contactCell td1">{contact.Name}</td>
                <td className="contactCell td1">{contact.Apellido}</td>
                <td className="contactCell td1">{contact.Telefono}</td>
                <td className="contactCell td1">{contact.Correo}</td>
                <td className="contactCell td1">
                  <button onClick={() => deleteContact(contact.id)}>⛔</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>

  );
}

export default ContactsContent;
