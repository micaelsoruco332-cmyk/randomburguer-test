import { useEffect, useState } from 'react'
import './App.css'

function PagoExitoso() {
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const pedido = sessionStorage.getItem('pedidoWhatsapp');
    if (pedido) setMensaje(pedido);
  }, []);

  const enviarWhatsApp = () => {
    const mensajeFinal = mensaje + "\n\n📎 *El comprobante será adjuntado en el chat*";
    window.open(`https://wa.me/5493884850786?text=${encodeURIComponent(mensajeFinal)}`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--azul-oscuro)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Poppins, sans-serif'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        border: '2px solid var(--amarillo-precio)',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✅</div>
        <h2 style={{ color: 'var(--amarillo-precio)', marginBottom: '10px' }}>¡Pago exitoso!</h2>
        <p style={{ color: 'var(--blanco)', marginBottom: '30px', opacity: 0.9 }}>
          Tu pago fue procesado correctamente. Ahora envianos tu pedido por WhatsApp.
        </p>

        <div style={{
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid var(--amarillo-precio)',
          borderRadius: '10px',
          padding: '15px',
          marginBottom: '20px'
        }}>
          <p style={{ color: 'var(--amarillo-precio)', fontWeight: 'bold', marginBottom: '10px' }}>
            COMPROBANTE DE PAGO
          </p>
          <p style={{ color: 'var(--blanco)', fontSize: '0.9rem', margin: 0, lineHeight: '1.6' }}>
            Una vez que se abra WhatsApp, adjuntá el comprobante de pago.
          </p>
        </div>

        <button
          onClick={enviarWhatsApp}
          style={{
            background: '#25D366',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '30px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            width: '100%',
            marginBottom: '15px'
          }}
        >
          📱 Enviar pedido por WhatsApp
        </button>

        <a href="/" style={{ color: 'var(--amarillo-precio)', fontSize: '0.9rem' }}>
          Volver al inicio
        </a>
      </div>
    </div>
  );
}

export default PagoExitoso;