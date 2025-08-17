import { useCallback } from "react";
import { NumericFormat } from "react-number-format";
export const useEntitiesCellTable = ({
  selectedKeys,
  onChangeValue,
}: {
  selectedKeys: Record<string, Partial<IProduct>>;
  onChangeValue: ({
    productId,
    method,
    value,
  }: {
    productId: string;
    method: "price" | "quantity";
    value: string;
  }) => void;
}) =>
  useCallback(
    (product: IProduct, columnKey: React.Key) => {
      const cellValue = product[columnKey as keyof IProduct];

      switch (columnKey) {
        case "price": {
          return (
            <NumericFormat
              value={selectedKeys[product._id]?.price}
              defaultValue={selectedKeys[product._id]?.price || product.price}
              thousandSeparator=","
              onValueChange={(values) => {
                onChangeValue({
                  productId: product._id,
                  value: values.value,
                  method: "price",
                });
              }}
            />
          );
        }
        case "quantity": {
          return (
           <NumericFormat
              value={selectedKeys[product._id]?.quantity}
              defaultValue={selectedKeys[product._id]?.quantity || product.quantity}
              thousandSeparator=","
              onValueChange={(values) => {
                onChangeValue({
                  productId: product._id,
                  value: values.value,
                  method: "quantity",
                });
              }}
            />
          );
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

    [selectedKeys, onChangeValue]
  );
