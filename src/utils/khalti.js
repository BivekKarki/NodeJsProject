import axios from 'axios';

const payViaKhalti = ()=> {
    let data = JSON.stringify({
  "return_url": "https://fbb.com.np/",
  "website_url": "https://fbb.com.np/",
  "amount": 299999,
  "purchase_order_id": "test12",
  "purchase_order_name": "test",
  "customer_info": {
    "name": "Khalti Bahadur",
    "email": "example@gmail.com",
    "phone": "9800000123"
  }
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dev.khalti.com/api/v2/epayment/initiate/',
  headers: { 
    'Authorization': 'Key 2f19dcd49e744f5399250b2956f82e79', 
    'Content-Type': 'application/json', 
    'Cookie': 'sessioncookie=!8DJZci7Neq8Vqkudi8GHrcsPaIwS0YhoevS16cYuC2T0jNeNq6cCSEJoQBlBlP9GyPwwxK02H17yoQ=='
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

}

export default payViaKhalti;

