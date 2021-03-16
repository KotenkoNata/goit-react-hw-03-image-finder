import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import ImageGalleryItem from './components/ImageGalleryItem';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';

import { fetchImages } from './services/pixabayApi';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Container from './components/Container';

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
      this.getImages();
    }
  }

  onChangeQuery = searchQuery => {
    this.setState({
      images: [],
      query: searchQuery,
      page: 1,
      showModal: false,
      selectedImage: '',
      error: null,
    });
  };

  getImages = () => {
    const { page, query } = this.state;

    const options = {
      query,
      page,
    };

    this.setState({ isLoading: true });

    fetchImages(options)
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
      <div className={'App'}>
        <SearchBar onSubmit={this.onChangeQuery} />
        <Container>
          <ImageGallery>
            {this.state.images.map(image => (
              <ImageGalleryItem
                key={image.id}
                image={image}
                setLargeImage={this.setLargeImage}
              />
            ))}
          </ImageGallery>
          {error && <h1>Error</h1>}
          {isLoading && (
            <Loader
              type="ThreeDots"
              color="#303f9f"
              height={80}
              width={80}
              className="loader"
            />
          )}
        </Container>
        {shouldRenderLoadMoreButton && <Button onLoadMore={this.getImages} />}
        {showModal && (
          <Modal largeImageUrl={selectedImage} onClose={this.toggleModal} />
        )}
      </div>
    );
  }
}

export default App;
