import { useDispatch, useSelector } from 'react-redux'
import { useRedirectLoggedOutUser } from '../../../customHook/useRedirectLoggedOutUser'
import './ProductDetails.scss'
import { useParams } from 'react-router-dom';
import { selectIsLoggedIn } from '../../../redux/features/auth/authSlice';
import { useEffect } from 'react';
import { getProduct } from '../../../redux/features/product/productSlice';
import Card from '../../card/Card';


const ProductDetails = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedin = useSelector(selectIsLoggedIn)
  const { product, isLoading, isError, message} = useSelector((state) => state.product)

  useEffect(() => {
    if (isLoggedin === true) {
      dispatch(getProduct())
      console.log(product);
    }


    if(isError) {
      console.log(message);
    }
  }, [dispatch, isLoggedin, isError, message, product])

  return (
    <div className='product-detail'>
      <h3 className='--mt'> Detalhes do Produto </h3>
      <Card cardClass={"card"}></Card>
    </div>
  )
}

export default ProductDetails