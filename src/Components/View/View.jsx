import React, { useState, useEffect, useContext } from 'react';
import './View.css';
import { PostContext } from '../../Store/PostContext';
import { firebaseContext } from '../../Store/FirebaseContext';
import { useHistory } from 'react-router-dom';

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(firebaseContext);
  const history = useHistory();
  const currentUserID = firebase.auth().currentUser?.uid;

  useEffect(() => {
    const { userId } = postDetails;
    if (userId) {
      firebase.firestore().collection('users').where('id', '==', userId).get().then((res) => {
        res.forEach(doc => {
          setUserDetails(doc.data());
        });
      });
    }
  }, [firebase, postDetails]);

  const handleDelete = async () => {
    try {
      await firebase.firestore().collection('products').doc(postDetails.id).delete();
      console.log('Product deleted successfully');
      history.push('/'); // Redirect to home page after deletion
    } catch (error) {
      console.error('Error deleting product: ', error);
    }
  };

  if (!postDetails) return <p>Loading...</p>;

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.url} alt={postDetails.name} />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{new Date(postDetails.createdAt.seconds * 1000).toDateString()}</span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        )}
        {currentUserID === postDetails.userId && (
          <button onClick={handleDelete} className="deleteButton">Delete Product</button>
        )}
      </div>
    </div>
  );
}

export default View;
