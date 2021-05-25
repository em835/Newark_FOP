
import Mdocument from '../models/Mdocument.js'

export const postDocument = async (req, res ) => {
    try{
        const mdocument = await Mdocument.create(req.body)
        res.json({msg: "successfully posted!!", data: mdocumentdata})
        if(mdocument){
            console.log( "<====mdocument created!!!!")
        }else{
            console.log("unable to create mdocument!")
        }
    }catch(err){
        console.log(err)
    }
}

export const getDocument = async (req, res) => {
    try{
        Mdocument.find({}).populate("user").exec((err, docs) =>{
            if(err){
                console.log(err)
            }else{
                res.json({msg: "success!!!", data: docs})
            }
        })
    }catch(err){
    
    }
    }
    
 