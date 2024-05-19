import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setFilter } from '../redux/ticketsSlice';

export const Filter: React.FC = () => {
    const dispatch = useDispatch();
    const filter = useSelector((state: RootState) => state.tickets.filter);

    return (
        <div className="filter-options">
            <p className="filter-title">КІЛЬКІСТЬ ПЕРЕСАДОК</p>
            <div className="filter-option">
                <input
                    type="checkbox"
                    value="all"
                    checked={filter.includes('all')}
                    onChange={() => dispatch(setFilter('all'))}
                />
                <label>
                    Всі
                </label>
            </div>
            <div className="filter-option">
                <input
                    type="checkbox"
                    value="no-layovers"
                    checked={filter.includes('no-layovers')}
                    onChange={() => dispatch(setFilter('no-layovers'))}
                />
                <label>
                    Без пересадок
                </label>
            </div>
            <div className="filter-option">
                <input
                    type="checkbox"
                    value="one-layover"
                    checked={filter.includes('one-layover')}
                    onChange={() => dispatch(setFilter('one-layover'))}
                />
                <label>
                    1 пересадка
                </label>
            </div>
            <div className="filter-option">
                <input
                    type="checkbox"
                    value="two-layovers"
                    checked={filter.includes('two-layovers')}
                    onChange={() => dispatch(setFilter('two-layovers'))}
                />
                <label>
                    2 пересадки
                </label>
            </div>
            <div className="filter-option">
                <input
                    type="checkbox"
                    value="three-layovers"
                    checked={filter.includes('three-layovers')}
                    onChange={() => dispatch(setFilter('three-layovers'))}
                />
                <label>
                    3 пересадки
                </label>
            </div>
        </div>
    );
}
