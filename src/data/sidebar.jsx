import { BsPersonCircle, BsPersonFillAdd } from "react-icons/bs";
import { TbDatabase } from "react-icons/tb";
import { MdOutlineMail, MdOutlinePayments, MdPayment } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr"

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
        icon: <MdPayment />,
        path: "/payments"
      },
      {
        title: "Transações",
        icon: <GrTransaction />,
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
