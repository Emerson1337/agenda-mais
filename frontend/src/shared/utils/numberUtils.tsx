export namespace numberUtils {
  export const convertToMonetaryBRL = (value: number): string => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };
}
