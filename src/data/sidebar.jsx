import { BsPersonCircle, BsPersonFillAdd } from "react-icons/bs";
import { TbDatabase } from "react-icons/tb";
import { MdOutlineMail, MdOutlinePayments } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
// import { CiImport } from "react-icons/ci"

const menu = [
  // {
  //   title: "Dashboard",
  //   icon: <FaTh />,
  //   path: "/dashboard",
  // },
  {
    title: "Estoque",
    icon: <TbDatabase />,
    path: "/storage",
  },
  {
    title: "Pagamentos",
    icon: <MdOutlinePayments />,
    childrens: [
      {
        title: "Pagamentos",
        path: "/payments"
      },
      {
        title: "Transações",
        path: "/transactions"
      }
    ]
  },
  // {
  //   title: "Importar",
  //   icon: <CiImport />,
  //   path: "/import"
  // },
  {
    title: "Carrinho",
    icon: <AiOutlineShoppingCart />,
    path: "/cart",
  },
  {
    title: "Clientes",
    icon: <BsPersonFillAdd />,
    path: "/clients"
  },
  {
    title: "Conta",
    icon: <BsPersonCircle />,
    path: "/profile",
  },
  {
    title: "Suporte",
    icon: <MdOutlineMail />,
    path: "/contact-us",
  },
];

export default menu;
