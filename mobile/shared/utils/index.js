import $api from "../http/index.js";


export const uploadImage = async (imageUri)=> {
    try {
        if (imageUri) {
            let filename = imageUri.split('/').pop();
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            const formData = new FormData();
            formData.append('file', {uri: imageUri, name: filename, type});
            const response = await $api.post('/upload', formData, {
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
