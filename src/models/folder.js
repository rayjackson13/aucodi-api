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
    files: [{
        media: {
            type: Object
        }
    }]
});

folderSchema.plugin(autoIncrement, { id: 'order_seq', inc_field: 'id' });

folderSchema.statics.renameById = async (id, name) => {
    const folder = await Folder.findOneAndUpdate({ id }, { name }, { new: true });
    if (!folder) {
        throw new Error({error: 'No such folder available.'});
    }
    return folder;
};

// userSchema.statics.findByCredentials = async (username, password) => {
//     // Search for a user by username and password.
//     const user = await User.findOne({ username} );
//     if (!user) {
//         throw new Error({ error: 'Invalid login credentials' });
//     }
//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch) {
//         throw new Error({ error: 'Invalid login credentials' });
//     }
//     return user;
// };

const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;