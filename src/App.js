import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import ImageGalleryItem from './components/ImageGalleryItem';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';

import pixabayApi, { fetchImages } from './services/pixabayApi';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    //add controler for modal window
    showModal: false,
    selectedImage: '',
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchImages();
    }
  }

  onChangeQuery = searchQuery => {
    this.setState({
      images: [],
      query: searchQuery,
      page: 1,
      showModal: false,
      error: null,
    });
  };

  fetchImages = () => {
    const { page, query } = this.state;

    const options = {
      query,
      page,
    };

    this.setState({ isLoading: true });

    pixabayApi
      .fetchImages(options)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
        }));

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  setLargeImage = image => {
    this.setState({ selectedImage: image.largeImageURL });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, isLoading, error, showModal, selectedImage } = this.state;
    const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;
    return (
      <>
        <SearchBar onSubmit={this.onChangeQuery} />
        <ImageGallery>
          {this.state.images.map(image => (
            <ImageGalleryItem key={image.id} image={image} />
          ))}
        </ImageGallery>
        {error && <h1>Error</h1>}
        {isLoading && (
          <Loader
            type="TailSpin"
            color="#00BFFF"
            height={80}
            width={80}
            className="loader"
          />
        )}
        {shouldRenderLoadMoreButton && <Button onLoadMore={this.fetchImages} />}
        {showModal && (
          <Modal largeImgUrl={selectedImage} onClose={this.toggleModal} />
        )}
      </>
    );
  }
}

export default App;
