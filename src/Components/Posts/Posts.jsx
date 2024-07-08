import React, { useEffect, useState, useContext } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { firebaseContext } from '../../Store/FirebaseContext';
import { PostContext } from '../../Store/PostContext';
import { AuthContext } from '../../Store/FirebaseContext'; // Import AuthContext for user authentication
import { useHistory } from 'react-router-dom';

function Posts() {
  const { firebase } = useContext(firebaseContext);
  const { setPostDetails } = useContext(PostContext);
  const { user } = useContext(AuthContext); // Get the current logged-in user
  const history = useHistory();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Function to fetch products
    const fetchProducts = async () => {
      try {
        const snapshot = await firebase.firestore().collection('products').get();
        const allPost = snapshot.docs.map(product => ({
          ...product.data(),
          id: product.id
        }));
        setProducts(allPost);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts(); // Call the fetchProducts function

  }, [firebase]); // Depend on firebase context

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map(product => (
            <div
              className="card"
              key={product.id}
              onClick={() => {
                setPostDetails(product);
                history.push('/view');
              }}
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9;{product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {user && ( // Display recommendations only if user is logged in
        <div className="recommendations">
          <div className="heading">
            <span>Fresh recommendations</span>
          </div>
          <div className="cards">
            {products.map(product => (
              <div className="card" key={product.id}>
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9;{product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name">{product.name}</p>
                </div>
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Posts;
