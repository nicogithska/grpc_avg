const grpc = require('grpc');

const proto = grpc.load('proto/supplier.proto');
const server = new grpc.Server();

server.addProtoService(proto.supplier.supplier_product.service, {
    findAllPreferredSuppliers(call, callback) {
        let prefferedSuppliers = [];
        for(var i = 0; i < suppliers.length;i++) {
            prefferedSuppliers.push(suppliers.preffered_supplier[i])
        }
        
        callback(null,{
            prefferedSuppliers
        });
    }
/*
    findPreferredSupplier(call, callback) {

    },

    setPreferredSupplierForProduct(call, callback) {

    }
*/    
});

server.bind('0.0.0.0:50050', grpc.ServerCredentials.createInsecure());  

server.start();
console.log('grpc server running on port:', '0.0.0.0:50050');