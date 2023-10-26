import React from 'react';
import PropTypes from 'prop-types';
import styles from '../camp/comment.module.scss' 

function ReviewCard(props) {
  const { userAvatar, username, rating, reviewContent, ownerReply, checkInDate, reviewDate } = props;

  // 產生星星評分
  const generateStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="star">&#9733;</span>);
      } else {
        stars.push(<span key={i} className="star">&#9734;</span>);
      }
    }
    return stars;
  };

  return (
    <div className={styles['review-card']}>
      <div className={styles['user-info']}>
        <img className={styles['avatar']} src={userAvatar} alt="User Avatar" />
        <div className="user-details">
          <h3 className={styles['username']}>{username}</h3>
          <div className="rating">{generateStars(rating)}</div>
        </div>
      </div>
      <div className={styles['reviews']}>
        <p className={styles['reviewContent']}>{reviewContent}</p>
       {ownerReply && <p className={styles['owner-reply']}> 營主回覆：{ownerReply}</p>}
      </div>
      <div className={styles['timestamps']}>
      <p>入住時間：{checkInDate}</p>   
      <p>評論時間：{reviewDate}</p>
      </div>
    </div>
  );
}

ReviewCard.propTypes = {
  userAvatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  reviewContent: PropTypes.string.isRequired,
  ownerReply: PropTypes.string,
  checkInDate: PropTypes.string.isRequired,
  reviewDate: PropTypes.string.isRequired,
};

export default ReviewCard;
