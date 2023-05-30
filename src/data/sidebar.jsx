import { BsPersonCircle } from "react-icons/bs";
import { TbDatabase } from "react-icons/tb";
import { MdOutlineMail, MdOutlinePayments } from "react-icons/md";
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
  // {
  //   title: "Caixa",
  //   icon: <MdOutlineAttachMoney />,
  //   path: "/sales",
  // },
  {
    title: "Pagamentos",
    icon: <MdOutlinePayments />,
    path: "/payments",
  },
  // {
  //   title: "Importar",
  //   icon: <CiImport />,
  //   path: "/import"
  // },
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

//   childrens: [
// {
//   title: "Venda",
//   path: "/profile",
// },
// {
//   title: "Produto",
//   path: "/edit-profile",
// },
// ],

export default menu;
