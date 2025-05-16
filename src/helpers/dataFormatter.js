export const formatUserData = (data)=>{
    return {
        address: data?.address,
        name: data.name,
        email: data.email,
        phone: data.phone,
        createdAt: data.createdAt,
        roles: data.roles,
        profileImageUrl: data?.profileImageUrl,
        id: data.id,
    }
}