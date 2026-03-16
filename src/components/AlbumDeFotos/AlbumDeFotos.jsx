import React, { useState, useEffect, useRef, useCallback } from 'react';
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

    // Elemento que dispara o carregamento ao ser visto (Infinite Scroll)
    const lastImageElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                loadImages();
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore, loadImages]);

    useEffect(() => {
        loadImages();

        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const itemTemplate = (item) => {
        return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} loading="lazy" crossOrigin="anonymous" />;
    }

    const thumbnailTemplate = (item) => {
        return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} loading="lazy" crossOrigin="anonymous" />;
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
                                    loading="lazy"
                                    crossOrigin="anonymous"
                                />
                            </div>
                        ))
                    }
                </div>

                {/* Sentinela para o Infinite Scroll */}
                <div ref={lastImageElementRef} style={{ height: '40px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                    {loading && (
                        <div className={styles.loadingStatus}>
                            Carregando mais fotos...
                        </div>
                    )}
                </div>
                
                {!hasMore && images.length > 0 && (
                    <div className={styles.endMessage}>
                        Você chegou ao fim do álbum! ✨
                    </div>
                )}
            </div>
        </div>
    );
}

export default AlbumDeFotos;
