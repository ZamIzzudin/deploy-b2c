/* eslint-disable react/prop-types */
import { Carousel } from 'react-bootstrap';

function ImageGalery({ images }) {
    return (
        <Carousel>
            {images?.map((image, index) => (
                <Carousel.Item interval={5000 * index}>
                    <img
                        className="d-block w-100"
                        src={image}
                        alt={`Sceenshoot ${index + 1}`}
                    />
                </Carousel.Item>
            ))}

        </Carousel>
    );
}

export default ImageGalery;
