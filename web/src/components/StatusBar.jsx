import React, { useState, useEffect } from "react";

import "../style/StatusBar.css";

const StatusBar = () =>{ 
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const day = date.getDate();

    let month = date.getMonth();
    switch (month) {
        case 0:
            month = "Janeiro";
            break;
        case 1:
            month = "Fevereiro";
            break;
        case 2:
            month = "Março";
            break;
        case 3:
            month = "Abril";
            break;
        case 4:
            month = "Maio";
            break;
        case 5:
            month = "Junho";
            break;
        case 6:
            month = "Julho";
            break;
        case 7:
            month = "Agosto";
            break;
        case 8:
            month = "Setembro";
            break;
        case 9:
            month = "Outubro";
            break;
        case 10:
            month = "Novembro";
            break;
        default:
            month = "Dezembro";
            break;
    }
    const year = date.getFullYear();
    const time = ('0'+date.getHours()).slice(-2) + ":" + ('0'+date.getMinutes()).slice(-2);

    return (
        <div className="StatusBar">
            <span>
                Paranavaí, {day} de {month} de {year} | {time}
            </span>
        </div>
    );
};

export default StatusBar;