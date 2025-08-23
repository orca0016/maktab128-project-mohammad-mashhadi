import { convertDate } from "@/helpers/miladi-to-shamsi";
import { separateNumbers } from "@/lib/seperator-numbers";
import {
  Button,
  Chip,
} from "@heroui/react";
import { User } from "@heroui/user";
import { SetStateAction, useCallback } from "react";
import { SlOptionsVertical } from "react-icons/sl";

export const useOrderCellTable = ({
  userListReCords,
  onOpenOrderDetail,
  setCurrentOrder,
}: {
  userListReCords: {
    [key: string]: IUserData;
  };

  onOpenOrderDetail: () => void;
  setCurrentOrder: (value: SetStateAction<string | null>) => void;
}) =>
  useCallback(
    (order: IOrder, columnKey: React.Key) => {
      const cellValue = order[columnKey as keyof IOrder];

      switch (columnKey) {
        case "user": {
          return (
            <User
              avatarProps={{
                src: "https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/avatar/avatar-2.webp",
              }}
              description={`${
                userListReCords[order.user]?.firstname ?? "-"
              } _ ${userListReCords[order.user]?.lastname ?? "-"}`}
              name={userListReCords[order.user]?.username ?? "-"}
            />
          );
        }
        case "status": {
          return (
            <div>
              {order.deliveryStatus ? (
                <Chip color="success" variant="shadow">
                  تحویل شده
                </Chip>
              ) : (
                <Chip color="warning" variant="shadow">
                  درحال ارسال
                </Chip>
              )}
            </div>
          );
        }
        case "action":
          return (
            <Button
              className="rounded-full"
              isIconOnly
              onPress={() => {
                onOpenOrderDetail();
                setCurrentOrder(order._id);
              }}
              variant="light"
            >
              <SlOptionsVertical />
            </Button>
          );
        case "deliveryDate": {
          return <div>{convertDate(order.deliveryDate).jalaliDate}</div>;
        }
        case "totalPrice": {
          return <div>{separateNumbers(order.totalPrice)}</div>;
        }

        default:
          if (
            typeof cellValue === "string" ||
            typeof cellValue === "number" ||
            typeof cellValue === "boolean" ||
            cellValue === null ||
            cellValue === undefined
          ) {
            return cellValue;
          }
          return <span>{JSON.stringify(cellValue)}</span>;
      }
    },
    [userListReCords, onOpenOrderDetail, setCurrentOrder]
  );
