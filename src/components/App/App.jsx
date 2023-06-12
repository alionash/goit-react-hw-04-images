import { useState, useEffect } from "react";
import { GlobalStyle } from "GlobalStyles";
import { getImages } from "servises/api";
import  SearchBar  from "components/Searchbar/searchbar";
import { ImageGallery } from "components/ImageGallery/imageGallery";
import { LoadMore } from "components/Button/button";
import { Loader } from "components/Loader/loader";
import  ModalOverlay  from "components/Modal/modal";

export default function App() {
  const [images, setImages] = useState([]);
  const [largeImage, setLargeImage] = useState('')
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

const getDataImages = async () => {
    setIsLoading(true);

    try {
      const { hits } = await getImages(searchQuery, page);
      setImages(images=> [...images, ...hits]);
      setPage(page + 1);
      if (page !== 1) {

      }
    } catch (error) {
      setError('Oops something went wrong...');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery === '') return;
    getDataImages();
  }, [searchQuery]);
  

  const handleSubmitSearchQuery = searchQuery => {
    setImages([]);
    setSearchQuery(searchQuery);
    setPage(1);
    setError(null);
  };

  const getLargeImage = largeImage => {
    setLargeImage(largeImage);
    setIsModalOpen(true);
  };

  const toggleShowModal = () => {
    setIsModalOpen(!isModalOpen);
  }



  const imagesLength = images.length >= 12;
      return (
    <div>
        <SearchBar onSubmit={handleSubmitSearchQuery } />
        {error}
        <ImageGallery items={images} getItemClick={getLargeImage} />
        {imagesLength && <LoadMore onLoadMore={() => getDataImages}/>}
        {isLoading && <Loader />}
        {isModalOpen && <ModalOverlay largeImageURL={largeImage} onClick={toggleShowModal}/>}
        
      <GlobalStyle/>
    </div>
  );
}
