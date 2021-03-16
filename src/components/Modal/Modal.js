import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    largeImageUrl: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  //clean Listner
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const img = this.props.largeImageUrl;
    return createPortal(
      <div className={styles.Overlay} onClick={this.handleBackdropClick}>
        <div className={styles.Modal}>
          <img src={img} alt={'Gallery'} />
        </div>
      </div>,
      modalRoot,
    );
  }
}
