import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { detailsProduct } from '../actions/ProductActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import Rating from '../components/Rating'

export default function ProductScreen(props) {


  // const product = data.products.find(x => x._id === props.match.params.id)
  // const { id } = useParams();
  // const product = data.products.find(x => x._id === id)

  // const productId = props.match.params.id;
  const productId = useParams().id;
  console.log("productId ", productId);

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  // if (!product) {
  //   return <div>Product not found</div>
  // }

  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);


  const addToCartHandler = () => {
    // props.history.push(`/cart/${productId}?qty=${qty}`);
    navigate(`/cart/${productId}?qty=${qty}`);
  }

  return (
    <div>
      {
        loading ?
          (<LoadingBox ></LoadingBox>) :
          error ?
            (<MessageBox variant="danger">{error}</MessageBox>) :

            (<div>
              <Link to="/">Back to home</Link>
              <div className="row top">
                <div className="col-2">
                  <img
                    className="large"
                    src={product.image}
                    alt={product.name} />
                </div>
                <div className="col-1">
                  <ul>
                    <li>{product.name}</li>
                    <li>

                      <Rating
                        rating={product.rating}
                        numReviews={product.numReviews}
                      />
                    </li>
                    <li>
                      Price:
                      {product.price}
                    </li>
                    <li>
                      Description:
                      <p>{product.description}</p>
                    </li>

                  </ul>
                </div>
                <div className="col-1">
                  <div className="card card-body">
                    <ul>
                      <li>
                        <div className="row">
                          <div>Price</div>
                          <div className="price">${product.price}</div>
                        </div>
                      </li>

                      <li>
                        <div className="row">
                          <div>Status</div>
                          <div >
                            {product.countInStock > 0 ?
                              <span className="success">In Stock</span> :
                              <span className="danger">Unavailable</span>}
                          </div>
                        </div>
                      </li>
                      {
                        product.countInStock > 0 && (
                          <>
                            <li>
                              <div className="row">
                                <div>Quantity</div>
                                <div>
                                  <select value={qty} onChange={e => setQty(e.target.value)}>
                                    {
                                      [...Array(product.countInStock).keys()].map(
                                        (item) => (
                                          <option key={item + 1} value={item + 1}>{item + 1}</option>
                                        ))
                                    }
                                  </select>
                                </div>
                              </div>
                            </li>
                            <li>
                              <button
                                onClick={addToCartHandler}
                                className="primary block">
                                Add to Cart
                              </button>
                            </li>
                          </>
                        )
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </div>)
      }
    </div >

  )
}
