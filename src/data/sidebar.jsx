import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";

const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Adicionar",
    icon: <BiImageAdd />,
    path: "/add-product",
  },
  {
    title: "Conta",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "Perfil",
        path: "/profile",
      },
      {
        title: "Editar",
        path: "/edit-profile",
      },
    ],
  },
  {
    title: "Feedback",
    icon: <FaCommentAlt />,
    path: "/contact-us",
  },
];

export default menu;