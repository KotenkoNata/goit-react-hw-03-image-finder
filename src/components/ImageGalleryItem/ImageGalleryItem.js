import React from 'react';
import PropTypes from 'prop-types';

import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, setLargeImage }) => {
  return (
    <li
      className={styles.ImageGalleryItem}
      onClick={() => setLargeImage(image)}
    >
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
  setLargeImage: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
