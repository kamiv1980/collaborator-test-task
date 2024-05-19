import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import ticketsData from '../mock-data/tickets.json';

interface Ticket {
    id: number;
    price: number;
    departureRoute: {
        path: string;
        layovers: string[];
        departureTime: string;
        arrivalTime: string;
        duration: string;
    };
    returnRoute: {
        path: string;
        layovers: string[];
        departureTime: string;
        arrivalTime: string;
        duration: string;
    };
}

interface TicketsState {
    tickets: Ticket[];
    filter: string[];
    sort: string;
    visibleTickets: number;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    allTicketsLoaded: boolean;
}

const initialState: TicketsState = {
    tickets: [],
    filter: ['all'],
    sort: 'cheapest',
    visibleTickets: 5,
    status: 'idle',
    error: null,
    allTicketsLoaded: false,
};

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async () => {
    return ticketsData as Ticket[];
});

const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<string>) => {
            if (action.payload === 'all') {
                state.filter = ['all'];
            } else {
                if (state.filter.includes('all')) {
                    state.filter = state.filter.filter(f => f !== 'all');
                }
                if (state.filter.includes(action.payload)) {
                    state.filter = state.filter.filter(f => f !== action.payload);
                } else {
                    state.filter.push(action.payload);
                }
                if (state.filter.length === 0) {
                    state.filter = ['all'];
                }
            }
        },
        setSort(state, action: PayloadAction<string>) {
            state.sort = action.payload;
        },
        loadMoreTickets: (state) => {
            state.visibleTickets += 5;
            if (state.visibleTickets >= state.tickets.length) {
                state.allTicketsLoaded = true;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTickets.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTickets.fulfilled, (state, action: PayloadAction<Ticket[]>) => {
                state.status = 'succeeded';
                state.tickets = action.payload;
            })
            .addCase(fetchTickets.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch tickets';
            });
    },
});

export const { setFilter, setSort, loadMoreTickets } = ticketsSlice.actions;

export default ticketsSlice.reducer;
