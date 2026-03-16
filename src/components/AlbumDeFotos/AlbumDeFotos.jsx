import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import styles from './AlbumDeFotos.module.css'
import { Galleria } from 'primereact/galleria';
import { PhotoService } from '../../utils/photoService';
import Confetti from "react-confetti";
import { useWindowSize } from 'react-use';

// Componente de imagem separado para evitar re-renders desnecessários
const ImageItem = React.memo(({ image, index, onClick }) => {
    return (
        <div 
            className={styles.imagemContainer} 
            onClick={() => onClick(index)}
        >
            <img 
                src={image.thumbnailImageSrc} 
                className={styles.imagem} 
                alt={image.alt} 
                loading="lazy"
                decoding="async"
                crossOrigin="anonymous"
            />
        </div>
    );
});

function AlbumDeFotos(){
    const { width, height } = useWindowSize();

    const [images, setImages] = useState([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isGalleriaVisible, setIsGalleriaVisible] = useState(false);
    const limit = 10;

    const [activeIndex, setActiveIndex] = useState(0);    
    const [showConfetti, setShowConfetti] = useState(true);
    const galleria = useRef(null);
    const observer = useRef();

    const loadImages = useCallback(async () => {
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
    }, [offset, hasMore, loading]);

    const lastImageElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                loadImages();
            }
        }, { threshold: 0.1, rootMargin: '200px' });

        if (node) observer.current.observe(node);
    }, [loading, hasMore, loadImages]);

    useEffect(() => {
        loadImages();
        const timer = setTimeout(() => setShowConfetti(false), 4000);
        return () => {
            clearTimeout(timer);
            if (observer.current) observer.current.disconnect();
        };
    }, []);

    const onImageClick = useCallback((index) => {
        setActiveIndex(index);
        setIsGalleriaVisible(true);
        // Pequeno delay para garantir que o componente Galleria foi montado
        setTimeout(() => {
            if (galleria.current) galleria.current.show();
        }, 10);
    }, []);

    const itemTemplate = useCallback((item) => (
        <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} decoding="async" />
    ), []);

    return(
        <div className={styles.info}>
            {showConfetti && (
                <Confetti
                    width={width}
                    height={height}
                    colors={["#FFF", "#577590"]}
                    numberOfPieces={width < 768 ? 15 : 40}
                    recycle={false}
                    gravity={0.3}
                    style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 9999 }}
                />
            )}
            
            <div className="card flex justify-content-center">
                {isGalleriaVisible && (
                    <Galleria 
                        ref={galleria} 
                        value={images} 
                        numVisible={7} 
                        style={{ maxWidth: '850px' }}
                        activeIndex={activeIndex} 
                        onItemChange={(e) => setActiveIndex(e.index)}
                        onHide={() => setIsGalleriaVisible(false)}
                        circular 
                        fullScreen 
                        showItemNavigators 
                        showThumbnails={false} 
                        item={itemTemplate} 
                    />
                )}
                
                <div className={styles.imagens}>
                    {images.map((image, index) => (
                        <ImageItem 
                            key={image.alt || index} 
                            image={image} 
                            index={index} 
                            onClick={onImageClick} 
                        />
                    ))}
                </div>

                <div ref={lastImageElementRef} style={{ height: '60px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                    {loading && <div className={styles.loadingStatus}>Carregando fotos...</div>}
                </div>
                
                {!hasMore && images.length > 0 && (
                    <div className={styles.endMessage}>Você chegou ao fim do álbum! ✨</div>
                )}
            </div>
        </div>
    );
}

export default AlbumDeFotos;
