import React, { useState, useEffect, useRef } from 'react';
import styles from './AlbumDeFotos.module.css'
import { Galleria } from 'primereact/galleria';
import { PhotoService } from '../../utils/photoService';

function AlbumDeFotos(){

    const [images, setImages] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);    
    const galleria = useRef(null);

    useEffect(() => {
        PhotoService.getImages().then(data => {
            // Filtra o array para manter apenas itens onde a URL termina com .webp
            const filteredImages = data.filter(item => 
                item.itemImageSrc.toLowerCase().endsWith('.webp')
            );
            setImages(filteredImages);
        });
    }, []);

    const itemTemplate = (item) => {
        return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
    }

    const thumbnailTemplate = (item) => {
        return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />;
    }

    return(
        <div className={styles.info}>
            <div className="card flex justify-content-center">
                <Galleria 
                    ref={galleria} 
                    value={images} 
                    numVisible={7} 
                    style={{ maxWidth: '850px' }}
                    activeIndex={activeIndex} 
                    onItemChange={(e) => setActiveIndex(e.index)}
                    circular 
                    fullScreen 
                    showItemNavigators 
                    showThumbnails={false} 
                    item={itemTemplate} 
                    thumbnail={thumbnailTemplate} 
                />
                
                <div className={styles.imagens}>
                    {
                        images && images.map((image, index) => (
                            <div 
                                className={styles.imagemContainer} 
                                key={index}
                                onClick={() => { setActiveIndex(index); galleria.current.show(); }}
                            >
                                <img 
                                    src={image.thumbnailImageSrc} 
                                    className={styles.imagem} 
                                    alt={image.alt} 
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default AlbumDeFotos;
