import axios from 'axios';

const payViaKhalti = async (data)=> {

    const requestBody = {
        return_url: data.returnUrl,
        website_url: data.websiteUrl,
        amount: data.amount,
        purchase_order_id: data.orderId,
        purchase_order_name: data.orderName,
        customer_info: data.customerInfo
    } 

   

// let config = {
//   method: 'post',
//   maxBodyLength: Infinity,
//   url: 'https://dev.khalti.com/api/v2/epayment/initiate/',
//   headers: { 
//     'Authorization': 'Key 2f19dcd49e744f5399250b2956f82e79', 
//     'Content-Type': 'application/json', 
//     'Cookie': 'sessioncookie=!8DJZci7Neq8Vqkudi8GHrcsPaIwS0YhoevS16cYuC2T0jNeNq6cCSEJoQBlBlP9GyPwwxK02H17yoQ=='
//   },
//   data : data
// };

// axios.request(config)
// .then((response) => {
//   console.log(JSON.stringify(response.data));
// })
// .catch((error) => {
//   console.log(error);
// });



const response = await axios.post(
    process.env.KHALTI_URL, 
    requestBody, 
    {
        Authorization: `Key ${process.env.KHALTI_API_KEY}`, 
        'Content-Type': 'application/json',
    }
)
return response.data;

}

export default payViaKhalti;

