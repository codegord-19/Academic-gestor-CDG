import React from 'react';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    // Estado inicial con la fecha y hora actual
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000 // Actualiza cada segundo
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date() // Actualiza el estado con la nueva fecha y hora
    });
  }

  render() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fechaConLetra = this.state.date.toLocaleDateString('es-ES', options);

    return (
      <div>
        <h2 style={{ fontSize: '24px' }}>Son las {this.state.date.toLocaleTimeString()}.</h2>
        <p style={{ fontStyle: 'italic' }}>Hoy es {fechaConLetra}.</p>
      </div>
    );
  }
}

export default Clock;
