// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project imports
import snackbarReducer from './slices/template/snackbar';
import customerReducer from './slices/template/customer';
import contactReducer from './slices/template/contact';
import productReducer from './slices/template/product';
import chatReducer from './slices/template/chat';
import calendarReducer from './slices/template/calendar';
import mailReducer from './slices/template/mail';
import userReducer from './slices/template/user';
import cartReducer from './slices/template/cart';
import kanbanReducer from './slices/template/kanban';
import menuReducer from './slices/template/menu';
import centreKechoReducer from './slices/centre';
import classKechoReducer from './slices/class';
import staffKechoReducer from './slices/staff';
import userKechoReducer from './slices/user';

// ==============================|| COMBINE REDUCER ||============================== //
const reducerTemplate = {
    snackbar: snackbarReducer,
    cart: persistReducer(
        {
            key: 'cart',
            storage,
            keyPrefix: 'berry-'
        },
        cartReducer
    ),
    kanban: kanbanReducer,
    customer: customerReducer,
    contact: contactReducer,
    product: productReducer,
    chat: chatReducer,
    calendar: calendarReducer,
    mail: mailReducer,
    user: userReducer,
    menu: menuReducer
};
const reducer = combineReducers({
    ...reducerTemplate,
    centreKecho: centreKechoReducer,
    classKecho: classKechoReducer,
    staffKecho: staffKechoReducer,
    userKecho: userKechoReducer
});

export default reducer;
