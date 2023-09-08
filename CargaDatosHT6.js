// topicModel.js
const { ObjectId } = require('bson');
const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({

    id: ObjectId,
    CompanyName: String,
    OwnerFirst: String,
    OwnerLast: String,
    PhysicalAddress: String,
    MailingAddress: String,
    Phone: String,
    Email: String,
    Agency: String,
    CertificationType: String,
    Certified: String,
    Capability: String,
    ServiceType: String,
    CertifyingAgency: String,
    Website: String,
});

module.exports = mongoose.model('Topic', topicSchema);
