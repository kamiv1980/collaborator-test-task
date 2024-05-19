import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchTickets, setSort, loadMoreTickets } from '../redux/ticketsSlice';
import { Card } from './Card';


export const TicketList: React.FC = () => {
    const dispatch = useDispatch();
    const { tickets, filter, sort, visibleTickets, status, error, allTicketsLoaded } = useSelector((state: RootState) => state.tickets);

    useEffect(() => {
        dispatch(fetchTickets());
    }, [dispatch]);

    const filteredTickets = tickets.filter(ticket => {
        if (filter.includes('all')) return true;
        if (filter.includes('no-layovers') && ticket.departureRoute.layovers.length === 0) return true;
        if (filter.includes('one-layover') && ticket.departureRoute.layovers.length === 1) return true;
        if (filter.includes('two-layovers') && ticket.departureRoute.layovers.length === 2) return true;
        if (filter.includes('three-layovers') && ticket.departureRoute.layovers.length === 3) return true;
        return false;
    });

    const sortedTickets = filteredTickets.sort((a, b) => {
        switch (sort) {
            case 'cheapest':
                return a.price - b.price;
            case 'fastest':
                const aDuration = calculateDuration(a.departureRoute.duration) + calculateDuration(a.returnRoute.duration);
                const bDuration = calculateDuration(b.departureRoute.duration) + calculateDuration(b.returnRoute.duration);
                return aDuration - bDuration;
            case 'optimal':
                const aTotalDuration = calculateDuration(a.departureRoute.duration) + calculateDuration(a.returnRoute.duration);
                const bTotalDuration = calculateDuration(b.departureRoute.duration) + calculateDuration(b.returnRoute.duration);
                if (aTotalDuration !== bTotalDuration) {
                    return aTotalDuration - bTotalDuration;
                } else if (a.departureRoute.layovers.length !== b.departureRoute.layovers.length) {
                    return a.departureRoute.layovers.length - b.departureRoute.layovers.length;
                } else {
                    return a.price - b.price;
                }
            default:
                return 0;
        }
    });

    const handleSortChange = (sort: string) => {
        dispatch(setSort(sort));
    };

    return (
        <div className="ticket-list">
            <div className="sort-options">
                <button
                    className={`sort-button left-border ${sort === 'cheapest' ? 'active' : ''}`}
                    onClick={() => handleSortChange('cheapest')}
                >
                    НАЙДЕШЕВШИЙ
                </button>
                <button
                    className={`sort-button ${sort === 'fastest' ? 'active' : ''}`}
                    onClick={() => handleSortChange('fastest')}
                >
                    НАЙШВИДШИЙ
                </button>
                <button
                    className={`sort-button right-border ${sort === 'optimal' ? 'active' : ''}`}
                    onClick={() => handleSortChange('optimal')}
                >
                    ОПТИМАЛЬНИЙ
                </button>
            </div>
            {status === 'loading' && <p>Завантаження...</p>}
            {status === 'failed' && <p>{error}</p>}
            {status === 'succeeded' && sortedTickets.slice(0, visibleTickets).map(ticket => (
                <Card key={ticket.id} {...ticket} />
            ))}
            <button
                className='more-button'
                disabled={allTicketsLoaded}
                onClick={() => dispatch(loadMoreTickets())}
            >
                ЗАВАНТАЖИТИ ЩЕ 5 КВИТКІВ
            </button>
        </div>
    );
}

const calculateDuration = (duration: string): number => {
    const [hours, minutes] = duration.split('h ').map((part, index) => index === 0 ? parseInt(part) : parseInt(part.replace('m', '')));
    return hours * 60 + minutes;
}
