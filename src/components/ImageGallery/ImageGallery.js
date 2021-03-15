import React from 'react';
import PropTypes from 'prop-types';

import styles from './ImageGallery.module.css';

const ImageGallery = ({ children }) => {
  return <ul className={styles.ImageGallery}>{children}</ul>;
};

ImageGallery.protoTypes = {
  children: PropTypes.node,
};

export default ImageGallery;
