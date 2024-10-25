import Product from '../models/product.model.js';


export const createProduct = async (req,res)=>{
    const product = req.body
    if (!product.name || !product.price || !product.image){
        return res.status(400).json({success:false,message: 'Please enter all fields'})
    }
    const newProduct = new Product(product)
    try{
        await newProduct.save()
        res.status(201).json({success:true,data:newProduct})
    } catch (error){
        console.error("Error in Create Product:",error.message)
        res.status(500).json({success:false,message:"Server Error"})
    }
}

export const getProducts = async (req,res)=>{
    try{
        const products = await Product.find()
        if (!products){
            return res.status(404).json({success:false,message:"No products found"})
        }
        return res.status(200).json({success:true,data:products})
    } catch (err){
        console.error("Error in Get Products:",err.message)
        res.status(500).json({success:false,message:"Server Error"})
    }
}

export const updateProduct = async (req,res)=>{
    const {id} = req.params
    const product = req.body
    if (!product.name || !product.price || !product.image){
        return res.status(400).json({success:false,message: 'Please enter all fields'})
    }
    try{
        const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true})
        if (!updatedProduct){
            return res.status(404).json({success:false,message:"Product not found"})
        }
        res.status(200).json({success:true,data:updatedProduct})
    }catch(err){
        console.error("Error in Update Product:",err.message)
        res.status(500).json({success:false,message:"Server Error"})
    }    
}

export const deleteProduct = async (req,res)=>{
    const {id} = req.params
    try{
        const deletedProduct = await Product.findByIdAndDelete(id);        
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, message: 'Product is deleted' });
    } catch (error){
        console.error("Error in Delete Product:",error.message)
        res.status(500).json({success:false,message:"Server Error"})
    }
}