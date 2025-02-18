import { Provider, useSelector } from "react-redux";
import BarcodeInput from "../components/BillingManagement/BarcodeInput";
import Cart from "../components/BillingManagement/Cart";
import PaymentSummary from "../components/BillingManagement/PaymentSummary";
import { store } from '../redux/store';

const BillingManagement = () => {
  return (
    <Provider store={store}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Billing Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <BarcodeInput />
            <Cart />
          </div>
          <div>
            <PaymentSummary />
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default BillingManagement;
