const baseUrl = 'https://my-json-server.typicode.com/mclaraop/biblioteca-api/produtos';

export const getProdutos = async () => {
    try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
            throw new Error('Erro ao buscar produtos');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const deleteProduct = async (id) => {
    try {
        await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
    }
};

export const addProduct = async (produto) => {
    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        });

        if (!response.ok) {
            throw new Error('Erro ao adicionar produto');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};
