import PropTypes from "prop-types";
import "./ClientList.scss";
import { SpinnerImg } from "../../loader/Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { useEffect, useState } from "react";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_CLIENTS,
  selectFilteredClients,
} from "../../../redux/features/client/filterClientSlice";
import {
  deleteClient,
  getClients,
} from "../../../redux/features/client/clientSlice";
import ReactPaginate from "react-paginate";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const ClientList = ({ client, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredClient = useSelector(selectFilteredClients);
  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delClient = async (id) => {
    await dispatch(deleteClient(id));
    await dispatch(getClients());
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Deseja excluir permanentemente esse cliente?",
      icon: "warning",
      width: "50em",
      showCancelButton: true,
      confirmButtonColor: "#EF233C",
      cancelButtonColor: "#2B2D42",
      confirmButtonText: "Sim, Excluir",
      cancelButtonText: "Não, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        delClient(id);
        Swal.fire({
          icon: "success",
          title: "Cliente Excluido",
          text: "O Cliente foi deletado com sucesso!",
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "info",
          title: "Ação Cancelada",
          text: "Não se preocupe, seu cliente está securo :)",
        });
      }
    });
  };

  // Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredClient.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredClient.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredClient]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredClient.length;
    setItemOffset(newOffset);
  };
  //End Pagination

  useEffect(() => {
    dispatch(FILTER_CLIENTS({ client, search }));
  }, [client, search, dispatch]);

  return (
    <div className="product-list">
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3> Clientes Cadastrados </h3>
          </span>
          <span>
            <Link to="/add-client">
              <button className="--btn --btn-primary">Cadastrar Cliente</button>
            </Link>
          </span>
          <span>
            <Search value={search} onChange={setSearch} />
          </span>
        </div>
        {isLoading && <SpinnerImg />}
        <div className="table">
          {!isLoading && client.length === 0 ? (
            <p>-- Nenhum Produto Cadastrado. Por favor, adicione um produto</p>
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <th> s/n </th>
                    <th> Nome </th>
                    <th> Email </th>
                    <th> Telefone </th>
                    <th> É Sócio? </th>
                    <th> Ações </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((client, index) => {
                    const { _id, name, email, phone, isMember } = client;
                    return (
                      <tr key={_id}>
                        <td>{index + 1}</td>
                        <td>{shortenText(name)}</td>
                        <td>{email}</td>
                        <td>{phone}</td>
                        <td>{isMember ? "Sim" : "Não"}</td>
                        <td className="icons">
                          <span>
                            <Link to={`/client-details/${_id}`}>
                              <AiOutlineEye
                                size={25}
                                color="purple"
                                title="Detalhes"
                              />
                            </Link>
                            <Link to={`/edit-client/${_id}`}>
                              <FaEdit size={20} color="green" title="Editar" />
                            </Link>
                            <FaTrashAlt
                              size={20}
                              color="red"
                              onClick={() => confirmDelete(_id)}
                              title="Deletar"
                            />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Próximo >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={10}
          pageCount={pageCount}
          previousLabel="< Voltar"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

ClientList.propTypes = {
  client: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isLoading: PropTypes.bool,
};

export default ClientList;
