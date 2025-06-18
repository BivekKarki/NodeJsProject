import axios from "axios"

const promptGemini = async (product)=> {
    const geminiUrl = process.env.GEMINI_URL
    const geminiApiKey = process.env.GEMINI_API_KEY
    const data = {
        "contents": [
            {
                "parts":[
                    {
                        "text": `Generate a compelling product description 
                        for thr following item. Highlight its key features, 
                        benefits, and ideal use cases while maintaining an 
                        engaging and persuasive tone. Ensure the description 
                        is clear, informative, and optimized for e-commerce.
                        Product name: ${product.name},
                        Brand: ${product.brand},
                        Category: ${product.category}
                        `
                    }
                ]
            }
        ]
   };
   
   const response = await axios.post(`${geminiUrl}?key=${geminiApiKey}`, JSON.stringify(data))
   console.log("Gemini...")

    return response.data.candidates[0]?.content.parts[0].text;
}

export default promptGemini;

