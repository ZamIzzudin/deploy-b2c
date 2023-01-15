/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/button-has-type */
import { useAppSelector } from '../../hooks';

import UserOrder from '../dashboard/user/User-Order';
import BoosterOrder from '../dashboard/booster/Booster-Order';
import AdminOrder from '../dashboard/admin/Admin-Order';

function DetailOrder() {
    const { orderList, auth } = useAppSelector((states) => states);

    return (
        <div>
            {auth?.role[0] === 'user' && (
                <UserOrder orders={orderList} />
            )}
            {auth?.role[0] === 'booster' && (
                <BoosterOrder orders={orderList} />
            )}
            {auth?.role[0] === 'admin' && (
                <AdminOrder orders={orderList} />
            )}
        </div>
    );
}

export default DetailOrder;
