import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaSearch, FaPlus, FaUserCircle } from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';
import { BiSolidMessageRoundedDots } from 'react-icons/bi';
import { RiFileList3Fill } from 'react-icons/ri';
import { auth, db } from '../Firebase/FirebaseConfig';
import { collection, query, where, onSnapshot, updateDoc, doc, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';
import './NavBar.css';

// Custom Alert Modal Component
const AlertModal = ({ isOpen, message, onClose, onLogin }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onClose}>Close</button>
          <button onClick={onLogin}>Go to Login</button>
        </div>
      </div>
    </div>
  );
};

const TempNavBar = () => {
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const [user, setUser] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // Handle the profile image URL
        if (currentUser.photoURL) {
          // Add a timestamp to bypass cache
          const photoURLWithTimestamp = `${currentUser.photoURL}?t=${new Date().getTime()}`;
          setProfileImage(photoURLWithTimestamp);
          setImageError(false);
        } else {
          setProfileImage(null);
        }
        
        const q = query(collection(db, `users/${currentUser.uid}/notifications`), where('read', '==', false));
        const unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
          setHasNewNotifications(querySnapshot.size > 0);
        });
        return () => unsubscribeSnapshot();
      } else {
        setUser(null);
        setProfileImage(null);
        setImageError(false);
        setHasNewNotifications(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleImageError = () => {
    console.log('Image failed to load, using fallback icon');
    setImageError(true);
    setProfileImage(null);
  };

  // Rest of your event handlers...
  const handleNotificationClick = async (e) => {
    e.preventDefault();
    if (user) {
      const q = query(collection(db, `users/${user.uid}/notifications`), where('read', '==', false));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, { read: true });
      });
      setHasNewNotifications(false);
      navigate('/message');
    } else {
      setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleLogin = () => {
    setShowAlert(false);
    navigate('/login');
  };

  const shakeVariants = {
    shake: {
      x: [-5, 5, -5, 5, 0],
      transition: {
        x: {
          duration: 0.5,
          ease: 'easeInOut',
          times: [0, 0.25, 0.5, 0.75, 1],
        },
      },
    },
  };

  const renderProfileImage = () => {
    if (profileImage && !imageError) {
      return (
        <div className="profile-container">
          <img 
            src={profileImage}
            alt="Profile"
            className="profile-image"
            onError={handleImageError}
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
          />
        </div>
      );
    }
    return <FaUserCircle className="profile-icon" size={24} />;
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/menu" className="nav-item">
          <FaHome />
        </Link>
        <Link to="/feedback" className="nav-item">
          <BiSolidMessageRoundedDots />
        </Link>
        
        <Link
          to="/message"
          className="nav-item"
          onClick={handleNotificationClick}
        >
          <motion.div
            className="notification-icon"
            variants={shakeVariants}
            animate={hasNewNotifications ? "shake" : ""}
          >
            <IoIosNotifications />
            {user && hasNewNotifications && <div className="notification-badge"></div>}
          </motion.div>
        </Link>

        <Link to="/order-history" className="nav-item">
          <RiFileList3Fill/>
        </Link>

        <Link to="/account" className="nav-item">
          {renderProfileImage()}
        </Link>
      </nav>

      <AlertModal
        isOpen={showAlert}
        message="Please log in to view notifications"
        onClose={handleCloseAlert}
        onLogin={handleLogin}
      />
    </>
  );
};

export default TempNavBar;