const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const folderSchema = mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    owner_id: {
        type: Number
    }
});

folderSchema.plugin(autoIncrement, { id: 'folders', inc_field: 'id' });

folderSchema.statics.renameById = async (id, name) => {
    const folder = await Folder.findOneAndUpdate({ id }, { name }, { new: true });
    if (!folder) {
        throw new Error({error: 'No such folder available.'});
    }
    return folder;
};

folderSchema.statics.deleteById = async id => {
    const folder = await Folder.findOneAndDelete({ id });
    if (!folder) {
        throw new Error({error: 'No such folder available.'});
    }
    return folder;
};

const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;