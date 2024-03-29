import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Searchbar, ImageGallery, Button, Loader, Modal } from './index';
import { searchImages } from 'services/pixabay-api';

const STATUS = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
  IDLE: 'IDLE',
};
export class App extends Component {
  state = {
    status: STATUS.IDLE,
    query: '',
    images: [],
    activeImage: null,
    page: 1,
    totalPages: 1,
  };

  componentDidUpdate(_, prevState) {
    const { query: prevQuery, page: prevPage } = prevState;
    const { query, page } = this.state;

    if (page !== prevPage || query !== prevQuery) {
      this.getImages();
    }
  }

  async getImages() {
    const { query, page, images } = this.state;

    this.setStatus(STATUS.PENDING);

    try {
      const { hits, totalHits } = await searchImages(query, page);

      if (!hits.length) {
        toast.info('Oooh oh, there are no results that match your query.');
        return;
      }

      this.setState({
        images: [...images, ...hits],
      });

      if (page === 1) {
        toast.info(`Hooray! We found ${totalHits} image(s).`);
        this.calculateTotalPages(totalHits);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      this.setStatus(STATUS.FULFILLED);
    }
  }

  calculateTotalPages(total) {
    this.setState({ totalPages: Math.ceil(total / 12) });
  }

  handleSearchQuery = query => {
    this.setState({
      query,
      page: 1,
      images: [],
      totalPages: 1,
      status: STATUS.IDLE,
    });
  };

  setActiveImageUrl = url => this.setState({ activeImage: url });

  setNextPage = () => this.setState(({ page }) => ({ page: page + 1 }));

  setStatus = status => this.setState({ status });

  render() {
    const { status, images, activeImage, page, totalPages } = this.state;

    const isVisibleButton = page < totalPages && status === STATUS.FULFILLED;

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSearch={this.handleSearchQuery} />

        {images.length > 0 && (
          <ImageGallery images={images} onClick={this.setActiveImageUrl} />
        )}

        {activeImage && (
          <Modal
            url={activeImage}
            onClose={() => this.setActiveImageUrl(null)}
          />
        )}

        {isVisibleButton && (
          <Button onClick={this.setNextPage}>Load More</Button>
        )}

        {status === STATUS.PENDING && <Loader />}

        <ToastContainer theme="colored" autoClose={3000} />
      </div>
    );
  }
}
