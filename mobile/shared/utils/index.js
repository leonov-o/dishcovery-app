import $api from "../http/index.js";


export const uploadImage = async (imageUri) => {
    try {
        if (imageUri) {
            let filename = imageUri.split('/').pop();
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            const formData = new FormData();
            formData.append('file', { uri: imageUri, name: filename, type });
            const response = await $api.post('/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data.image
        } else {
            console.warn('No image selected.');
        }
    } catch (error) {
        throw new Error(`Error uploading image: ${error}`)
    }
};


export const aiGenerateRecipeDetails = async ({title, category, ingredients}) => {
    try {
        const response = await $api.post('/ai/generate-recipe-details', {title, category, ingredients});
        return response.data.data;
    } catch (error) {
        throw new Error(`Error generating recipe details: ${error}`)
    }
};