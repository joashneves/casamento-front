const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const PhotoService = {
    async getImages(offset = 0, limit = 10) {
        try {
            const response = await fetch(`${API_URL}/api/images`);
            if (!response.ok) throw new Error('Failed to fetch images');
            const data = await response.json();
            
            // Assume data is an array of filenames. Apply pagination here if backend doesn't.
            const pagedData = data.slice(offset, offset + limit);

            return pagedData.map(img => ({
                itemImageSrc: `${API_URL}/api/images/${img}`,
                thumbnailImageSrc: `${API_URL}/api/images/${img}`,
                alt: img,
                title: img
            }));
        } catch (error) {
            console.error('Error fetching images:', error);
            return [];
        }
    },

    async getTotalImagesCount() {
        try {
            const response = await fetch(`${API_URL}/api/images`);
            if (!response.ok) throw new Error('Failed to fetch images');
            const data = await response.json();
            return data.length;
        } catch (error) {
            console.error('Error fetching images count:', error);
            return 0;
        }
    }
};
