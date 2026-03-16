import React, { useState, useEffect, useRef } from 'react';
import styles from './AlbumDeFotos.module.css'
import { Galleria } from 'primereact/galleria';
import { PhotoService } from '../../utils/photoService';
import Confetti from "react-confetti";
import { useWindowSize } from 'react-use';

function AlbumDeFotos(){
    const { width, height } = useWindowSize();

    const [images, setImages] = useState([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const limit = 10;

    const [activeIndex, setActiveIndex] = useState(0);    
    const [showConfetti, setShowConfetti] = useState(true);
    const galleria = useRef(null);

    const loadImages = async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const newImages = await PhotoService.getImages(offset, limit);
            if (newImages.length < limit) {
                setHasMore(false);
            }
            setImages(prev => [...prev, ...newImages]);
            setOffset(prev => prev + limit);
        } catch (error) {
            console.error('Error loading images:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadImages();

        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const itemTemplate = (item) => {
        return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
    }

    const thumbnailTemplate = (item) => {
        return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />;
    }

    return(
        <div className={styles.info}>
            {showConfetti && (
                <Confetti
                    width={width}
                    height={height}
                    colors={["#FFF", "#577590"]}
                    numberOfPieces={width < 768 ? 50 : 150}
                    gravity={0.25}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        pointerEvents: "none",
                        zIndex: 9999,
                    }}
                />
            )}
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
                {hasMore && (
                    <div className={styles.loadMoreContainer}>
                        <button 
                            className={styles.loadMoreButton} 
                            onClick={loadImages} 
                            disabled={loading}
                        >
                            {loading ? 'Carregando...' : 'Ver mais fotos'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AlbumDeFotos;
