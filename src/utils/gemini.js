import axios from "axios"

const geminiUrl = process.env.GEMINI_URL
const geminiApiKey = process.env.GEMINI_API_KEY

const promptGemini = async (product)=> {
    const data = {
        contents: [
            {
                parts:[
                    {
                        text: `Generate a compelling product description 
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

    await axios.post(`${geminiUrl}?key=${geminiApiKey}`, JSON.stringify(data))
}

export default promptGemini;

