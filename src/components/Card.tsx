import React from "react";
import {StaticImage} from "gatsby-plugin-image";

type Route = {
    path: string;
    layovers: string[];
    departureTime: string;
    arrivalTime: string;
    duration: string;
};

type CardProps = {
    price?: number;
    departureRoute?: Route;
    returnRoute?: Route;
};

export const Card: React.FC<CardProps> = ({price = 13300, departureRoute = {
    path: "LHR – DXB",
    layovers: ["HKG"],
    departureTime: "10:45",
    arrivalTime: "08:00",
    duration: "34h 15m"
}, returnRoute = {
    path: "DXB – LHR",
    layovers: ["HKG"],
    departureTime: "11:20",
    arrivalTime: "00:50",
    duration: "16h 30m"
}
}) => {

    return (
        <div className='flex card'>
            <div className='flex card-header'>
                <div className='price'>
                    <span>{price}</span>
                    <span> $</span>
                </div>
                <StaticImage
                    class='logo'
                    alt="Logo"
                    src='../images/A4E-logo.png'
                />
            </div>

            <div className='card-content'>
                <div className='flex route'>
                    <div className='route-description'>
                        <p className='title'>
                            {departureRoute.path}
                        </p>
                        <p className='info'>
                            {`${departureRoute.departureTime} - ${departureRoute.arrivalTime}`}
                        </p>
                    </div>
                    <div className='route-description'>
                        <p className='title'>
                            В ДОРОЗІ
                        </p>
                        <p className='info'>
                            {departureRoute.duration}
                        </p>
                    </div>
                    <div className='route-description'>
                        <p className='title'>
                            {!departureRoute.layovers.length ? 'БЕЗ ПЕРЕСАДОК' :
                                departureRoute.layovers.length === 1 ? '1 ПЕРЕСАДКА'
                                    : `${departureRoute.layovers.length} ПЕРЕСАДКИ`}
                        </p>
                        {!!departureRoute.layovers.length &&
                            <p className='info'>
                                {departureRoute.layovers.join(', ')}
                            </p>
                        }
                    </div>
                </div>
                <div className='flex route'>
                    <div className='route-description'>
                        <p className='title'>
                            {returnRoute.path}
                        </p>
                        <p className='info'>
                            {`${returnRoute.departureTime} - ${returnRoute.arrivalTime}`}
                        </p>
                    </div>
                    <div className='route-description'>
                        <p className='title'>
                            В ДОРОЗІ
                        </p>
                        <p className='info'>
                            {returnRoute.duration}
                        </p>
                    </div>
                    <div className='route-description'>
                        <p className='title'>
                            {!returnRoute.layovers.length ? 'БЕЗ ПЕРЕСАДОК' :
                                returnRoute.layovers.length === 1 ? '1 ПЕРЕСАДКА'
                                    : `${returnRoute.layovers.length} ПЕРЕСАДКИ`}
                        </p>
                        {!!returnRoute.layovers.length &&
                            <p className='info'>
                                {returnRoute.layovers.join(', ')}
                            </p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
