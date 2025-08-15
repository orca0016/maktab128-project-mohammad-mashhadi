import { convertDate } from "@/helpers/miladi-to-shamsi";

const OrderDetail = ({ data }: { data: IResponseSingleOrder }) => {
  const order = data.data.order;
  return (
    <div>
      <section className="px-5 space-y-4">
        <div className="space-x-4">
          <span>نام مشتری:</span>
          <span>
            {order.user.firstname} {order.user.lastname}
          </span>
        </div>
        <div className="space-x-4">
          <span>آدرس:</span>
          <span>{order.user.address}</span>
        </div>
        <div className="space-x-4">
          <span>تلفن:</span>
          <span>{order.user.phoneNumber}</span>
        </div>
        <div className="space-x-4">
          <span>زمان سفارش:</span>
          <span>{convertDate(order.createdAt).jalaliDate}</span>
        </div>
        <div className="space-x-4">
          <span>زمان تحویل:</span>
          <span>{convertDate(order.deliveryDate).jalaliDate}</span>
        </div>
      </section>
      <section>
        <table className="w-full mt-6">
          <thead>
            <tr className="dark:bg-custom-purple dark:text-white text-title-text-light bg-slate-100  ">
              <th className="py-1">کالا</th>
              <th className="py-1">قیمت</th>
              <th className="py-1">تعداد</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((item) => (
              <tr key={item._id} className="odd:bg-gray-400/50 even:bg-gray-100/50 ">
                <td className="py-2 px-3">{item.product.name}</td>
                <td className="py-2 px-3">{item.product.quantity * item.count}</td>
                <td className="py-2 px-3">{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default OrderDetail;
