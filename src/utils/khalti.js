import axios from 'axios';

const payViaKhalti = async (data)=> {
    // console.log(data)
    const {
        returnUrl,
        websiteUrl,
        amount,
        orderId,
        orderName,
        customerInfo
    } = data

    if(!returnUrl) throw {message: "Return Url is required"}
    if(!websiteUrl) throw {message: "Website Url is required"}
    if(!amount) throw {message: "Amount is required"}
    if(!orderId) throw {message: "Order ID is required"}
    if(!orderName) throw {message: "Order Name is required"}
    if(!customerInfo) throw {message: "Costumer Infois required"}
   
    const requestBody = {
        return_url:returnUrl,
        website_url:websiteUrl,
        amount:amount,
        purchase_order_id:orderId,
        purchase_order_name:orderName,
        customer_info:customerInfo
    } 

    console.log(process.env.KHALTI_API_KEY)
    console.log(process.env.KHALTI_URL)

const response = await axios.post(
    process.env.KHALTI_URL, 
    requestBody, 
    {
        headers: {
            Authorization: `Key ${process.env.KHALTI_API_KEY}`, 
            'Content-Type': 'application/json',
        },
    }
);
console.log(response)

return response.data;

}

export default payViaKhalti;

