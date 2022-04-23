import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/ProductActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";

export default function HomeScreen() {

    // const [products, setProducts] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(false);

    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         setLoading(true);
        //         // By executing this line, the data in backend 
        //         // will be transferred to data in frontend
        //         const { data } = await axios.get("/api/products");
        //         setLoading(false);
        //         setProducts(data);
        //     } catch (error) {
        //         setError(error.message);
        //         setLoading(false);
        //     }
        // }
        // fetchData();

        dispatch(listProducts());
    }, [dispatch]);

    return (
        <div>
            {loading ?
                (<LoadingBox ></LoadingBox>) :
                error ?
                    (<MessageBox variant="danger">{error}</MessageBox>) :

                    (<div className="row center">
                        {
                            products.map((product) =>
                                <Product key={product._id} product={product} />
                            )
                        }
                    </div>)}
        </div>
    );
}
