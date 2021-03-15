import React from 'react';
import PropTypes from 'prop-types';

import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, setLargeImg }) => {
  return (
    <li className={styles.ImageGalleryItem} onClick={() => setLargeImg(image)}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        className={styles['ImageGalleryItem-image']}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  setLargeImg: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
