const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const mediaSchema = mongoose.Schema({
    _id: Number,
    name: {
        type: String,
        required: true,
        trim: true
    },
    file: {
        type: Object,
        required: true
    },
    owner_id: {
        type: Number
    },
    folder_id: {
        type: Number,
        required: true
    }
});

mediaSchema.plugin(autoIncrement, { id: 'media' });

mediaSchema.statics.renameById = async (id, name) => {
    const media = await Media.findOneAndUpdate({ _id: id }, { name }, { new: true });
    if (!media) {
        throw new Error({error: 'No such media available.'});
    }
    return media;
};

mediaSchema.statics.deleteById = async id => {
    const media = await Media.findOneAndDelete({ _id: id });
    if (!media) {
        throw new Error({error: 'No such media available.'});
    }
    return media;
};

const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;