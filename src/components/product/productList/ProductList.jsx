import './ProductList.scss'
import { SpinnerImg } from '../../loader/Loader'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import{ AiOutlineEye } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import Search from '../../search/Search'
import { useDispatch, useSelector } from 'react-redux'
import { FILTER_PRODUCTS, selectFilteredProducts } from '../../../redux/features/product/filterSlice'
import ReactPaginate from 'react-paginate'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { deleteProduct, getProducts } from '../../../redux/features/product/productSlice'
import { Link } from 'react-router-dom'

const ProductList = ({ product, isLoading}) => {
    const [search, setSearch] = useState("")
    const filteredProduct = useSelector(selectFilteredProducts)
    const dispatch = useDispatch()

    const shortenText = (text, n) => {  
        if (text.length > n ) {
            const shortenedText = text.substring(0, n).concat("...")
            return shortenedText
        }
        return text
    }

    const delProduct = async (id) => {
        await dispatch(deleteProduct(id))
        await dispatch(getProducts())
    }

    const confirmDelete = (id) => {
        confirmAlert({
            title: 'Excluir  Item do Estoque ',
            message: 'Tem certeza que deseja excluir permanentemente esse item do estoque ?',
            buttons: [
              {
                label: 'Excluir',
                onClick: () => delProduct(id)
              },
              {
                label: 'Cancelar',
                // onClick: () => alert('Click No')
              }
            ]
          });
    }

    // Begin Pagination
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;
  
    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
  
      setCurrentItems(filteredProduct.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(filteredProduct.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, filteredProduct]);
  
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % filteredProduct.length;
      setItemOffset(newOffset);
    };
    //End Pagination

    useEffect(() => {
        dispatch(FILTER_PRODUCTS({product, search}))
    }, [product, search, dispatch])

  return (
    <div className="product-list">
        <hr />
        <div className="table">
            <div className="--flex-between --flex-dir-column">
                <span>
                    <h3> Produtos em Estoque </h3>
                </span>
                <span>
                    <Search value={search} onChange={(e) => setSearch(e.target.value)}/>
                </span>
            </div>
            { isLoading && <SpinnerImg />}
            <div className="table">
                {!isLoading && product.length === 0 ? (
                    <p>-- Nenhum Produto Cadastrado, Por favor adcione um produto</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th> s/n </th>
                                <th> Nome</th>
                                <th> Categoria</th>
                                <th> Preço </th>
                                <th> Quantidade </th>
                                <th> Valor </th>
                                <th> Ações </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentItems.map((product, index) => {
                                    const {_id, name, category, price, quantity} = product
                                    return (
                                        <tr key={_id}>
                                            <td>{index + 1}</td>
                                            <td>{shortenText(name)}</td>
                                            <td>{category}</td>
                                            <td>{"R$"}{price}</td>
                                            <td>{quantity}</td>
                                            <td>{"R$"}{price * quantity}</td>
                                            <td className='icons'>
                                                <span>
                                                    <Link to={`/product-details/${_id}`}>
                                                        <AiOutlineEye size={25} color="purple"/>
                                                    </Link>
                                                    <Link to={`/edit-product/${_id}`}>
                                                        <FaEdit size={20} color="green"/>
                                                    </Link>
                                                    <FaTrashAlt size={20} color="red" onClick={() => confirmDelete(_id)}/>
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                )}
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="Proximo >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< Voltar"
                renderOnZeroPageCount={null}
                containerClassName='pagination'
                pageLinkClassName='page-num'
                previousLinkClassName='page-num'
                nextLinkClassName='page-num'
                activeLinkClassName='activePage'
            />
        </div>
    </div>
  )
}

export default ProductList