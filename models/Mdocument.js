import mongoose from 'mongoose';


const mdocumentSchema = new mongoose.Schema({
    img1: {
        type: String
    },
    img2: {
        type: String
    },

    img3: {
        type: String
    },

    img4: {
        type: String
    },
    img5: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
});

const MdocumentModel = mongoose.model("Mdocument", mdocumentSchema);
 


export default MdocumentModel;