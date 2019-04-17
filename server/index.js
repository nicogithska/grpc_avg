const grpc = require('grpc');

const proto = grpc.load('proto/supplier.proto');
const server = new grpc.Server();

server.addProtoService(proto.supplier.supplier_product.service, {
    findPreferredSupplier(call, callback) {
        let product_name = call.request.product_name;
        let supplier_name = call.request.preffered_supplier;

        callback(null, {
            product_name,
            supplier_name
        });
    },
    
    findAllPreferredSupplier(call, callback){
        let name_supplier_1 = call.request.name_supplier_1;
        let name_supplier_2 = call.request.name_supplier_2;
        let name_supplier_3 = call.request.name_supplier_3;

        callback(null, {
            name_supplier_1,
            name_supplier_2,
            name_supplier_3
        });
    }
});

server.bind('127.0.0.1:8080', grpc.ServerCredentials.createInsecure());  

server.start();
console.log('grpc server running on port:', '127.0.0.1:8080');