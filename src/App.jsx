import { useState, useEffect } from 'react'
import './App.css'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const [carrito, setCarrito] = useState([]);
  const [productoEnEdicion, setProductoEnEdicion] = useState(null);
  const [verCarrito, setVerCarrito] = useState(false);
  const [comentario, setComentario] = useState("");
  const [tamano, setTamano] = useState("Simple");
  const [metodoEnvio, setMetodoEnvio] = useState("Retiro");
  const [barrio, setBarrio] = useState("");
  const [direccionDetalle, setDireccionDetalle] = useState("");
  const [extras, setExtras] = useState({});
  const [indexSlider, setIndexSlider] = useState(0);
  const [miembroSeleccionado, setMiembroSeleccionado] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [codigoDescuento, setCodigoDescuento] = useState("");
  const [descuentoAplicado, setDescuentoAplicado] = useState(null);
  const [errorCodigo, setErrorCodigo] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [verPago, setVerPago] = useState(false);
  const [mostrarTransferencia, setMostrarTransferencia] = useState(false);
  const fotosEquipo = ["/pibes.jpeg", "/papiux.png", "/z.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndexSlider((prev) => (prev + 1) % fotosEquipo.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [fotosEquipo.length]);

  const COSTOS_ENVIO = {
    "Mariano Moreno": 3000,
    "Huaico": 0,
    "Ciudad de Nieva": 1500,
    "Centro": 2000,
    "Los Perales": 2000
  };

  const CODIGOS_DESCUENTO = {
    "RANDOM10": { tipo: "porcentaje", valor: 10, activo: true },
    "RANDOM15": { tipo: "porcentaje", valor: 15, activo: true },
    "RANDOM20": { tipo: "porcentaje", valor: 20, activo: true },
    "RANDOM11": { tipo: "porcentaje", valor: 10, activo: true },
    "RNDMDELI": { tipo: "delivery_gratis", activo: true },
    "RNDMFREE": { tipo: "hamburguesa_gratis", activo: true },
  };

  const aplicarCodigo = () => {
    const codigo = codigoDescuento.toUpperCase().trim();
    const descuento = CODIGOS_DESCUENTO[codigo];
    if (!descuento) {
      setErrorCodigo("Código inválido ❌");
      setDescuentoAplicado(null);
      return;
    }
    if (!descuento.activo) {
      setErrorCodigo("Este código ya no está disponible ❌");
      setDescuentoAplicado(null);
      return;
    }
    const totalHamburguesas = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    if (descuento.tipo === "hamburguesa_gratis" && totalHamburguesas < 4) {
      setErrorCodigo("Necesitás 4 hamburguesas para usar este código ❌");
      setDescuentoAplicado(null);
      return;
    }
    setDescuentoAplicado({ ...descuento, codigo });
    setErrorCodigo("");
  };

  const productos = [
    { id: 1, nombre: "GARDEL", precios: { Simple: 11000, Doble: 16000, Triple: 18000 }, imagen: "/gardel.menu.png", desc: "Pan de Papa, Medallón de carne, Huevo, Lechuga, Tomate, Queso dambo, Jamón, Mayonesa casera", ingredientes: { "Pan de Papa":true, "Medallón de Carne":true, huevo: true, lechuga: true, tomate: true, queso_dambo: true, jamon: true, mayo_casera: true,"Papas fritas":true } },
    { id: 2, nombre: "MCLOVIN", precios: { Simple: 12000, Doble: 16000, Triple: 20000 }, imagen: "/mclovin.menu.png", desc: "pan de Papa, medallón de carne, salsa barbacoa, cebolla caramelizada, panceta, queso cheddar", ingredientes: { "Pan de Papa":true, "Medallón de Carne":true, barbacoa: true, cebolla_caramelizada: true, panceta: true, cheddar: true,"Papas fritas":true } },
    { id: 3, nombre: "ELIXIR", precios: { Simple: 14000, Doble: 18000, Triple: 22000 }, imagen: "/elixir.menu.png", desc: "Pan de Papa, Medallón de carne, Salsa stacker, Cebolla crispy, Panceta, Cheddar", ingredientes: { "Pan de Papa":true, "Medallón de Carne":true, salsa_stacker: true, cebolla_crispy: true, panceta: true, cheddar: true, "Papas fritas":true } },
    { id: 4, nombre: "AZULINA", precios: { Simple: 11000, Doble: 17000, Triple: 18500 }, imagen:"/azulina.menu.png", desc: "Pan de Papa, Medallón de carne, Mayonesa de apio, Tomates asados, Roquefort, Nueces, Queso dambo", ingredientes: { "Pan de Papa":true, "Medallón de Carne":true, mayo_apio: true, tomates_asados: true, roquefort: true, nueces: true, queso_dambo: true,"Papas fritas":true } },
    { id: 5, nombre: "TROPI", precios: { Simple: 13000, Doble: 20000, Triple: 25000 }, imagen:"/tropi.menu.png", desc: "Pan de Papa, Medallón de carne, mayonesa, Cebolla Caramelizada, Ananá", ingredientes: {"Pan de Papa":true, "Medallón de Carne":true,"Cebolla Caramelizada": true, Ananá:true, Mayonesa: true, "Papas Fritas":true } },
    { id: 6, nombre: "QUEMONA", precios: { Simple: 12000, Doble: 16000, Triple: 20000 }, imagen:"/quemona.menu.png", desc: "Pan de Papa, Medallón de Carne, Mayonesa de Apio, Mermelada de Locoto con Ananá, Rúcula, Queso Roquefort, Queso Dambo", ingredientes: {"Pan de Papa":true, "Medallón de Carne":true, "Mayonesa de Apio":true, "Mermelada de Locoto con Ananá":true, "Rúcula":true, "Queso Roquefort":true, "Queso Dambo":true,"Papas fritas":true} },
  ];

  const abrirPersonalizacion = (p) => {
    setProductoEnEdicion(p);
    setTamano("Simple");
    setComentario("");
    setExtras({ ...p.ingredientes });
  };

  const confirmarAgregado = () => {
    const seleccionados = Object.keys(extras).filter(key => extras[key]).map(key => key.replace(/_/g, ' ')).sort().join(", ");
    const precioUnitario = productoEnEdicion.precios[tamano];
    const nombreFinal = `${productoEnEdicion.nombre} ${tamano}`;
    const index = carrito.findIndex(item => item.nombreFinal === nombreFinal && item.detalles === seleccionados && item.nota === comentario);
    if (index >= 0) {
      const nuevoCarrito = [...carrito];
      nuevoCarrito[index].cantidad += 1;
      setCarrito(nuevoCarrito);
    } else {
      setCarrito([...carrito, { ...productoEnEdicion, nombreFinal, precioFinal: precioUnitario, detalles: seleccionados, nota: comentario, cantidad: 1 }]);
    }
    setProductoEnEdicion(null);
  };

  const eliminarDelCarrito = (index) => {
    const nuevo = [...carrito];
    nuevo.splice(index, 1);
    setCarrito(nuevo);
    if (nuevo.length === 0) setVerCarrito(false);
  };

  const subtotal = carrito.reduce((sum, p) => sum + (p.precioFinal * p.cantidad), 0);
  const costoEnvioActual = (metodoEnvio === "Delivery" && barrio) ? (COSTOS_ENVIO[barrio] || 0) : 0;

  const calcularDescuento = () => {
    if (!descuentoAplicado) return 0;
    if (descuentoAplicado.tipo === "porcentaje") return Math.round(subtotal * descuentoAplicado.valor / 100);
    if (descuentoAplicado.tipo === "delivery_gratis") return costoEnvioActual;
    if (descuentoAplicado.tipo === "hamburguesa_gratis") {
      const precios = carrito.map(p => p.precioFinal);
      return Math.min(...precios);
    }
    return 0;
  };

  const montoDescuento = calcularDescuento();
  const totalActual = subtotal + costoEnvioActual - montoDescuento;

  const finalizarPedido = () => {
    if (metodoEnvio === "Delivery") {
      if (!barrio) { alert("Por favor, seleccioná tu barrio."); return; }
      if (!direccionDetalle.trim()) { alert("Por favor, ingresá tu calle y número."); return; }
    }
    setVerCarrito(false);
    setVerPago(true);
  };

const confirmarPago = async () => {
  if (!metodoPago) { alert("Por favor, seleccioná un método de pago."); return; }

  const textoProductos = carrito.map(p => `${p.cantidad}x ${p.nombreFinal} (${p.detalles}) ${p.nota ? `[Nota: ${p.nota}]` : ''} -> $${p.precioFinal * p.cantidad}`).join('\n');
  const mensaje = `*Nuevo Pedido*\n\n${textoProductos}\n\n--------------------------\n*Subtotal:* $${subtotal}\n*Método:* ${metodoEnvio}\n`
    + (metodoEnvio === "Delivery" ? `📍 *Dirección:* ${barrio} - ${direccionDetalle}\n*Envío:* $${costoEnvioActual}\n` : "")
    + (montoDescuento > 0 ? `🎟️ *Descuento (${descuentoAplicado.codigo}):* -$${montoDescuento}\n` : "")
    + `*Total a pagar: $${totalActual}*\n💳 *Método de pago:* ${metodoPago}`;

  if (metodoPago === "MP") {
    // Guardar mensaje en sessionStorage para usarlo después del pago
    sessionStorage.setItem('pedidoWhatsapp', mensaje);
    sessionStorage.setItem('pedidoTotal', totalActual);

    try {
      const response = await fetch('/api/pago', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          total: totalActual,
          descripcion: `Pedido Random Burguer - ${carrito.map(p => p.nombreFinal).join(', ')}`
        })
      });

      const text = await response.text();
      const data = JSON.parse(text);

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert("Error al generar el link de pago.");
        return;
      }
    } catch (error) {
      alert("Error al conectar con Mercado Pago: " + error.message);
      return;
    }
    return;
  }

  window.open(`https://wa.me/5493884850786?text=${encodeURIComponent(mensaje)}`);
  setVerPago(false);
  setMetodoPago("");
  setMostrarTransferencia(false);
};
  return (
    <div className="landing">
      <nav className="navbar">
        <div className="logo">
          <img src="/logo.png" alt="Logo" className="logo-img" />
          <span>RANDOM BURGUER</span>
        </div>
        <button className="hamburguesa-btn" onClick={() => setMenuAbierto(!menuAbierto)}>
          {menuAbierto ? '✕' : '☰'}
        </button>
        <div className={`links ${menuAbierto ? 'links-abierto' : ''}`}>
          <a href="#menu" onClick={() => setMenuAbierto(false)}>Menú</a>
          <a href="#contacto" onClick={() => setMenuAbierto(false)}>Contacto</a>
          <a href="#encontranos" onClick={() => setMenuAbierto(false)}>Encontranos</a>
          <a href="#Nosotros" onClick={() => setMenuAbierto(false)}>Equipo Random</a>
        </div>
      </nav>

      <section className="hero">
        <h1>!LAS MEJORES HAMBURGUESAS DE JUJUY¡</h1>
        <h2>RAND<img src="/logo.png" alt="O" class="logo-hero" />M</h2>
        
        <button className="btn-principal" onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}>
          Ver Menú
        </button>
        <a href="https://www.instagram.com/randomburger1/?__pwa=1"
          target="_blank"
          rel="noopener noreferrer"
          className="instagram-hero-esquina">
          <img src="/logo.instagram.png" alt="Instagram" />
          <span>randomburger1</span>
        </a>
        <img src="/estrella.amarila.png" alt="Decoración" className="estrella-hero" />
      </section>

      <main id="menu" className="menu-grid">
        {productos.map(p => (
          <div key={p.id} className="producto-card" onClick={() => abrirPersonalizacion(p)}>
            <p className="aviso-papas">¡TODAS INCLUYEN PAPAS FRITAS!</p>
            <img
              src={p.imagen || 'https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=500&auto=format&fit=crop'}
              alt={p.nombre}
              className="card-imagen"
            />
            <div className="card-info">
              <h3>{p.nombre}</h3>
              <p>{p.desc}</p>
              <p className="precio">${p.precios.Simple}</p>
              <button className="btn-card">Personalizar</button>
            </div>
          </div>
        ))}
      </main>

      <AnimatePresence>
        {productoEnEdicion && (
          <div className="modal-overlay">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="modal-content">
              {productoEnEdicion.imagen && (
                <div className="modal-imagen-burger" style={{backgroundImage: `url(${productoEnEdicion.imagen})`}}>
                  <h2>{productoEnEdicion.nombre}</h2>
                </div>
              )}
              <div className="seccion-modal">
                <h4>TAMAÑO:</h4>
                <div className="botones-tamano">
                  {["Simple", "Doble", "Triple"].map(opc => (
                    <button key={opc} className={tamano === opc ? "active" : ""} onClick={() => setTamano(opc)}>
                      {opc} (${productoEnEdicion.precios[opc]})
                    </button>
                  ))}
                </div>
              </div>
              <div className="lista-ingredientes">
                {Object.keys(extras).map((ing) => {
                  const esFijo = ing === "carne" || ing === "Pan de Papa" || ing === "Medallón de Carne";
                  return (
                    <label key={ing} className={`check-item ${esFijo ? 'item-fijo' : ''}`}>
                      <input
                        type="checkbox"
                        checked={extras[ing]}
                        disabled={esFijo}
                        onChange={() => { if (!esFijo) setExtras({...extras, [ing]: !extras[ing]}); }}
                      />
                      <span style={{textTransform: 'capitalize'}}>{ing.replace(/_/g, ' ')}</span>
                    </label>
                  );
                })}
              </div>
              <textarea placeholder="¿Alguna nota?" value={comentario} onChange={(e) => setComentario(e.target.value)} />
              <div className="modal-botones">
                <button className="btn-cancelar" onClick={() => setProductoEnEdicion(null)}>Cerrar</button>
                <button className="btn-confirmar" onClick={confirmarAgregado}>Agregar</button>
              </div>
              <div className="flecha-scroll">⬇</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {verCarrito && (
          <div className="modal-overlay">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="modal-content">
              <h2>Tu Pedido</h2>
              <div className="cart-items-list">
                {carrito.map((item, index) => (
                  <div key={index} className="cart-item-row">
                    <div>
                      <strong>{item.cantidad}x {item.nombreFinal}</strong>
                      <p style={{fontSize: '0.8rem', opacity: 0.8}}>{item.detalles}</p>
                    </div>
                    <div style={{textAlign: 'right'}}>
                      <span>${item.precioFinal * item.cantidad}</span>
                      <button onClick={() => eliminarDelCarrito(index)} className="btn-remove">❌</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="seccion-modal" style={{borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px'}}>
                <h4>¿Cómo recibes tu pedido?</h4>
                <div className="botones-tamano">
                  <button className={metodoEnvio === "Retiro" ? "active" : ""} onClick={() => { setMetodoEnvio("Retiro"); setBarrio(""); }}>🏃 Retiro</button>
                  <button className={metodoEnvio === "Delivery" ? "active" : ""} onClick={() => setMetodoEnvio("Delivery")}>🛵 Delivery</button>
                </div>
                {metodoEnvio === "Delivery" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                    <div className="seccion-ubicacion" style={{marginTop: '15px', textAlign: 'left'}}>
                      <p style={{margin:'5px', color:'var(--blanco)'}}>El costo de envío varía según el barrio:</p>
                      <select
                        value={barrio}
                        onChange={(e) => setBarrio(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', marginTop: '5px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid var(--amarillo-precio)' }}
                      >
                        <option value="" disabled>-- Elegí tu barrio --</option>
                        {Object.keys(COSTOS_ENVIO).map(b => (
                          <option key={b} value={b} style={{color: 'black'}}>{b} (${COSTOS_ENVIO[b]})</option>
                        ))}
                      </select>
                      <textarea
                        style={{ marginTop: '15px' }}
                        placeholder="Calle, número, departamento..."
                        value={direccionDetalle}
                        onChange={(e) => setDireccionDetalle(e.target.value)}
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="seccion-descuento">
                <h4>¿Tenés un código de descuento?</h4>
                <div className="input-codigo">
                  <input
                    type="text"
                    placeholder="Ingresá tu código"
                    value={codigoDescuento}
                    onChange={(e) => setCodigoDescuento(e.target.value)}
                    style={{textTransform: 'uppercase'}}
                  />
                  <button className="btn-confirmar" onClick={aplicarCodigo}>Aplicar</button>
                </div>
                {errorCodigo && <p className="codigo-error">{errorCodigo}</p>}
                {descuentoAplicado && <p className="codigo-exito">Código aplicado: {descuentoAplicado.codigo}</p>}
              </div>

              <div className="desglose-total">
                <p>Subtotal: ${subtotal}</p>
                {metodoEnvio === "Delivery" && barrio && (
                  <p>Envío ({barrio}): ${costoEnvioActual}</p>
                )}
                {montoDescuento > 0 && (
                  <p className="descuento-linea">Descuento ({descuentoAplicado.codigo}): -${montoDescuento}</p>
                )}
                <h3 className="total-cart">Total: ${totalActual}</h3>
              </div>

              <div className="modal-botones">
                <button className="btn-cancelar" onClick={() => setVerCarrito(false)}>Volver</button>
                <button className="btn-confirmar" onClick={finalizarPedido}>Realizar Pedido</button>
              </div>
              <div className="flecha-scroll">⬇</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
  {verPago && (
    <div className="modal-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="modal-content"
      >
        <h2>¿Cómo querés pagar?</h2>

        <div className="botones-tamano" style={{flexDirection: 'column', gap: '12px', marginTop: '20px'}}>
          
          <button
            className={metodoPago === "Efectivo" ? "active" : ""}
            onClick={() => { setMetodoPago("Efectivo"); setMostrarTransferencia(false); }}
            style={{padding: '15px', fontSize: '1rem'}}
          >
            💵 Efectivo
          </button>

          <button
            className={metodoPago === "Transferencia" ? "active" : ""}
            onClick={() => { setMetodoPago("Transferencia"); setMostrarTransferencia(true); }}
            style={{padding: '15px', fontSize: '1rem'}}
          >
            🏦 Transferencia
          </button>

          {mostrarTransferencia && (
          <motion.div
  initial={{ opacity: 0, height: 0 }}
  animate={{ opacity: 1, height: 'auto' }}
  className="info-transferencia"
>
  <p>📋 <strong>Alias:</strong> demiansoruco</p>
  <p>🏦 <strong>CBU:</strong> 1430001713015368140015</p>
  <p style={{ color: '#FFC107', marginTop: '10px', fontWeight: 'bold' }}>
    📎 No olvides adjuntar tu comprobante en el chat de WhatsApp.
  </p>
</motion.div>
          )}

          <button
            className={metodoPago === "MP" ? "active" : ""}
            onClick={() => { setMetodoPago("MP"); setMostrarTransferencia(false); }}
            style={{padding: '15px', fontSize: '1rem'}}
          >
            💳 Débito, Crédito, QR
          </button>

        </div>

        <div className="modal-botones">
          <button className="btn-cancelar" onClick={() => { setVerPago(false); setVerCarrito(true); }}>Volver</button>
          <button className="btn-confirmar" onClick={confirmarPago}>Confirmar</button>
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>

      {carrito.length > 0 && (
        <motion.div initial={{ x: 100 }} animate={{ x: 0 }} className="floating-cart" onClick={() => setVerCarrito(true)}>
          <h4>🛒 Ver pedido</h4>
          <p className="precio-amarillo">${totalActual}</p>
        </motion.div>
      )}

<section className="seccion-envios">
  <div className="envios-contenedor">
    <div className="envios-animacion">
      <img src="/burguer.delivery.png" alt="Delivery" className="moto-delivery" />
    </div>
    <div className="envios-texto">
      <h2>¡LLEVAMOS EL SABOR A TU PUERTA!</h2>
      <p>Disfrutá de nuestras hamburguesas donde quieras con nuestro servicio de delivery. Rápido, seguro y siempre delicioso.</p>
    </div>
  </div>
</section>

      <section className="encontranos" id="encontranos">
        <h2 className="titulo-seccion">Encontranos en...</h2>
        <div className="encontranos-contenedor">
          <div className="mapa-columna">
            <iframe title="Mapa" src="https://maps.google.com/maps?q=Benito%20Juarez%2078,%20San%20Salvador%20de%20Jujuy&t=&z=17&ie=UTF8&iwloc=&output=embed" width="100%" height="400" style={{ border: 0, borderRadius: '15px' }} allowFullScreen="" loading="lazy"></iframe>
          </div>
          <div className="info-columna">
            <div className="info-rectangulo">
              <h4>📍 Ubicación</h4>
              <p>Calle Benito Juárez 78</p>
              <p>San Salvador de Jujuy</p>
            </div>
            <div className="info-rectangulo">
              <h4>⏰ Horarios</h4>
              <p>Jueves a Domingo: 20:00 a 00:00 hs</p>
            </div>
          </div>
        </div>
      </section>

      <section className="seccion-equipo" id="Nosotros">
        <h2 className="titulo-seccion">Equipo Random</h2>
        <div className="equipo-grid">
          {[
            { nombre: "CHARLY", foto: "/pibes.jpeg", rol: "Co-fundador", desc: "Co-fundador y mano derecha de Random Burguer. El mayor del equipo y el más tranquilo — mientras todos corren, Charly ya resolvió el problema. Dicen que nunca lo vieron apurado. Nosotros tampoco." },
            { nombre: "Z", foto: "/z.jpeg", rol: "Fundador", desc: "El fundador. El que empezó todo esto con una idea, dos manos y muchas ganas. Z es el corazón de cada hamburguesa — literalmente, las arma él. Siempre con una sonrisa, incluso cuando el local está a full y el pedido no para." },
            { nombre: "PAPIUX", foto: "/papiux.png", rol: "Operaciones", desc: "Detrás de cada entrega a tiempo y cada caja bien armada, está Papiux. Registra los pedidos, coordina los deliverys, empaca con precisión y al final del día sabe exactamente cuánto entró y cuánto le toca a cada uno. El tipo más tranquilo del equipo... y el que más sabe." },
            { nombre: "CHELO", foto: "/chelo.jpeg", rol: "Cocinero", desc: "Detrás de cada hamburguesa jugosa hay una plancha caliente y un Chelo todavía más caliente. Cocinero, contador de historias y el más difícil de callar del equipo. Eso sí — mientras habla, no se le quema nada." },
          ].map((miembro, idx) => (
            <div key={idx} className="miembro-card" onClick={() => setMiembroSeleccionado(idx)}>
              <img src={miembro.foto} alt={miembro.nombre} className="miembro-foto"/>
              <div className="miembro-overlay"><span>Ver perfil</span></div>
              <h4>{miembro.nombre}</h4>
              <p>{miembro.rol}</p>
            </div>
          ))}
        </div>

        {miembroSeleccionado !== null && (() => {
          const equipo = [
            { nombre: "CHARLY", foto: "/pibes.jpeg", rol: "Co-fundador", desc: "Co-fundador y mano derecha de Random Burguer. El mayor del equipo y el más tranquilo — mientras todos corren, Charly ya resolvió el problema. Dicen que nunca lo vieron apurado. Nosotros tampoco." },
            { nombre: "Z", foto: "/z.jpeg", rol: "Fundador", desc: "El fundador. El que empezó todo esto con una idea, dos manos y muchas ganas. Z es el corazón de cada hamburguesa — literalmente, las arma él. Siempre con una sonrisa, incluso cuando el local está a full y el pedido no para." },
            { nombre: "PAPIUX", foto: "/papiux.png", rol: "Operaciones", desc: "Detrás de cada entrega a tiempo y cada caja bien armada, está Papiux. Registra los pedidos, coordina los deliverys, empaca con precisión y al final del día sabe exactamente cuánto entró y cuánto le toca a cada uno. El tipo más tranquilo del equipo... y el que más sabe." },
            { nombre: "CHELO", foto: "/chelo.jpeg", rol: "Cocinero", desc: "Detrás de cada hamburguesa jugosa hay una plancha caliente y un Chelo todavía más caliente. Cocinero, contador de historias y el más difícil de callar del equipo. Eso sí — mientras habla, no se le quema nada." },
          ];
          const miembro = equipo[miembroSeleccionado];
          const anterior = () => setMiembroSeleccionado((miembroSeleccionado - 1 + equipo.length) % equipo.length);
          const siguiente = () => setMiembroSeleccionado((miembroSeleccionado + 1) % equipo.length);
          return (
            <div className="modal-overlay" onClick={() => setMiembroSeleccionado(null)}>
              <motion.div className="modal-miembro" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} onClick={e => e.stopPropagation()}>
                <button className="flecha-modal flecha-izq" onClick={anterior}>&#8592;</button>
                <div className="modal-miembro-foto">
                  <img src={miembro.foto} alt={miembro.nombre}/>
                </div>
                <div className="modal-miembro-info">
                  <h3>{miembro.nombre}</h3>
                  <p className="modal-miembro-rol">{miembro.rol}</p>
                  <p className="modal-miembro-desc">{miembro.desc}</p>
                  <button className="btn-cancelar" onClick={() => setMiembroSeleccionado(null)}>Cerrar</button>
                </div>
                <button className="flecha-modal flecha-der" onClick={siguiente}>&#8594;</button>
              </motion.div>
            </div>
          );
        })()}

        <div className="equipo-mensaje">
          <img src="/burguer.feliz.png" alt="Burguer Feliz" className="burguer-equipo-img" />
          <div className="equipo-texto">
            <h3>Detrás de cada hamburguesa, está el equipo Random...</h3>
            <p>
              Detrás de todo hay un equipo que se toma en serio lo que hace.
              Se trabaja con ingredientes frescos, materiales de calidad y una dedicación
              que se nota en cada bocado. No improvisamos - cada detalle está pensado
              para que tu experiencia sea siempre la mejor.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer" id="contacto">
        <div className="footer-content">
          <div className="footer-section"><h4>📍 Ubicación</h4><p>Calle Benito Juárez 78</p></div>
          <div className="footer-section"><h4>⏰ Horarios</h4><p>Jueves a Domingo: 20:00 - 00:00</p></div>
          <div className="footer-section"><h4>📱 Contacto</h4><p><a href="https://www.instagram.com/randomburger1/?__pwa=1" target="_blank" rel="noopener noreferrer" className="link-red">
            <img src="/logo.instagram.png" alt="Instagram" className="icon-footer" />
            <span>randomburguer1</span></a></p></div>
          <div className="footer-section"><h4>📞 WhatsApp</h4><p><a href="https://wa.me/5493884850786" target="_blank" rel="noopener noreferrer" className="link-red">
            <img src="/logo.wpp.png" alt="WhatsApp" className="icon-footer" />
            <span>+54 9 3884 850786</span></a></p></div>
        </div>
        <div className="copyright"><p>© Random Burguer - Hecho con amor desde Jujuy</p></div>
      </footer>
    </div>
  );
}

export default App;