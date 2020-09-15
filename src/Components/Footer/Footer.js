import React from 'react';

class Footer extends React.Component {

    render() {
        return (
            <div className="container-fluid" style={{ background: "linear-gradient(90deg, #36D1DC 0%, #5E83E5 100%)", padding:50}}>
                <div className="row">
                    <div className="col text-center text-white">
                        <h4 style={{fontFamily: "Kaushan Script"}}>INFORMACIÓN</h4>
                        <p>Aviso legal y privacidad</p>
                        <p>Términos y condiciones</p>
                        <p>Política de cookies</p>
                        <p>Contrato viaje combinado</p>
                    </div>
                    <div className="col text-center text-white">
                        <h4 style={{fontFamily: "Kaushan Script"}}>SUCURSALES</h4>
                        <p>Tegucigalpa:</p>
                        <p>- Lobby Hotel Clarion Tegucigalpa</p>
                        <p>- Multiplaza Tegucigalpa</p>
                        <p>Comayagua:</p>
                        <p>- Mall Premier Comayagua</p>
                        <p>Danli:</p>
                        <p>- Uniplaza Danli</p>
                    </div>
                    <div className="col text-center text-white">
                        <h4 style={{fontFamily: "Kaushan Script"}}>CONTÁCTANOS</h4>
                        <p>•	Reservaciones</p>
                        <a href="mailto:reservaciones@miatravel.com" style={{color:"#FFFFFF"}}>reservaciones@miatravel.com</a>
                        <p>•	Grupos</p>
                        <a href="mailto:grupos@miatravel.com" style={{color:"#FFFFFF"}}>grupos@miatravel.com</a>
                        <p>•	Mercadeo</p>
                        <a href="mailto:mercadeo@miatravel.com" style={{color:"#FFFFFF"}}>mercadeo@miatravel.com</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer