import { convertDate } from "@/helpers/miladi-to-shamsi";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";

const OrderDetail = ({ data }: { data: IResponseSingleOrder }) => {
  const order = data.data.order;
  return (
    <div>
      <section className="px-5 space-y-2">
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
      <section className="pt-6">
        <Table
          isStriped
          isHeaderSticky
          aria-label="order details"
          classNames={{ base: "max-h-[170px] overflow-y-auto" }}
        >
          <TableHeader>
            <TableColumn key="name">کالا</TableColumn>
            <TableColumn key="price">قیمت </TableColumn>
            <TableColumn key="count">تعداد</TableColumn>
          </TableHeader>
          <TableBody items={order.products}>
            {(item) => {
              const { product, ...rest } = item;
              const { name, price } = product;

              return (
                <TableRow key={item._id}>
                  {(columnKey) => (
                    <TableCell>
                      {getKeyValue(
                        { name,price, ...rest },
                        columnKey
                      )}
                    </TableCell>
                  )}
                </TableRow>
              );
            }}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default OrderDetail;
