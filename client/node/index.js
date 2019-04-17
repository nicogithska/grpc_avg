const grpc = require('grpc');

const protoPath = require('path').join(__dirname, '../..', 'proto');
const proto = grpc.load({root: protoPath, file: 'supplier.proto' });

const client = new proto.supplier.supplier_product('127.0.0.1:8080', grpc.credentials.createInsecure());

const products = {
    Cola: {
        id_product: 1,
        product_name: 'Cola',
        preffered_supplier: 'CocaCola'
    },
    MonsterValentinoRossi: {
        id_product: 2,
        product_name: 'MonsterValentinoRossi',
        preffered_supplier: 'Monster'
    },
    Rockstar: {
        id_product: 3,
        product_name: 'RockstarGuave',
        preffered_supplier: 'Rockstar'
    }
}

client.findPreferredSupplier(products.Cola, (error, response) => {
    if(!error) {
        console.log('Produktname: '+response.product_name);
        console.log('Praeferierter Zulieferer: '+response.supplier_name)
    }
    else {
        console.log('Fehler', error.message);
    }
});
