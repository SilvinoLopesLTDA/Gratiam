import PropTypes from "prop-types";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import styles from "./Export.module.scss";

const Export = ({ products }) => {
  const exportData = products.map((product) => ({
    Nome: product.name,
    Categoria: product.category,
    Cor: product.colors.join(", "),
    Custo: `R$${product.cost.toFixed(2)}`,
    Preço: `R$${product.price.toFixed(2)}`,
    Quantidade: product.quantity,
    Valor: `R$${(product.price * product.quantity).toFixed(2)}`,
  }));

  const headers = [
    "Nome",
    "Categoria",
    "Cor",
    "Custo",
    "Preço",
    "Quantidade",
    "Valor",
  ];

  const exportToCSV = () => {
    const csvData = [headers, ...exportData.map(Object.values)];
    const csvContent = csvData
      .map((row) =>
        row
          .map((cell) => {
            if (typeof cell === "string" && cell.includes(",")) {
              return `"${cell}"`;
            }
            return cell;
          })
          .join(",")
      )
      .join("\n");
    const csvContentWithBOM = "\uFEFF" + csvContent;
    const blob = new Blob([csvContentWithBOM], {
      type: "text/csv;charset=utf-8",
    });
    saveAs(blob, "produtos.csv");
  };

  const exportToXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(exportData, {
      header: headers,
    });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Produtos");
    const xlsxBuffer = XLSX.write(workbook, {
      type: "array",
      bookType: "xlsx",
    });
    const blob = new Blob([xlsxBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "produtos.xlsx");
  };

  return (
    <div className={styles.export}>
      <button onClick={exportToCSV} className="--btn --btn-primary">
        Exportar para CSV
      </button>
      <button onClick={exportToXLSX} className="--btn --btn-primary">
        Exportar para XLSX
      </button>
    </div>
  );
};

Export.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
};

export default Export;
