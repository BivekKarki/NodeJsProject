export const formatUserData = (data)=>{
    return {
        address: data?.address,
        name: data.name,
        email: data.email,
        phone: data.phone,
        createdAt: data.createdAt,
        roles: data.roles,
        profileImageUrl: data?.profileImageUrl,
        id: data._id,
    }
}


export const formatProductData = (data)=>{
    return {
        createdAt: data.createdAt,
        id: data._id,
        name: data.name,
        brand: data.brand,
        category: data.category,
        price: data.price,
        imageUrls: data.imageUrls,
        description: data.description,
    }
}